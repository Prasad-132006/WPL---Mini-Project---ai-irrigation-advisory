import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import { config } from "./config.js";
import { Advisory, Farm, User } from "./models.js";
import { advisorySchema, farmSchema, loginSchema, parseBody, registerSchema } from "./validation.js";
import { clearSession, publicUser, requireAuth, setSession } from "./auth.js";
import { createRecommendation, datasetSize } from "./dataset.js";

export const createApp = () => {
  const app = express();
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: config.clientOrigin, credentials: true }));
  app.use(express.json({ limit: "50kb" }));
  app.use(cookieParser());

  const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 50, standardHeaders: true, legacyHeaders: false });

  app.get("/api/health", (_req, res) => res.json({ status: "ok", database: "connected", datasetRecords: datasetSize }));

  app.post("/api/auth/register", authLimiter, async (req, res) => {
    const data = parseBody(registerSchema, req.body);
    const existing = await User.exists({ email: data.email });
    if (existing) return res.status(409).json({ message: "An account with this email already exists." });
    const user = await User.create({ name: data.name, email: data.email, passwordHash: await bcrypt.hash(data.password, 12) });
    setSession(res, user);
    res.status(201).json({ user: publicUser(user) });
  });

  app.post("/api/auth/login", authLimiter, async (req, res) => {
    const data = parseBody(loginSchema, req.body);
    const user = await User.findOne({ email: data.email }).select("+passwordHash");
    if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
      return res.status(401).json({ message: "Email or password is incorrect." });
    }
    setSession(res, user);
    res.json({ user: publicUser(user) });
  });

  app.post("/api/auth/logout", (_req, res) => {
    clearSession(res);
    res.status(204).end();
  });

  app.get("/api/auth/me", requireAuth, (req, res) => res.json({ user: publicUser(req.user) }));

  app.get("/api/farms", requireAuth, async (req, res) => {
    const farms = await Farm.find({ farmer: req.user._id }).sort({ updatedAt: -1 });
    res.json({ farms });
  });

  app.post("/api/farms", requireAuth, async (req, res) => {
    const data = parseBody(farmSchema, req.body);
    const farm = await Farm.create({ ...data, farmer: req.user._id });
    res.status(201).json({ farm });
  });

  app.put("/api/farms/:id", requireAuth, async (req, res) => {
    const data = parseBody(farmSchema, req.body);
    const farm = await Farm.findOneAndUpdate({ _id: req.params.id, farmer: req.user._id }, data, { returnDocument: "after", runValidators: true });
    if (!farm) return res.status(404).json({ message: "Farm not found." });
    res.json({ farm });
  });

  app.post("/api/advisories", requireAuth, async (req, res) => {
    const { farmId } = parseBody(advisorySchema, req.body);
    const farm = await Farm.findOne({ _id: farmId, farmer: req.user._id });
    if (!farm) return res.status(404).json({ message: "Farm not found." });
    const recommendation = createRecommendation(farm.toObject());
    const advisory = await Advisory.create({
      farmer: req.user._id,
      farm: farm._id,
      inputs: { crop: farm.crop, cropStage: farm.cropStage, soilType: farm.soilType, soilMoisture: farm.soilMoisture, area: farm.area, pumpFlowRateLph: farm.pumpFlowRateLph, electricity: farm.electricity },
      recommendation,
    });
    res.status(201).json({ advisory });
  });

  app.get("/api/advisories", requireAuth, async (req, res) => {
    const advisories = await Advisory.find({ farmer: req.user._id }).sort({ createdAt: -1 }).limit(50);
    res.json({ advisories });
  });

  app.patch("/api/advisories/:id/accept", requireAuth, async (req, res) => {
    const advisory = await Advisory.findOneAndUpdate(
      { _id: req.params.id, farmer: req.user._id },
      { accepted: true, acceptedAt: new Date() },
      { returnDocument: "after" },
    );
    if (!advisory) return res.status(404).json({ message: "Advisory not found." });
    res.json({ advisory });
  });

  app.use((req, res) => res.status(404).json({ message: "API route not found." }));
  app.use((error, _req, res, _next) => {
    void _next;
    if (error?.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];
      return res.status(409).json({ message: field === "email" ? "An account with this email already exists." : "A farm with this plot name already exists." });
    }
    if (!error.status || error.status >= 500) console.error(error);
    res.status(error.status || 500).json({ message: error.status ? error.message : "The server could not complete the request." });
  });

  return app;
};
