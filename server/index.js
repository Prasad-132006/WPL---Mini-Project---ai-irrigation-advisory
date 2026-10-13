import mongoose from "mongoose";
import { createApp } from "./app.js";
import { config } from "./config.js";
import { migrateFarmsToFields } from "./migrate.js";

try {
  await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 5000 });
  const migration = await migrateFarmsToFields();
  if (migration.removedLegacyCollection) {
    console.log(`Migrated ${migration.migratedFields} field(s) and ${migration.migratedAdvisories} advisory relationship(s) from the legacy farms collection.`);
  }
  const server = createApp().listen(config.port, () => {
    console.log(`AgroAI API listening on http://localhost:${config.port}`);
    console.log(`MongoDB database: ${mongoose.connection.name}`);
  });

  const shutdown = async () => {
    server.close();
    await mongoose.disconnect();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
} catch (error) {
  console.error(`Unable to connect to MongoDB at ${config.mongoUri}: ${error.message}`);
  console.error("Start the local MongoDB service, then run npm run dev again.");
  process.exit(1);
}
