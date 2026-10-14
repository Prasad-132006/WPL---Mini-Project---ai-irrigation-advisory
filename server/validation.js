import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(3).max(80),
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(8).max(72),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(72),
});

export const fieldSchema = z.object({
  farmName: z.string().trim().min(2).max(80),
  area: z.coerce.number().min(0.1).max(100000),
  crop: z.literal("Sugarcane"),
  cropStage: z.enum(["Germination", "Vegetative", "Grand growth", "Maturity"]),
  soilType: z.enum(["Alluvial", "Clay", "Loamy", "Sandy"]),
  electricity: z.enum(["Available", "Unavailable"]).default("Available"),
  soilMoisture: z.coerce.number().min(0).max(100),
  pumpFlowRateLph: z.coerce.number().min(100).max(1000000),
});

export const advisorySchema = z.object({
  fieldId: z.string().regex(/^[a-f\d]{24}$/i),
});

const incidentDateSchema = z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use a valid date in YYYY-MM-DD format.")
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  }, "Use a real calendar date.")
  .refine((value) => {
    const now = new Date();
    const localToday = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    return new Date(`${value}T00:00:00.000Z`).getTime() <= localToday;
  }, "Incident date cannot be in the future.")
  .transform((value) => new Date(`${value}T00:00:00.000Z`));

const affectedDurationSchema = z.preprocess((value) => {
  if (typeof value === "string" && /^\d+$/.test(value)) return Number(value);
  return value;
}, z.number().int().min(1).max(10080).nullable().optional());

export const supportTicketSchema = z.object({
  fieldId: z.string().regex(/^[a-f\d]{24}$/i).nullable().optional(),
  category: z.enum(["Irrigation advice", "Pump/Electricity", "Field details", "Technical issue", "Other"]),
  incidentDate: incidentDateSchema,
  affectedDurationMinutes: affectedDurationSchema,
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(10).max(3000),
});

export const supportReplySchema = z.object({
  reply: z.string().trim().min(2).max(3000),
});

export const supportStatusSchema = z.object({
  status: z.enum(["Open", "Resolved"]),
});

export const parseBody = (schema, body) => {
  const result = schema.safeParse(body);
  if (!result.success) {
    const message = result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
    const error = new Error(message);
    error.status = 400;
    throw error;
  }
  return result.data;
};
