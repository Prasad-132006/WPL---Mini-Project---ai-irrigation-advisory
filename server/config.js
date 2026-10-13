import "dotenv/config";

export const config = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/agroai",
  jwtSecret: process.env.JWT_SECRET || "development-only-change-me-before-production",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  isProduction: process.env.NODE_ENV === "production",
};
