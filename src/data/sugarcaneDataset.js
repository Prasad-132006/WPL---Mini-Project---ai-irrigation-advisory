import csvUrl from "../../FINAL_SUGARCANE_DATASET.csv?url";

const parseCsv = (text) => {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    return headers.reduce((record, header, index) => {
      record[header] = values[index] || "";
      return record;
    }, {});
  });
};

export const loadSugarcaneDataset = async () => {
  const response = await fetch(csvUrl);
  const csvText = await response.text();
  return parseCsv(csvText);
};

export const findClosestFarmRecord = (dataset, soilType, cropStage) => {
  const normalizedStage = cropStage.toLowerCase();
  const stageMatches = dataset.filter((record) =>
    record.Growth_Stage.toLowerCase().includes(normalizedStage.split(" ")[0])
  );
  const records = stageMatches.length ? stageMatches : dataset;
  const soilMatches = records.filter(
    (record) => record.Soil_Type.toLowerCase() === soilType.toLowerCase()
  );

  return (soilMatches.length ? soilMatches : records)[0];
};