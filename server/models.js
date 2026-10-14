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

const fieldSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  farmName: { type: String, required: true, trim: true },
  area: { type: Number, required: true, min: 0.1, max: 100000 },
  crop: { type: String, enum: ["Sugarcane"], default: "Sugarcane", required: true },
  cropStage: { type: String, enum: ["Germination", "Vegetative", "Grand growth", "Maturity"], required: true },
  soilType: { type: String, enum: ["Alluvial", "Clay", "Loamy", "Sandy"], required: true },
  electricity: { type: String, enum: ["Available", "Unavailable"], default: "Available" },
  soilMoisture: { type: Number, required: true, min: 0, max: 100 },
  pumpFlowRateLph: { type: Number, required: true, min: 100, max: 1000000 },
}, { timestamps: true, collection: "fields" });

fieldSchema.index({ farmer: 1, farmName: 1 }, { unique: true });

const advisorySchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  field: { type: mongoose.Schema.Types.ObjectId, ref: "Field", required: true, index: true },
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

const supportTicketSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  field: { type: mongoose.Schema.Types.ObjectId, ref: "Field", default: null, index: true },
  category: { type: String, enum: ["Irrigation advice", "Pump/Electricity", "Field details", "Technical issue", "Other"], required: true },
  incidentDate: { type: Date, required: true },
  affectedDurationMinutes: { type: Number, default: null, min: 1, max: 10080, validate: { validator: (value) => value == null || Number.isInteger(value), message: "Affected duration must be a whole number." } },
  subject: { type: String, required: true, trim: true, minlength: 3, maxlength: 120 },
  message: { type: String, required: true, trim: true, minlength: 10, maxlength: 3000 },
  adminReply: { type: String, default: "", maxlength: 3000 },
  status: { type: String, enum: ["Open", "Replied", "Resolved"], default: "Open", required: true, index: true },
  repliedAt: { type: Date, default: null },
  respondingAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
}, { timestamps: true, collection: "support_tickets" });

supportTicketSchema.index({ farmer: 1, createdAt: -1 });
supportTicketSchema.index({ status: 1, updatedAt: -1 });

export const User = mongoose.model("User", userSchema);
export const Field = mongoose.model("Field", fieldSchema);
export const Advisory = mongoose.model("Advisory", advisorySchema);
export const SupportTicket = mongoose.model("SupportTicket", supportTicketSchema);
