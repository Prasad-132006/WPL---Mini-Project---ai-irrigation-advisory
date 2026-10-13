import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "csv-parse/sync";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const csv = fs.readFileSync(path.join(root, "FINAL_SUGARCANE_DATASET.csv"), "utf8");
const records = parse(csv, { columns: true, skip_empty_lines: true, trim: true });

const stageMap = { Germination: "Early", Vegetative: "Early", "Grand growth": "Mid", Maturity: "Late" };
const intervalMap = {
  Germination: { Sandy: "5–6", Loamy: "6–7", Alluvial: "6–7", Clay: "8–10" },
  Vegetative: { Sandy: "6–7", Loamy: "7–10", Alluvial: "7–10", Clay: "12–15" },
  "Grand growth": { Sandy: "7", Loamy: "10", Alluvial: "10", Clay: "12–15" },
  Maturity: { Sandy: "10", Loamy: "12–15", Alluvial: "12–15", Clay: "15–20" },
};
const depthByStage = { Germination: 25, Vegetative: 50, "Grand growth": 50, Maturity: 40 };
const soilDepthFactor = { Sandy: 0.8, Loamy: 1, Alluvial: 1, Clay: 1.1 };
const LITRES_PER_MM_ACRE = 4046.85642;

const numberOrNull = (value) => {
  if (value === null || value === undefined || String(value).trim() === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  if (!sorted.length) return null;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};

const percentile = (values, fraction) => {
  const sorted = [...values].sort((a, b) => a - b);
  if (!sorted.length) return null;
  return sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * fraction))];
};

const mostCommon = (values) => {
  const counts = new Map();
  values.filter(Boolean).forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "Not available";
};

export const datasetSize = records.length;

export const createRecommendation = (farm) => {
  const datasetStage = stageMap[farm.cropStage];
  const indexed = records.map((record, index) => ({ record, index }));
  const exactCohort = indexed.filter(({ record }) => record.Growth_Stage === datasetStage && record.Soil_Type === farm.soilType);
  const stageCohort = indexed.filter(({ record }) => record.Growth_Stage === datasetStage);
  const cohort = exactCohort.length ? exactCohort : stageCohort;
  const withMoisture = cohort.filter(({ record }) => numberOrNull(record["Soil_Moisture_%"]) !== null);
  if (!withMoisture.length) throw Object.assign(new Error("No suitable sugarcane reference records were found."), { status: 422 });

  const selected = withMoisture.reduce((closest, candidate) => (
    Math.abs(numberOrNull(candidate.record["Soil_Moisture_%"]) - farm.soilMoisture)
      < Math.abs(numberOrNull(closest.record["Soil_Moisture_%"]) - farm.soilMoisture) ? candidate : closest
  ));
  const moistureValues = withMoisture.map(({ record }) => numberOrNull(record["Soil_Moisture_%"]));
  const lowerBand = percentile(moistureValues, 0.33);
  const upperBand = percentile(moistureValues, 0.67);
  const moistureBand = farm.soilMoisture < lowerBand ? "Low" : farm.soilMoisture > upperBand ? "High" : "Typical";
  const irrigationRecommended = moistureBand === "Low";
  const applicationDepthMm = Math.round(depthByStage[farm.cropStage] * soilDepthFactor[farm.soilType]);
  const waterRequiredLitres = irrigationRecommended
    ? Math.round(applicationDepthMm * LITRES_PER_MM_ACRE * farm.area)
    : 0;
  const pumpDurationHours = irrigationRecommended
    ? Math.round((waterRequiredLitres / farm.pumpFlowRateLph) * 10) / 10
    : 0;
  const record = selected.record;
  const severity = record.Disease_Severity;
  const disease = record.Disease_Type;

  const action = moistureBand === "Low"
    ? farm.electricity === "Unavailable"
      ? "Moisture is low, but wait until a safe electricity supply is available"
      : "Irrigation review recommended; schedule according to pump capacity"
    : moistureBand === "High"
      ? "Delay irrigation and recheck root-zone moisture in 24 hours"
      : "Recheck root-zone moisture before irrigating";

  return {
    action,
    irrigationRecommended,
    recommendedIntervalDays: intervalMap[farm.cropStage][farm.soilType],
    applicationDepthMm,
    waterRequiredLitres,
    pumpDurationHours,
    historicalMostCommonMethod: mostCommon(cohort.map(({ record: item }) => item.Irrigation_Method_Type)),
    datasetWaterLitresPerAcre: numberOrNull(record.Water_Quantity_liters_per_acre),
    referenceMoisturePercent: numberOrNull(record["Soil_Moisture_%"]),
    cohortMedianMoisturePercent: Math.round(median(moistureValues) * 10) / 10,
    moistureBand,
    matchedRecordCount: cohort.length,
    referenceYieldQuintalPerAcre: numberOrNull(record.Yield_Quintal_per_Acre),
    historicalDiseaseNote: severity === "High" && disease && disease !== "None"
      ? `Matched row records high ${disease.toLowerCase()} severity; this is historical context, not a diagnosis.`
      : "Matched row has no specific high-severity disease record.",
    referenceRainfallMm: numberOrNull(record.Rainfall_Total_mm),
    referenceTemperatureC: numberOrNull(record.Temp_Avg_C) ?? numberOrNull(record.Temp_Max_C),
    referenceRecordIndex: selected.index + 2,
    datasetBasis: `${cohort.length} historical sugarcane rows matched ${farm.soilType} soil and the mapped ${datasetStage} stage; the displayed reference row has the nearest soil moisture.`,
    safetyNote: irrigationRecommended
      ? `The ${applicationDepthMm} mm application is a planning estimate derived from published sugarcane depth/interval guidance, not from the CSV's unusually small litres-per-acre field. Check recent rainfall, field drainage, root-zone moisture, and local agricultural advice before operating the pump.`
      : "No water volume is prescribed while moisture is not low relative to the matched historical cohort. Check recent rainfall and local field conditions before changing this decision.",
    operationNote: !irrigationRecommended
      ? "No pump operation is recommended from this reading."
      : farm.electricity === "Unavailable"
        ? "Electricity is marked unavailable. Do not operate or schedule the pump until a safe supply is confirmed."
        : pumpDurationHours > 12
          ? `The estimated ${pumpDurationHours}-hour runtime is longer than one normal irrigation window. Split the application into manageable cycles or zones, watch infiltration and runoff, and recheck moisture between cycles.`
          : `Estimated runtime is ${pumpDurationHours} hours at the entered pump flow. Recheck actual discharge and field infiltration during operation.`,
  };
};
