import { useEffect, useState } from "react";
import { AlertTriangle, BrainCircuit, CheckCircle2, CloudRain, Droplets, Gauge, History, LayoutGrid, MapPin, Plus, Save, Sprout, ThermometerSun } from "lucide-react";
import { api } from "../api";
import MyFields from "./MyFields";

const initialField = { farmName: "", area: "", crop: "Sugarcane", cropStage: "Grand growth", soilType: "Loamy", electricity: "Available", soilMoisture: "", pumpFlowRateLph: "" };
const toFieldForm = (field) => ({ ...field, area: String(field.area), crop: "Sugarcane", soilMoisture: String(field.soilMoisture), pumpFlowRateLph: field.pumpFlowRateLph ? String(field.pumpFlowRateLph) : "" });
const advisoryFieldId = (advisory) => String(typeof advisory.field === "object" ? advisory.field?._id : advisory.field);

const DashboardWorkspace = () => {
  const [view, setView] = useState("fields");
  const [field, setField] = useState(initialField);
  const [fieldId, setFieldId] = useState(null);
  const [detailFieldId, setDetailFieldId] = useState(null);
  const [fields, setFields] = useState([]);
  const [advisories, setAdvisories] = useState([]);
  const [activeAdvisory, setActiveAdvisory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api("/fields"), api("/advisories")])
      .then(([fieldResponse, advisoryResponse]) => {
        setFields(fieldResponse.fields);
        setAdvisories(advisoryResponse.advisories);
        const firstField = fieldResponse.fields[0];
        if (firstField) {
          setFieldId(firstField._id);
          setDetailFieldId(firstField._id);
          setField(toFieldForm(firstField));
          setActiveAdvisory(advisoryResponse.advisories.find((item) => advisoryFieldId(item) === firstField._id) || null);
        }
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  const updateField = ({ target }) => {
    let value = target.value;
    if (target.name === "soilMoisture" && value !== "") value = String(Math.max(0, Math.min(100, Number(value))));
    setField((current) => ({ ...current, [target.name]: value }));
    setMessage("");
  };

  const chooseField = (id) => {
    const selected = fields.find((item) => item._id === id);
    if (!selected) return;
    setFieldId(id);
    setDetailFieldId(id);
    setField(toFieldForm(selected));
    setActiveAdvisory(advisories.find((item) => advisoryFieldId(item) === id) || null);
    setError("");
  };

  const startNewField = () => {
    setFieldId(null);
    setDetailFieldId(null);
    setField(initialField);
    setActiveAdvisory(null);
    setView("analysis");
    setMessage("Enter the new field details, then save or generate a recommendation.");
    setError("");
  };

  const openField = (id) => { chooseField(id); setDetailFieldId(id); setView("fields"); };
  const editField = (id) => { chooseField(id); setView("analysis"); setMessage("Update the field details and select Save field details."); };
  const analyzeField = (id) => { chooseField(id); setView("analysis"); setMessage("Field selected. Review its current conditions before generating a recommendation."); };

  const selectAdvisory = (advisory) => {
    const associatedFieldId = advisoryFieldId(advisory);
    const associatedField = fields.find((item) => item._id === associatedFieldId);
    if (associatedField) {
      setFieldId(associatedField._id);
      setDetailFieldId(associatedField._id);
      setField(toFieldForm(associatedField));
    }
    setActiveAdvisory(advisory);
    setMessage(associatedField ? `Showing this advisory with its field, ${associatedField.farmName}.` : "Showing saved advisory.");
    setError("");
  };

  const validateField = () => {
    if (field.farmName.trim().length < 2) return "Enter a field name with at least 2 characters.";
    if (!field.area || Number(field.area) < 0.1) return "Area must be at least 0.1 acre.";
    if (field.soilMoisture === "" || Number(field.soilMoisture) < 0 || Number(field.soilMoisture) > 100) return "Soil moisture must be between 0 and 100%.";
    if (!field.pumpFlowRateLph || Number(field.pumpFlowRateLph) < 100) return "Enter a measured pump flow rate of at least 100 litres per hour.";
    return "";
  };

  const saveField = async ({ quiet = false } = {}) => {
    const validationError = validateField();
    if (validationError) throw new Error(validationError);
    setSaving(true);
    try {
      const response = await api(fieldId ? `/fields/${fieldId}` : "/fields", { method: fieldId ? "PUT" : "POST", body: JSON.stringify(field) });
      setFieldId(response.field._id);
      setDetailFieldId(response.field._id);
      setField(toFieldForm(response.field));
      setFields((current) => [response.field, ...current.filter((item) => item._id !== response.field._id)]);
      if (!quiet) setMessage("Field details saved to the MongoDB fields collection.");
      return response.field;
    } finally { setSaving(false); }
  };

  const handleSave = async () => { setError(""); try { await saveField(); } catch (requestError) { setError(requestError.message); } };

  const runAnalysis = async () => {
    setError(""); setMessage(""); setIsAnalyzing(true);
    try {
      const savedField = await saveField({ quiet: true });
      const response = await api("/advisories", { method: "POST", body: JSON.stringify({ fieldId: savedField._id }) });
      setActiveAdvisory(response.advisory);
      setAdvisories((current) => [response.advisory, ...current]);
      setMessage("Recommendation generated and saved to this field’s advisory history.");
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

  if (loading) return <div className="rounded-2xl bg-white p-8 text-center text-slate-600 shadow-sm">Loading your saved fields...</div>;
  const recommendation = activeAdvisory?.recommendation;
  const fieldHistory = advisories.filter((item) => advisoryFieldId(item) === fieldId);

  return (
    <section className="space-y-8">
      <nav aria-label="Dashboard sections" className="inline-flex rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-slate-200">
        <button type="button" onClick={() => setView("fields")} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${view === "fields" ? "bg-green-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}><LayoutGrid size={17} /> My Fields <span className={`rounded-full px-2 py-0.5 text-xs ${view === "fields" ? "bg-white/20" : "bg-slate-100"}`}>{fields.length}</span></button>
        <button type="button" onClick={() => setView("analysis")} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${view === "analysis" ? "bg-green-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}><Gauge size={17} /> Irrigation analysis</button>
      </nav>

      {(message || error) && <p className={`rounded-lg px-4 py-3 text-sm ${error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>{error || message}</p>}

      {view === "fields" ? (
        <MyFields fields={fields} advisories={advisories} selectedFieldId={detailFieldId} onAdd={startNewField} onOpen={openField} onEdit={editField} onAnalyze={analyzeField} />
      ) : (
        <div className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-sm font-semibold uppercase tracking-widest text-green-600">Farmer workspace</p><h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Sugarcane irrigation analysis</h2><p className="mt-3 max-w-3xl text-slate-600">Save field conditions and generate a rule-based recommendation from the historical sugarcane dataset.</p></div>
            <div className="flex items-center gap-3"><label className="text-sm font-medium text-slate-700">Saved field<select value={fieldId || ""} onChange={(event) => event.target.value ? chooseField(event.target.value) : startNewField()} className="ml-3 rounded-lg border border-slate-300 bg-white px-3 py-2"><option value="">New field</option>{fields.map((item) => <option key={item._id} value={item._id}>{item.farmName}</option>)}</select></label><button type="button" onClick={startNewField} aria-label="Add new field" className="rounded-lg border border-green-600 p-2.5 text-green-700 hover:bg-green-50"><Plus size={18} /></button></div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
              <div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-green-700"><MapPin size={19} /><h3 className="text-xl font-bold">1. Field inputs</h3></div><p className="mt-2 text-sm text-slate-500">Each field is stored as its own document in MongoDB.</p></div><Sprout className="text-green-600" size={28} /></div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-slate-700">Field name<input name="farmName" value={field.farmName} placeholder="e.g. North Field" onChange={updateField} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-green-600" /></label>
                <label className="text-sm font-medium text-slate-700">Crop<input value="Sugarcane" readOnly className="mt-2 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-700" /></label>
                <label className="text-sm font-medium text-slate-700">Area (acres)<input name="area" type="number" min="0.1" step="0.1" value={field.area} placeholder="e.g. 2.5" onChange={updateField} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-green-600" /></label>
                <label className="text-sm font-medium text-slate-700">Crop stage<select name="cropStage" value={field.cropStage} onChange={updateField} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-600"><option>Germination</option><option>Vegetative</option><option>Grand growth</option><option>Maturity</option></select></label>
                <label className="text-sm font-medium text-slate-700">Soil type<select name="soilType" value={field.soilType} onChange={updateField} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-600"><option>Alluvial</option><option>Clay</option><option>Loamy</option><option>Sandy</option></select></label>
                <label className="text-sm font-medium text-slate-700">Current moisture (%)<input name="soilMoisture" type="number" min="0" max="100" value={field.soilMoisture} placeholder="e.g. 24" onChange={updateField} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-green-600" /></label>
                <label className="text-sm font-medium text-slate-700">Electricity<select name="electricity" value={field.electricity} onChange={updateField} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-600"><option>Available</option><option>Unavailable</option></select></label>
                <label className="text-sm font-medium text-slate-700">Measured pump flow (L/hour)<input name="pumpFlowRateLph" type="number" min="100" max="1000000" step="100" value={field.pumpFlowRateLph} placeholder="e.g. 20000" onChange={updateField} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-green-600" /><span className="mt-1 block text-xs font-normal text-slate-500">Use the pump’s measured or rated output; this determines duration.</span></label>
              </div>
              <button type="button" onClick={handleSave} disabled={saving} className="mt-6 flex items-center gap-2 rounded-lg border border-green-600 px-4 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-50 disabled:opacity-60"><Save size={17} />{saving ? "Saving..." : "Save field details"}</button>
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
              <div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-green-700"><Gauge size={20} /><h3 className="text-xl font-bold">4. Smart recommendation</h3></div><p className="mt-2 text-sm text-slate-500">{recommendation ? `Saved advice for ${field.farmName || "this field"}.` : "Generate a field-specific recommendation."}</p></div>{recommendation && <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">SAVED</span>}</div>
              {!recommendation ? <div className="mt-8 rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">Your irrigation decision, planning volume, and historical comparison will appear here after analysis.</div> : <>
                <div className={`mt-6 rounded-xl p-5 ${recommendation.irrigationRecommended ? "bg-green-50" : "bg-amber-50"}`}><div className="flex gap-3"><Sprout className={`mt-1 shrink-0 ${recommendation.irrigationRecommended ? "text-green-600" : "text-amber-600"}`} size={22} /><div><h4 className="font-bold text-slate-900">{recommendation.action}</h4>{recommendation.irrigationRecommended ? <p className="mt-2 text-sm leading-6 text-green-800">Planning application: <strong>{recommendation.applicationDepthMm} mm</strong>, approximately <strong>{recommendation.waterRequiredLitres.toLocaleString()} litres</strong>. At {activeAdvisory.inputs.pumpFlowRateLph.toLocaleString()} L/hour, estimated pump time is <strong>{recommendation.pumpDurationHours} hours</strong>.</p> : <p className="mt-2 text-sm leading-6 text-amber-800">Current moisture is not low relative to the matched historical cohort, so AgroAI does not prescribe a water volume or pump runtime.</p>}</div></div></div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><div className="rounded-lg border border-slate-200 p-3"><span className="text-xs text-slate-500">Moisture band</span><strong className="mt-1 block">{recommendation.moistureBand} · {activeAdvisory.inputs.soilMoisture}%</strong></div><div className="rounded-lg border border-slate-200 p-3"><span className="text-xs text-slate-500">Typical interval</span><strong className="mt-1 block">{recommendation.recommendedIntervalDays} days</strong></div><div className="rounded-lg border border-slate-200 p-3"><span className="text-xs text-slate-500">Historical method</span><strong className="mt-1 block">{recommendation.historicalMostCommonMethod}</strong></div><div className="rounded-lg border border-slate-200 p-3"><span className="text-xs text-slate-500">Matched rows</span><strong className="mt-1 block">{recommendation.matchedRecordCount}</strong></div></div>
                <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700"><p><strong>Nearest raw CSV row #{recommendation.referenceRecordIndex}:</strong> moisture {recommendation.referenceMoisturePercent?.toFixed(1)}%, water field {recommendation.datasetWaterLitresPerAcre?.toFixed(0) || "—"} L/acre, yield {recommendation.referenceYieldQuintalPerAcre?.toFixed(1) || "—"} q/acre.</p><p className="mt-2 text-xs text-slate-500">The raw CSV water field is shown for traceability but is not used as an operational dose because its scale is inconsistent with published sugarcane irrigation depths.</p></div>
                <p className="mt-4 text-xs leading-5 text-slate-500">{recommendation.datasetBasis}</p><p className="mt-3 rounded-lg bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-800">{recommendation.safetyNote}</p><p className="mt-3 rounded-lg bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800"><strong>Operation note:</strong> {recommendation.operationNote}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="flex items-center gap-2 text-sm text-amber-700"><AlertTriangle size={17} />{recommendation.historicalDiseaseNote}</p><button type="button" onClick={acceptAdvisory} disabled={activeAdvisory.accepted} className="rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50 disabled:bg-green-50">{activeAdvisory.accepted ? "Advisory accepted" : "Accept advisory"}</button></div>
              </>}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"><div className="flex items-center gap-2 text-slate-800"><History size={20} /><h3 className="text-xl font-bold">Selected field advisory history</h3></div>{fieldHistory.length === 0 ? <p className="mt-4 text-sm text-slate-500">No saved advisories for this field yet.</p> : <div className="mt-5 overflow-x-auto"><table className="w-full min-w-180 text-left text-sm"><thead className="border-b border-slate-200 text-slate-500"><tr><th className="py-3">Date</th><th>Stage</th><th>Moisture</th><th>Water</th><th>Status</th><th></th></tr></thead><tbody>{fieldHistory.map((item) => <tr key={item._id} className="border-b border-slate-100"><td className="py-3">{new Date(item.createdAt).toLocaleString()}</td><td>{item.inputs.cropStage}</td><td>{item.inputs.soilMoisture}%</td><td>{item.recommendation.waterRequiredLitres.toLocaleString()} L</td><td>{item.accepted ? "Accepted" : "Pending"}</td><td><button type="button" onClick={() => selectAdvisory(item)} className="font-semibold text-green-700 hover:underline">View</button></td></tr>)}</tbody></table></div>}</div>
        </div>
      )}
    </section>
  );
};

export default DashboardWorkspace;
