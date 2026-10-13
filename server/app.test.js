import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import request from "supertest";
import { createApp } from "./app.js";
import { Advisory, Farm, User } from "./models.js";
import { createRecommendation, datasetSize } from "./dataset.js";

const mongoUri = process.env.TEST_MONGODB_URI || "mongodb://127.0.0.1:27017/agroai_test";
const app = createApp();

before(async () => {
  await mongoose.connect(mongoUri);
  await mongoose.connection.dropDatabase();
});

after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

test("loads all dataset rows and creates a finite sugarcane recommendation", () => {
  assert.equal(datasetSize, 3000);
  const recommendation = createRecommendation({ crop: "Sugarcane", cropStage: "Grand growth", soilType: "Loamy", soilMoisture: 12, area: 2, pumpFlowRateLph: 20000 });
  assert.ok(recommendation.waterRequiredLitres > 0);
  assert.equal(recommendation.waterRequiredLitres, 404686);
  assert.equal(recommendation.pumpDurationHours, 20.2);
  assert.match(recommendation.operationNote, /split the application/i);
  assert.ok(recommendation.referenceRecordIndex >= 2);
  assert.match(recommendation.datasetBasis, /historical sugarcane rows/i);
  assert.match(recommendation.safetyNote, /planning estimate/i);

  const wetRecommendation = createRecommendation({ crop: "Sugarcane", cropStage: "Maturity", soilType: "Clay", soilMoisture: 40, area: 1, pumpFlowRateLph: 20000 });
  assert.equal(wetRecommendation.irrigationRecommended, false);
  assert.equal(wetRecommendation.waterRequiredLitres, 0);
  assert.equal(wetRecommendation.pumpDurationHours, 0);
  assert.match(wetRecommendation.operationNote, /no pump operation/i);

  const noPowerRecommendation = createRecommendation({ crop: "Sugarcane", cropStage: "Vegetative", soilType: "Sandy", soilMoisture: 12, area: 1, pumpFlowRateLph: 20000, electricity: "Unavailable" });
  assert.match(noPowerRecommendation.action, /electricity supply/i);
  assert.match(noPowerRecommendation.operationNote, /marked unavailable/i);
});

test("all sugarcane stage and soil combinations return coherent advice", () => {
  const stages = ["Germination", "Vegetative", "Grand growth", "Maturity"];
  const soils = ["Alluvial", "Clay", "Loamy", "Sandy"];
  for (const cropStage of stages) {
    for (const soilType of soils) {
      const advice = createRecommendation({ crop: "Sugarcane", cropStage, soilType, soilMoisture: 12, area: 1, pumpFlowRateLph: 20000 });
      assert.equal(advice.irrigationRecommended, true, `${cropStage}/${soilType} should recognize low moisture`);
      assert.ok(advice.matchedRecordCount > 0);
      assert.ok(advice.applicationDepthMm >= 20 && advice.applicationDepthMm <= 55);
      assert.ok(advice.waterRequiredLitres > 80000 && advice.waterRequiredLitres < 225000);
      assert.ok(advice.pumpDurationHours > 0);
      assert.match(advice.recommendedIntervalDays, /^\d+(–\d+)?$/);
      assert.ok(["Drip", "Flood", "Sprinkler"].includes(advice.historicalMostCommonMethod));
    }
  }
});

test("complete auth, persistence, acceptance, duplicate-email, and user-isolation workflow", async () => {
  const farmerOne = request.agent(app);
  const farmerTwo = request.agent(app);

  const firstRegistration = await farmerOne.post("/api/auth/register").send({ name: "Farmer One", email: "one@example.com", password: "strongpass1" });
  assert.equal(firstRegistration.status, 201);
  assert.equal(firstRegistration.body.user.email, "one@example.com");

  const duplicate = await request(app).post("/api/auth/register").send({ name: "Duplicate Farmer", email: "ONE@example.com", password: "strongpass2" });
  assert.equal(duplicate.status, 409);

  const unsupportedCrop = await farmerOne.post("/api/farms").send({ farmName: "Bad Plot", area: 1, crop: "Wheat", cropStage: "Vegetative", soilType: "Loamy", electricity: "Available", soilMoisture: 24, pumpFlowRateLph: 20000 });
  assert.equal(unsupportedCrop.status, 400);
  const baseFarm = { farmName: "Validation Plot", area: 1, crop: "Sugarcane", cropStage: "Vegetative", soilType: "Loamy", electricity: "Available", soilMoisture: 24, pumpFlowRateLph: 20000 };
  assert.equal((await farmerOne.post("/api/farms").send({ ...baseFarm, area: 0 })).status, 400);
  assert.equal((await farmerOne.post("/api/farms").send({ ...baseFarm, soilMoisture: 101 })).status, 400);
  assert.equal((await farmerOne.post("/api/farms").send({ ...baseFarm, pumpFlowRateLph: 99 })).status, 400);
  assert.equal((await farmerOne.post("/api/farms").send({ ...baseFarm, cropStage: "Flowering" })).status, 400);
  assert.equal((await farmerOne.post("/api/farms").send({ ...baseFarm, soilType: "Peaty" })).status, 400);
  assert.equal((await farmerOne.post("/api/farms").send({ ...baseFarm, electricity: "Sometimes" })).status, 400);

  const farmResponse = await farmerOne.post("/api/farms").send({ farmName: "North Plot", area: 2.5, crop: "Sugarcane", cropStage: "Grand growth", soilType: "Loamy", electricity: "Available", soilMoisture: 12, pumpFlowRateLph: 20000 });
  assert.equal(farmResponse.status, 201);
  const farmId = farmResponse.body.farm._id;
  assert.equal(farmResponse.body.farm.crop, "Sugarcane");
  assert.equal(farmResponse.body.farm.pumpFlowRateLph, 20000);

  const advisoryResponse = await farmerOne.post("/api/advisories").send({ farmId });
  assert.equal(advisoryResponse.status, 201);
  assert.equal(advisoryResponse.body.advisory.inputs.crop, "Sugarcane");
  assert.ok(advisoryResponse.body.advisory.recommendation.waterRequiredLitres > 0);

  const accepted = await farmerOne.patch(`/api/advisories/${advisoryResponse.body.advisory._id}/accept`);
  assert.equal(accepted.status, 200);
  assert.equal(accepted.body.advisory.accepted, true);

  await farmerOne.post("/api/auth/logout");
  assert.equal((await farmerOne.get("/api/farms")).status, 401);
  assert.equal((await farmerOne.post("/api/auth/login").send({ email: "one@example.com", password: "strongpass1" })).status, 200);
  assert.equal((await farmerOne.get("/api/farms")).body.farms.length, 1);
  assert.equal((await farmerOne.get("/api/advisories")).body.advisories[0].accepted, true);

  assert.equal((await farmerTwo.post("/api/auth/register").send({ name: "Farmer Two", email: "two@example.com", password: "strongpass2" })).status, 201);
  assert.deepEqual((await farmerTwo.get("/api/farms")).body.farms, []);
  assert.equal((await farmerTwo.post("/api/advisories").send({ farmId })).status, 404);

  assert.equal(await User.countDocuments(), 2);
  assert.equal(await Farm.countDocuments(), 1);
  assert.equal(await Advisory.countDocuments(), 1);
  const storedUser = await User.findOne({ email: "one@example.com" }).select("+passwordHash");
  assert.notEqual(storedUser.passwordHash, "strongpass1");
});
