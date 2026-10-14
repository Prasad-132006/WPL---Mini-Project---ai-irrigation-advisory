import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import request from "supertest";
import { createApp } from "./app.js";
import { Advisory, Field, SupportTicket, User } from "./models.js";
import { createRecommendation, datasetSize } from "./dataset.js";
import { migrateFarmsToFields } from "./migrate.js";
import { config } from "./config.js";

const mongoUri = process.env.TEST_MONGODB_URI || "mongodb://127.0.0.1:27017/agroai_test";
config.supportAdminEmails = new Set(["admin@example.com"]);
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

test("safely migrates legacy farms and advisory relationships to fields", async () => {
  const farmerId = new mongoose.Types.ObjectId();
  const fieldId = new mongoose.Types.ObjectId();
  await mongoose.connection.collection("farms").insertOne({
    _id: fieldId,
    farmer: farmerId,
    farmName: "Legacy North Field",
    area: 2,
    crop: "Sugarcane",
    cropStage: "Vegetative",
    soilType: "Loamy",
    electricity: "Available",
    soilMoisture: 20,
    pumpFlowRateLph: 20000,
  });
  const advisoryId = new mongoose.Types.ObjectId();
  await mongoose.connection.collection("advisories").insertOne({ _id: advisoryId, farmer: farmerId, farm: fieldId });

  const result = await migrateFarmsToFields();
  assert.deepEqual(result, { migratedFields: 1, migratedAdvisories: 1, removedLegacyCollection: true });
  const migratedField = await mongoose.connection.collection("fields").findOne({ _id: fieldId });
  assert.equal(String(migratedField._id), String(fieldId));
  assert.equal(String(migratedField.farmer), String(farmerId));
  assert.equal(migratedField.farmName, "Legacy North Field");
  const migratedAdvisory = await mongoose.connection.collection("advisories").findOne({ _id: advisoryId });
  assert.equal(String(migratedAdvisory.field), String(fieldId));
  assert.equal((await mongoose.connection.db.listCollections({ name: "farms" }).toArray()).length, 0);

  await mongoose.connection.collection("fields").deleteMany({});
  await mongoose.connection.collection("advisories").deleteMany({});
});

test("complete auth, persistence, acceptance, duplicate-email, and user-isolation workflow", async () => {
  const farmerOne = request.agent(app);
  const farmerTwo = request.agent(app);

  const firstRegistration = await farmerOne.post("/api/auth/register").send({ name: "Farmer One", email: "one@example.com", password: "strongpass1" });
  assert.equal(firstRegistration.status, 201);
  assert.equal(firstRegistration.body.user.email, "one@example.com");

  const duplicate = await request(app).post("/api/auth/register").send({ name: "Duplicate Farmer", email: "ONE@example.com", password: "strongpass2" });
  assert.equal(duplicate.status, 409);

  const unsupportedCrop = await farmerOne.post("/api/fields").send({ farmName: "Bad Field", area: 1, crop: "Wheat", cropStage: "Vegetative", soilType: "Loamy", electricity: "Available", soilMoisture: 24, pumpFlowRateLph: 20000 });
  assert.equal(unsupportedCrop.status, 400);
  const baseField = { farmName: "Validation Field", area: 1, crop: "Sugarcane", cropStage: "Vegetative", soilType: "Loamy", electricity: "Available", soilMoisture: 24, pumpFlowRateLph: 20000 };
  assert.equal((await farmerOne.post("/api/fields").send({ ...baseField, area: 0 })).status, 400);
  assert.equal((await farmerOne.post("/api/fields").send({ ...baseField, soilMoisture: 101 })).status, 400);
  assert.equal((await farmerOne.post("/api/fields").send({ ...baseField, pumpFlowRateLph: 99 })).status, 400);
  assert.equal((await farmerOne.post("/api/fields").send({ ...baseField, cropStage: "Flowering" })).status, 400);
  assert.equal((await farmerOne.post("/api/fields").send({ ...baseField, soilType: "Peaty" })).status, 400);
  assert.equal((await farmerOne.post("/api/fields").send({ ...baseField, electricity: "Sometimes" })).status, 400);

  const fieldResponse = await farmerOne.post("/api/fields").send({ farmName: "North Field", area: 2.5, crop: "Sugarcane", cropStage: "Grand growth", soilType: "Loamy", electricity: "Available", soilMoisture: 12, pumpFlowRateLph: 20000 });
  assert.equal(fieldResponse.status, 201);
  const fieldId = fieldResponse.body.field._id;
  assert.equal(fieldResponse.body.field.crop, "Sugarcane");
  assert.equal(fieldResponse.body.field.pumpFlowRateLph, 20000);

  const secondFieldResponse = await farmerOne.post("/api/fields").send({ farmName: "South Field", area: 1.2, crop: "Sugarcane", cropStage: "Vegetative", soilType: "Sandy", electricity: "Unavailable", soilMoisture: 18, pumpFlowRateLph: 15000 });
  assert.equal(secondFieldResponse.status, 201);
  const secondFieldId = secondFieldResponse.body.field._id;
  const updatedField = await farmerOne.put(`/api/fields/${secondFieldId}`).send({ ...secondFieldResponse.body.field, area: 1.5, soilMoisture: 22 });
  assert.equal(updatedField.status, 200);
  assert.equal(updatedField.body.field.area, 1.5);
  assert.equal(updatedField.body.field.soilMoisture, 22);

  const advisoryResponse = await farmerOne.post("/api/advisories").send({ fieldId });
  assert.equal(advisoryResponse.status, 201);
  assert.equal(advisoryResponse.body.advisory.inputs.crop, "Sugarcane");
  assert.equal(advisoryResponse.body.advisory.field, fieldId);
  assert.ok(advisoryResponse.body.advisory.recommendation.waterRequiredLitres > 0);

  const accepted = await farmerOne.patch(`/api/advisories/${advisoryResponse.body.advisory._id}/accept`);
  assert.equal(accepted.status, 200);
  assert.equal(accepted.body.advisory.accepted, true);

  await farmerOne.post("/api/auth/logout");
  assert.equal((await farmerOne.get("/api/fields")).status, 401);
  assert.equal((await farmerOne.post("/api/auth/login").send({ email: "one@example.com", password: "strongpass1" })).status, 200);
  const restoredFields = await farmerOne.get("/api/fields");
  assert.equal(restoredFields.body.fields.length, 2);
  const fieldDetails = await farmerOne.get(`/api/fields/${fieldId}`);
  assert.equal(fieldDetails.status, 200);
  assert.equal(fieldDetails.body.field.farmName, "North Field");
  assert.equal(fieldDetails.body.advisories.length, 1);
  assert.equal((await farmerOne.get("/api/advisories")).body.advisories[0].accepted, true);

  assert.equal((await farmerTwo.post("/api/auth/register").send({ name: "Farmer Two", email: "two@example.com", password: "strongpass2" })).status, 201);
  assert.deepEqual((await farmerTwo.get("/api/fields")).body.fields, []);
  assert.equal((await farmerTwo.get(`/api/fields/${fieldId}`)).status, 404);
  assert.equal((await farmerTwo.put(`/api/fields/${fieldId}`).send(baseField)).status, 404);
  assert.equal((await farmerTwo.post("/api/advisories").send({ fieldId })).status, 404);

  assert.equal(await User.countDocuments(), 2);
  assert.equal(await Field.countDocuments(), 2);
  assert.equal(await Advisory.countDocuments(), 1);
  const storedUser = await User.findOne({ email: "one@example.com" }).select("+passwordHash");
  assert.notEqual(storedUser.passwordHash, "strongpass1");
});

test("support tickets persist with field ownership and server-enforced admin replies", async () => {
  const incidentDate = new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);
  const futureIncidentDate = new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().slice(0, 10);
  const farmer = request.agent(app);
  const otherFarmer = request.agent(app);
  const admin = request.agent(app);

  const farmerRegistration = await farmer.post("/api/auth/register").send({ name: "Support Farmer", email: "support@example.com", password: "strongpass3" });
  assert.equal(farmerRegistration.status, 201);
  assert.equal(farmerRegistration.body.user.isSupportAdmin, false);
  await otherFarmer.post("/api/auth/register").send({ name: "Other Support Farmer", email: "other-support@example.com", password: "strongpass4" });
  const adminRegistration = await admin.post("/api/auth/register").send({ name: "Support Admin", email: "admin@example.com", password: "strongpass5" });
  assert.equal(adminRegistration.status, 201);
  assert.equal(adminRegistration.body.user.isSupportAdmin, true);

  const ownedField = await farmer.post("/api/fields").send({ farmName: "Support Field", area: 1, crop: "Sugarcane", cropStage: "Vegetative", soilType: "Loamy", electricity: "Available", soilMoisture: 21, pumpFlowRateLph: 18000 });
  const otherField = await otherFarmer.post("/api/fields").send({ farmName: "Other Field", area: 2, crop: "Sugarcane", cropStage: "Maturity", soilType: "Clay", electricity: "Available", soilMoisture: 30, pumpFlowRateLph: 22000 });

  const rejectedForeignField = await farmer.post("/api/support").send({ fieldId: otherField.body.field._id, category: "Field details", incidentDate, subject: "Wrong field", message: "This field belongs to another farmer." });
  assert.equal(rejectedForeignField.status, 404);
  assert.equal((await farmer.post("/api/support").send({ category: "Other", incidentDate, subject: "No", message: "short" })).status, 400);
  assert.equal((await farmer.post("/api/support").send({ category: "Other", incidentDate: futureIncidentDate, subject: "Future incident", message: "This incident date must be rejected." })).status, 400);
  assert.equal((await farmer.post("/api/support").send({ category: "Other", incidentDate: "2026-02-30", subject: "Invalid incident", message: "This calendar date must be rejected." })).status, 400);
  assert.equal((await farmer.post("/api/support").send({ category: "Other", incidentDate, affectedDurationMinutes: "ten", subject: "Invalid duration", message: "This nonnumeric duration must be rejected." })).status, 400);

  const created = await farmer.post("/api/support").send({
    fieldId: ownedField.body.field._id,
    category: "Pump/Electricity",
    incidentDate,
    affectedDurationMinutes: 10,
    subject: "Pump stops during irrigation",
    message: "The pump stops after ten minutes even though electricity is available.",
  });
  assert.equal(created.status, 201);
  assert.match(created.body.ticket.reference, /^AG-[A-F\d]{8}$/);
  assert.equal(created.body.ticket.field.farmName, "Support Field");
  assert.equal(created.body.ticket.incidentDate.slice(0, 10), incidentDate);
  assert.equal(created.body.ticket.affectedDurationMinutes, 10);
  const ticketId = created.body.ticket._id;

  assert.equal((await farmer.get("/api/admin/support")).status, 403);
  assert.equal((await otherFarmer.get(`/api/support/${ticketId}`)).status, 404);
  assert.deepEqual((await otherFarmer.get("/api/support")).body.tickets, []);

  const adminList = await admin.get("/api/admin/support?status=Open");
  assert.equal(adminList.status, 200);
  const listedTicket = adminList.body.tickets.find((ticket) => ticket._id === ticketId);
  assert.equal(listedTicket.farmer.name, "Support Farmer");
  assert.equal(listedTicket.field.farmName, "Support Field");

  const reply = await admin.patch(`/api/admin/support/${ticketId}/reply`).send({ reply: "Please inspect the starter and voltage, then update the field pump details." });
  assert.equal(reply.status, 200);
  assert.equal(reply.body.ticket.status, "Replied");
  assert.equal(reply.body.ticket.respondingAdmin.email, "admin@example.com");

  await farmer.post("/api/auth/logout");
  assert.equal((await farmer.post("/api/auth/login").send({ email: "support@example.com", password: "strongpass3" })).status, 200);
  const restored = await farmer.get(`/api/support/${ticketId}`);
  assert.equal(restored.status, 200);
  assert.match(restored.body.ticket.adminReply, /starter and voltage/i);
  assert.equal(restored.body.ticket.status, "Replied");

  const resolved = await admin.patch(`/api/admin/support/${ticketId}/status`).send({ status: "Resolved" });
  assert.equal(resolved.status, 200);
  assert.equal(resolved.body.ticket.status, "Resolved");
  const storedTicket = await SupportTicket.findById(ticketId);
  assert.equal(storedTicket.status, "Resolved");
  assert.equal(String(storedTicket.field), ownedField.body.field._id);
  assert.equal(storedTicket.incidentDate.toISOString().slice(0, 10), incidentDate);
  assert.equal(storedTicket.affectedDurationMinutes, 10);
  assert.ok(storedTicket.repliedAt);
  assert.ok(storedTicket.respondingAdmin);
});
