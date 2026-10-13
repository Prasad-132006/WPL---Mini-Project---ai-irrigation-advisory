import mongoose from "mongoose";

const sameValue = (left, right) => String(left ?? "") === String(right ?? "");

export const migrateFarmsToFields = async () => {
  const database = mongoose.connection.db;
  if (!database) throw new Error("MongoDB must be connected before running migrations.");

  const farmCollectionExists = (await database.listCollections({ name: "farms" }, { nameOnly: true }).toArray()).length > 0;
  if (!farmCollectionExists) return { migratedFields: 0, migratedAdvisories: 0, removedLegacyCollection: false };

  const legacyFarms = database.collection("farms");
  const fields = database.collection("fields");
  const advisories = database.collection("advisories");
  const sourceRecords = await legacyFarms.find({}).toArray();

  if (sourceRecords.length > 0) {
    await fields.bulkWrite(sourceRecords.map((record) => ({
      updateOne: {
        filter: { _id: record._id },
        update: { $setOnInsert: record },
        upsert: true,
      },
    })), { ordered: true });

    const copiedRecords = await fields.find({ _id: { $in: sourceRecords.map((record) => record._id) } }).toArray();
    const copiedById = new Map(copiedRecords.map((record) => [String(record._id), record]));
    const copyIsVerified = sourceRecords.every((source) => {
      const destination = copiedById.get(String(source._id));
      return destination
        && sameValue(destination.farmer, source.farmer)
        && sameValue(destination.farmName, source.farmName)
        && sameValue(destination.crop, source.crop);
    });

    if (!copyIsVerified || copiedRecords.length !== sourceRecords.length) {
      throw new Error("Legacy farm migration verification failed; the farms collection was preserved.");
    }
  }

  const advisoryCollectionExists = (await database.listCollections({ name: "advisories" }, { nameOnly: true }).toArray()).length > 0;
  let migratedAdvisories = 0;
  if (advisoryCollectionExists) {
    const result = await advisories.updateMany(
      { field: { $exists: false }, farm: { $exists: true } },
      [{ $set: { field: "$farm" } }],
    );
    migratedAdvisories = result.modifiedCount;
    const invalidRelationship = await advisories.findOne({
      farm: { $exists: true },
      $expr: { $ne: ["$field", "$farm"] },
    });
    if (invalidRelationship) {
      throw new Error("Legacy advisory relationship migration failed; the farms collection was preserved.");
    }
  }

  await legacyFarms.drop();
  return { migratedFields: sourceRecords.length, migratedAdvisories, removedLegacyCollection: true };
};
