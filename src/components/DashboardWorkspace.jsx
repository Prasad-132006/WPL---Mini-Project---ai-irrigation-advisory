import { useEffect, useState } from "react";
import { AlertTriangle, BrainCircuit, CheckCircle2, CloudRain, Droplets, Gauge, History, MapPin, Save, Sprout, ThermometerSun } from "lucide-react";
import { api } from "../api";

const initialFarm = { farmName: "", area: "", crop: "Sugarcane", cropStage: "Grand growth", soilType: "Loamy", electricity: "Available", soilMoisture: "", pumpFlowRateLph: "" };
const toFormFarm = (farm) => ({ ...farm, area: String(farm.area), crop: "Sugarcane", soilMoisture: String(farm.soilMoisture), pumpFlowRateLph: farm.pumpFlowRateLph ? String(farm.pumpFlowRateLph) : "" });

const DashboardWorkspace = () => {
  const [farm, setFarm] = useState(initialFarm);
  const [farmId, setFarmId] = useState(null);
  const [farms, setFarms] = useState([]);
  const [advisories, setAdvisories] = useState([]);
  const [activeAdvisory, setActiveAdvisory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api("/farms"), api("/advisories")])
      .then(([farmResponse, advisoryResponse]) => {
        setFarms(farmResponse.farms);
        setAdvisories(advisoryResponse.advisories);
        if (farmResponse.farms[0]) {
          setFarmId(farmResponse.farms[0]._id);
          setFarm(toFormFarm(farmResponse.farms[0]));
        }
        if (farmResponse.farms[0]) setActiveAdvisory(advisoryResponse.advisories.find((item) => item.farm === farmResponse.farms[0]._id) || null);
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  const updateFarm = ({ target }) => {
    let value = target.value;
    if (target.name === "soilMoisture" && value !== "") value = String(Math.max(0, Math.min(100, Number(value))));
    setFarm((current) => ({ ...current, [target.name]: value }));
    setMessage("");
  };

  const selectFarm = (id) => {
    if (!id) {
      setFarmId(null); setFarm(initialFarm); setActiveAdvisory(null); return;
    }
    const selected = farms.find((item) => item._id === id);
    setFarmId(id);
    setFarm(toFormFarm(selected));
    setActiveAdvisory(advisories.find((item) => item.farm === id) || null);
  };

  const validateFarm = () => {
    if (farm.farmName.trim().length < 2) return "Enter a plot name with at least 2 characters.";
    if (!farm.area || Number(farm.area) < 0.1) return "Area must be at least 0.1 acre.";
    if (farm.soilMoisture === "" || Number(farm.soilMoisture) < 0 || Number(farm.soilMoisture) > 100) return "Soil moisture must be between 0 and 100%.";
    if (!farm.pumpFlowRateLph || Number(farm.pumpFlowRateLph) < 100) return "Enter a measured pump flow rate of at least 100 litres per hour.";
    return "";
  };

  const saveFarm = async ({ quiet = false } = {}) => {
    const validationError = validateFarm();
    if (validationError) throw new Error(validationError);
    setSaving(true);
    try {
      const response = await api(farmId ? `/farms/${farmId}` : "/farms", { method: farmId ? "PUT" : "POST", body: JSON.stringify(farm) });
      setFarmId(response.farm._id);
      setFarms((current) => [response.farm, ...current.filter((item) => item._id !== response.farm._id)]);
      if (!quiet) setMessage("Farm details saved to MongoDB.");
      return response.farm;
    } finally { setSaving(false); }
  };

  const handleSave = async () => {
    setError("");
    try { await saveFarm(); } catch (requestError) { setError(requestError.message); }
  };

  const runAnalysis = async () => {
    setError(""); setMessage(""); setIsAnalyzing(true);
    try {
      const savedFarm = await saveFarm({ quiet: true });
      const response = await api("/advisories", { method: "POST", body: JSON.stringify({ farmId: savedFarm._id }) });
      setActiveAdvisory(response.advisory);
      setAdvisories((current) => [response.advisory, ...current]);
      setMessage("Recommendation generated and saved to advisory history.");
    } catch (requestError) { setError(requestError.message); }
    finally { setIsAnalyzing(false); }
  };

  const acceptAdvisory = async () => {
    setError("");
    try {
      const response = await api(`/advisories/${activeAdvisory._id}/accept`, { method: "PATCH" });
      setActiveAdvisory(response.advisory);
      setAdvisories((current) => current.map((item) => item._id === response.advisory._id ? response.advisory : item));
      setMessage("Advisory acceptance saved.");
    } catch (requestError) { setError(requestError.message); }
  };

  if (loading) return <div className="rounded-2xl bg-white p-8 text-center text-slate-600 shadow-sm">Loading your saved farm data...</div>;
  const recommendation = activeAdvisory?.recommendation;

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm font-semibold uppercase tracking-widest text-green-600">Farmer workspace</p><h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Sugarcane irrigation advisory centre</h2><p className="mt-3 max-w-3xl text-slate-600">Save plot conditions and generate a rule-based recommendation from the project’s historical sugarcane dataset.</p></div>
        <label className="text-sm font-medium text-slate-700">Saved plot<select value={farmId || ""} onChange={(event) => selectFarm(event.target.value)} className="ml-3 rounded-lg border border-slate-300 bg-white px-3 py-2"><option value="">New plot</option>{farms.map((item) => <option key={item._id} value={item._id}>{item.farmName}</option>)}</select></label>
      </div>
      {(message || error) && <p className={`rounded-lg px-4 py-3 text-sm ${error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>{error || message}</p>}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-green-700"><MapPin size={19} /><h3 className="text-xl font-bold">1. Farm inputs</h3></div><p className="mt-2 text-sm text-slate-500">Details are stored per farmer in MongoDB.</p></div><Sprout className="text-green-600" size={28} /></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">Plot name<input name="farmName" value={farm.farmName} placeholder="e.g. North Plot" onChange={updateFarm} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-green-600" /></label>
            <label className="text-sm font-medium text-slate-700">Crop<input value="Sugarcane" readOnly className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-700" /></label>
            <label className="text-sm font-medium text-slate-700">Area (acres)<input name="area" type="number" min="0.1" step="0.1" value={farm.area} placeholder="e.g. 2.5" onChange={updateFarm} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-green-600" /></label>
            <label className="text-sm font-medium text-slate-700">Crop stage<select name="cropStage" value={farm.cropStage} onChange={updateFarm} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-600"><option>Germination</option><option>Vegetative</option><option>Grand growth</option><option>Maturity</option></select></label>
            <label className="text-sm font-medium text-slate-700">Soil type<select name="soilType" value={farm.soilType} onChange={updateFarm} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-600"><option>Alluvial</option><option>Clay</option><option>Loamy</option><option>Sandy</option></select></label>
            <label className="text-sm font-medium text-slate-700">Current moisture (%)<input name="soilMoisture" type="number" min="0" max="100" value={farm.soilMoisture} placeholder="e.g. 24" onChange={updateFarm} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-green-600" /></label>
            <label className="text-sm font-medium text-slate-700">Electricity<select name="electricity" value={farm.electricity} onChange={updateFarm} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-600"><option>Available</option><option>Unavailable</option></select></label>
            <label className="text-sm font-medium text-slate-700">Measured pump flow (L/hour)<input name="pumpFlowRateLph" type="number" min="100" max="1000000" step="100" value={farm.pumpFlowRateLph} placeholder="e.g. 20000" onChange={updateFarm} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-green-600" /><span className="mt-1 block text-xs font-normal text-slate-500">Use the pump’s measured or rated output; this determines duration.</span></label>
          </div>
          <button type="button" onClick={handleSave} disabled={saving} className="mt-6 flex items-center gap-2 rounded-lg border border-green-600 px-4 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-50 disabled:opacity-60"><Save size={17} />{saving ? "Saving..." : "Save farm details"}</button>
        </div>
        <div className="rounded-2xl bg-[#002B1D] p-6 text-white shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-emerald-300"><CloudRain size={19} /><h3 className="text-xl font-bold">2. Historical indicators</h3></div><p className="mt-2 text-sm text-emerald-100">Reference values come from the matched CSV row, not live sensors or weather services.</p></div><History className="text-emerald-300" size={26} /></div>
          <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl bg-white/10 p-4"><CloudRain className="text-sky-300" size={21} /><strong className="mt-3 block text-2xl">{recommendation?.referenceRainfallMm != null ? `${recommendation.referenceRainfallMm.toFixed(0)} mm` : "—"}</strong><span className="text-sm text-emerald-100">CSV rainfall-total field</span></div><div className="rounded-xl bg-white/10 p-4"><ThermometerSun className="text-orange-300" size={21} /><strong className="mt-3 block text-2xl">{recommendation?.referenceTemperatureC != null ? `${recommendation.referenceTemperatureC.toFixed(1)}°C` : "—"}</strong><span className="text-sm text-emerald-100">CSV average temperature</span></div></div>
          <p className="mt-5 flex items-start gap-2 text-sm text-emerald-100"><Droplets className="mt-0.5 shrink-0" size={16} />Enter the current moisture reading manually. No physical sensor connection is claimed.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="flex items-center gap-2 text-purple-700"><BrainCircuit size={20} /><h3 className="text-xl font-bold">3. Dataset analysis</h3></div><p className="mt-3 text-sm leading-6 text-slate-600">The backend matches soil type, mapped sugarcane growth stage, and nearest soil moisture across all 3,000 historical rows. This is rule-based analysis, not a trained AI model.</p>
          <div className="mt-6 space-y-3 text-sm text-slate-600"><div className="flex justify-between"><span>Farmer-entered field conditions</span><CheckCircle2 className="text-green-600" size={18} /></div><div className="flex justify-between"><span>Historical dataset indicators</span><CheckCircle2 className="text-green-600" size={18} /></div><div className="flex justify-between"><span>Sugarcane-only validation</span><CheckCircle2 className="text-green-600" size={18} /></div></div>
          <button type="button" onClick={runAnalysis} disabled={isAnalyzing || saving} className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-wait disabled:opacity-70">{isAnalyzing ? "Analyzing and saving..." : "Generate recommendation"}<BrainCircuit size={18} /></button>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-green-700"><Gauge size={20} /><h3 className="text-xl font-bold">4. Smart recommendation</h3></div><p className="mt-2 text-sm text-slate-500">{recommendation ? `Saved advice for ${farm.farmName || "this plot"}.` : "Generate a plot-specific recommendation."}</p></div>{recommendation && <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">SAVED</span>}</div>
          {!recommendation ? <div className="mt-8 rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">Your irrigation decision, planning volume, and historical comparison will appear here after analysis.</div> : <>
            <div className={`mt-6 rounded-xl p-5 ${recommendation.irrigationRecommended ? "bg-green-50" : "bg-amber-50"}`}>
              <div className="flex gap-3"><Sprout className={`mt-1 shrink-0 ${recommendation.irrigationRecommended ? "text-green-600" : "text-amber-600"}`} size={22} /><div><h4 className="font-bold text-slate-900">{recommendation.action}</h4>{recommendation.irrigationRecommended ? <p className="mt-2 text-sm leading-6 text-green-800">Planning application: <strong>{recommendation.applicationDepthMm} mm</strong>, approximately <strong>{recommendation.waterRequiredLitres.toLocaleString()} litres</strong>. At {activeAdvisory.inputs.pumpFlowRateLph.toLocaleString()} L/hour, estimated pump time is <strong>{recommendation.pumpDurationHours} hours</strong>.</p> : <p className="mt-2 text-sm leading-6 text-amber-800">Current moisture is not low relative to the matched historical cohort, so AgroAI does not prescribe a water volume or pump runtime.</p>}</div></div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-slate-200 p-3"><span className="text-xs text-slate-500">Moisture band</span><strong className="mt-1 block">{recommendation.moistureBand} · {activeAdvisory.inputs.soilMoisture}%</strong></div>
              <div className="rounded-lg border border-slate-200 p-3"><span className="text-xs text-slate-500">Typical interval</span><strong className="mt-1 block">{recommendation.recommendedIntervalDays} days</strong></div>
              <div className="rounded-lg border border-slate-200 p-3"><span className="text-xs text-slate-500">Historical method</span><strong className="mt-1 block">{recommendation.historicalMostCommonMethod}</strong></div>
              <div className="rounded-lg border border-slate-200 p-3"><span className="text-xs text-slate-500">Matched rows</span><strong className="mt-1 block">{recommendation.matchedRecordCount}</strong></div>
            </div>
            <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700"><p><strong>Nearest raw CSV row #{recommendation.referenceRecordIndex}:</strong> moisture {recommendation.referenceMoisturePercent?.toFixed(1)}%, water field {recommendation.datasetWaterLitresPerAcre?.toFixed(0) || "—"} L/acre, yield {recommendation.referenceYieldQuintalPerAcre?.toFixed(1) || "—"} q/acre.</p><p className="mt-2 text-xs text-slate-500">The raw CSV water field is shown for traceability but is not used as an operational dose because its scale is inconsistent with published sugarcane irrigation depths.</p></div>
            <p className="mt-4 text-xs leading-5 text-slate-500">{recommendation.datasetBasis}</p>
            <p className="mt-3 rounded-lg bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-800">{recommendation.safetyNote}</p>
            <p className="mt-3 rounded-lg bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800"><strong>Operation note:</strong> {recommendation.operationNote}</p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="flex items-center gap-2 text-sm text-amber-700"><AlertTriangle size={17} />{recommendation.historicalDiseaseNote}</p><button type="button" onClick={acceptAdvisory} disabled={activeAdvisory.accepted} className="rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50 disabled:bg-green-50">{activeAdvisory.accepted ? "Advisory accepted" : "Accept advisory"}</button></div>
          </>}
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"><div className="flex items-center gap-2 text-slate-800"><History size={20} /><h3 className="text-xl font-bold">Advisory history</h3></div>{advisories.length === 0 ? <p className="mt-4 text-sm text-slate-500">No saved advisories yet.</p> : <div className="mt-5 overflow-x-auto"><table className="w-full min-w-180 text-left text-sm"><thead className="border-b border-slate-200 text-slate-500"><tr><th className="py-3">Date</th><th>Stage</th><th>Moisture</th><th>Water</th><th>Status</th><th></th></tr></thead><tbody>{advisories.map((item) => <tr key={item._id} className="border-b border-slate-100"><td className="py-3">{new Date(item.createdAt).toLocaleString()}</td><td>{item.inputs.cropStage}</td><td>{item.inputs.soilMoisture}%</td><td>{item.recommendation.waterRequiredLitres.toLocaleString()} L</td><td>{item.accepted ? "Accepted" : "Pending"}</td><td><button type="button" onClick={() => setActiveAdvisory(item)} className="font-semibold text-green-700 hover:underline">View</button></td></tr>)}</tbody></table></div>}</div>
    </section>
  );
};

export default DashboardWorkspace;
