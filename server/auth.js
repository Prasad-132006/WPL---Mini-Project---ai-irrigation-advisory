import jwt from "jsonwebtoken";
import { config } from "./config.js";
import { User } from "./models.js";

const COOKIE_NAME = "agroai_session";

export const isSupportAdmin = (user) => config.supportAdminEmails.has(user.email.toLowerCase());

export const publicUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  profile: user.profile,
  isSupportAdmin: isSupportAdmin(user),
});

export const setSession = (res, user) => {
  const token = jwt.sign({ sub: user._id.toString() }, config.jwtSecret, { expiresIn: "7d" });
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: config.isProduction,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
};

export const requireSupportAdmin = (req, res, next) => {
  if (!isSupportAdmin(req.user)) return res.status(403).json({ message: "Support administrator access required." });
  next();
};

export const clearSession = (res) => res.clearCookie(COOKIE_NAME, {
  httpOnly: true,
  sameSite: "lax",
  secure: config.isProduction,
  path: "/",
});

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return res.status(401).json({ message: "Authentication required." });
    const payload = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ message: "Session is no longer valid." });
    req.user = user;
    next();
  } catch {
    clearSession(res);
    res.status(401).json({ message: "Session is invalid or expired." });
  }
};
