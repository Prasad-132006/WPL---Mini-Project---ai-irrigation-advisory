import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import { config } from "./config.js";
import { Advisory, Field, SupportTicket, User } from "./models.js";
import { advisorySchema, fieldSchema, loginSchema, parseBody, registerSchema, supportReplySchema, supportStatusSchema, supportTicketSchema } from "./validation.js";
import { clearSession, publicUser, requireAuth, requireSupportAdmin, setSession } from "./auth.js";
import { createRecommendation, datasetSize } from "./dataset.js";

export const createApp = () => {
  const app = express();
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: config.clientOrigin, credentials: true }));
  app.use(express.json({ limit: "50kb" }));
  app.use(cookieParser());

  const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 50, standardHeaders: true, legacyHeaders: false });
  const supportLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });
  const isObjectId = (value) => /^[a-f\d]{24}$/i.test(value);
  const ticketResponse = (ticket) => {
    const value = ticket.toObject();
    return { ...value, reference: `AG-${String(value._id).slice(-8).toUpperCase()}` };
  };

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

  app.get("/api/fields", requireAuth, async (req, res) => {
    const fields = await Field.find({ farmer: req.user._id }).sort({ updatedAt: -1 });
    res.json({ fields });
  });

  app.get("/api/fields/:id", requireAuth, async (req, res) => {
    const field = await Field.findOne({ _id: req.params.id, farmer: req.user._id });
    if (!field) return res.status(404).json({ message: "Field not found." });
    const advisories = await Advisory.find({ field: field._id, farmer: req.user._id }).sort({ createdAt: -1 });
    res.json({ field, advisories });
  });

  app.post("/api/fields", requireAuth, async (req, res) => {
    const data = parseBody(fieldSchema, req.body);
    const field = await Field.create({ ...data, farmer: req.user._id });
    res.status(201).json({ field });
  });

  app.put("/api/fields/:id", requireAuth, async (req, res) => {
    const data = parseBody(fieldSchema, req.body);
    const field = await Field.findOneAndUpdate({ _id: req.params.id, farmer: req.user._id }, data, { returnDocument: "after", runValidators: true });
    if (!field) return res.status(404).json({ message: "Field not found." });
    res.json({ field });
  });

  app.post("/api/advisories", requireAuth, async (req, res) => {
    const { fieldId } = parseBody(advisorySchema, req.body);
    const field = await Field.findOne({ _id: fieldId, farmer: req.user._id });
    if (!field) return res.status(404).json({ message: "Field not found." });
    const recommendation = createRecommendation(field.toObject());
    const advisory = await Advisory.create({
      farmer: req.user._id,
      field: field._id,
      inputs: { crop: field.crop, cropStage: field.cropStage, soilType: field.soilType, soilMoisture: field.soilMoisture, area: field.area, pumpFlowRateLph: field.pumpFlowRateLph, electricity: field.electricity },
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

  app.post("/api/support", requireAuth, supportLimiter, async (req, res) => {
    const data = parseBody(supportTicketSchema, req.body);
    let field = null;
    if (data.fieldId) {
      field = await Field.findOne({ _id: data.fieldId, farmer: req.user._id });
      if (!field) return res.status(404).json({ message: "Related field not found." });
    }
    const ticket = await SupportTicket.create({
      farmer: req.user._id,
      field: field?._id || null,
      category: data.category,
      subject: data.subject,
      message: data.message,
    });
    await ticket.populate("field", "farmName");
    res.status(201).json({ ticket: ticketResponse(ticket) });
  });

  app.get("/api/support", requireAuth, async (req, res) => {
    const tickets = await SupportTicket.find({ farmer: req.user._id }).populate("field", "farmName").sort({ createdAt: -1 });
    res.json({ tickets: tickets.map(ticketResponse) });
  });

  app.get("/api/support/:id", requireAuth, async (req, res) => {
    if (!isObjectId(req.params.id)) return res.status(400).json({ message: "Invalid ticket identifier." });
    const ticket = await SupportTicket.findOne({ _id: req.params.id, farmer: req.user._id })
      .populate("field", "farmName")
      .populate("respondingAdmin", "name");
    if (!ticket) return res.status(404).json({ message: "Support request not found." });
    res.json({ ticket: ticketResponse(ticket) });
  });

  app.get("/api/admin/support", requireAuth, requireSupportAdmin, async (req, res) => {
    const allowedStatuses = ["Open", "Replied", "Resolved"];
    if (req.query.status && !allowedStatuses.includes(req.query.status)) return res.status(400).json({ message: "Invalid support status filter." });
    const filter = req.query.status ? { status: req.query.status } : {};
    const tickets = await SupportTicket.find(filter)
      .populate("farmer", "name email")
      .populate("field", "farmName")
      .populate("respondingAdmin", "name email")
      .sort({ updatedAt: -1 });
    res.json({ tickets: tickets.map(ticketResponse) });
  });

  app.patch("/api/admin/support/:id/reply", requireAuth, requireSupportAdmin, async (req, res) => {
    if (!isObjectId(req.params.id)) return res.status(400).json({ message: "Invalid ticket identifier." });
    const { reply } = parseBody(supportReplySchema, req.body);
    const ticket = await SupportTicket.findByIdAndUpdate(req.params.id, {
      adminReply: reply,
      status: "Replied",
      repliedAt: new Date(),
      respondingAdmin: req.user._id,
    }, { returnDocument: "after", runValidators: true });
    if (!ticket) return res.status(404).json({ message: "Support request not found." });
    await ticket.populate([{ path: "farmer", select: "name email" }, { path: "field", select: "farmName" }, { path: "respondingAdmin", select: "name email" }]);
    res.json({ ticket: ticketResponse(ticket) });
  });

  app.patch("/api/admin/support/:id/status", requireAuth, requireSupportAdmin, async (req, res) => {
    if (!isObjectId(req.params.id)) return res.status(400).json({ message: "Invalid ticket identifier." });
    const { status } = parseBody(supportStatusSchema, req.body);
    const ticket = await SupportTicket.findByIdAndUpdate(req.params.id, { status }, { returnDocument: "after", runValidators: true });
    if (!ticket) return res.status(404).json({ message: "Support request not found." });
    await ticket.populate([{ path: "farmer", select: "name email" }, { path: "field", select: "farmName" }, { path: "respondingAdmin", select: "name email" }]);
    res.json({ ticket: ticketResponse(ticket) });
  });

  app.use((req, res) => res.status(404).json({ message: "API route not found." }));
  app.use((error, _req, res, _next) => {
    void _next;
    if (error?.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];
      return res.status(409).json({ message: field === "email" ? "An account with this email already exists." : "A field with this name already exists." });
    }
    if (!error.status || error.status >= 500) console.error(error);
    res.status(error.status || 500).json({ message: error.status ? error.message : "The server could not complete the request." });
  });

  return app;
};
