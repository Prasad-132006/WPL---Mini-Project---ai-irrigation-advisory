import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  profile: {
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
  },
}, { timestamps: true, collection: "farmers" });

const farmSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  farmName: { type: String, required: true, trim: true },
  area: { type: Number, required: true, min: 0.1, max: 100000 },
  crop: { type: String, enum: ["Sugarcane"], default: "Sugarcane", required: true },
  cropStage: { type: String, enum: ["Germination", "Vegetative", "Grand growth", "Maturity"], required: true },
  soilType: { type: String, enum: ["Alluvial", "Clay", "Loamy", "Sandy"], required: true },
  electricity: { type: String, enum: ["Available", "Unavailable"], default: "Available" },
  soilMoisture: { type: Number, required: true, min: 0, max: 100 },
  pumpFlowRateLph: { type: Number, required: true, min: 100, max: 1000000 },
}, { timestamps: true, collection: "farms" });

farmSchema.index({ farmer: 1, farmName: 1 }, { unique: true });

const advisorySchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true, index: true },
  inputs: {
    crop: { type: String, enum: ["Sugarcane"], required: true },
    cropStage: String,
    soilType: String,
    soilMoisture: Number,
    area: Number,
    pumpFlowRateLph: Number,
    electricity: String,
  },
  recommendation: {
    action: String,
    irrigationRecommended: Boolean,
    recommendedIntervalDays: String,
    applicationDepthMm: Number,
    waterRequiredLitres: Number,
    pumpDurationHours: Number,
    historicalMostCommonMethod: String,
    datasetWaterLitresPerAcre: Number,
    referenceMoisturePercent: Number,
    cohortMedianMoisturePercent: Number,
    moistureBand: String,
    matchedRecordCount: Number,
    referenceYieldQuintalPerAcre: Number,
    historicalDiseaseNote: String,
    referenceRainfallMm: Number,
    referenceTemperatureC: Number,
    referenceRecordIndex: Number,
    datasetBasis: String,
    safetyNote: String,
    operationNote: String,
  },
  accepted: { type: Boolean, default: false, index: true },
  acceptedAt: { type: Date, default: null },
}, { timestamps: true, collection: "advisories" });

export const User = mongoose.model("User", userSchema);
export const Farm = mongoose.model("Farm", farmSchema);
export const Advisory = mongoose.model("Advisory", advisorySchema);
