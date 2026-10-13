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

export const supportTicketSchema = z.object({
  fieldId: z.string().regex(/^[a-f\d]{24}$/i).nullable().optional(),
  category: z.enum(["Irrigation advice", "Pump/Electricity", "Field details", "Technical issue", "Other"]),
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
