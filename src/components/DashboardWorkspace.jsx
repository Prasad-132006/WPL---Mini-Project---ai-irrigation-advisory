import { useEffect, useState } from "react";
import {
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  CloudRain,
  Droplets,
  Gauge,
  MapPin,
  Radio,
  Sprout,
  ThermometerSun,
  Wifi,
} from "lucide-react";
import { findClosestFarmRecord, loadSugarcaneDataset } from "../data/sugarcaneDataset";

const initialFarm = {
  farmName: "North Sugarcane Plot",
  area: "2.5",
  crop: "Sugarcane",
  cropStage: "Grand growth",
  soilType: "Loamy",
  electricity: "Available",
  soilMoisture: "24",
};

const DashboardWorkspace = () => {
  const [farm, setFarm] = useState(initialFarm);
  const [sensorConnected, setSensorConnected] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [advisoryAccepted, setAdvisoryAccepted] = useState(false);
  const [analysisRecord, setAnalysisRecord] = useState(null);
  const [sugarcaneDataset, setSugarcaneDataset] = useState([]);

  useEffect(() => {
    loadSugarcaneDataset().then(setSugarcaneDataset);
  }, []);

  const moisture = Number(farm.soilMoisture) || 0;
  const rainChance = analysisRecord
    ? Math.min(95, Math.round(Number(analysisRecord["Humidity_%"]) + Number(analysisRecord.Rainfall_Total_mm) / 20))
    : sensorConnected ? 78 : 64;
  const waterPerAcre = Number(analysisRecord?.Water_Quantity_liters_per_acre) || (moisture < 30 ? 1680 : 900);
  const waterRequired = Math.max(0, Math.round(Number(farm.area || 0) * waterPerAcre));
  const duration = Math.max(1, Math.round(waterRequired / 2100 * 10) / 10);
  const irrigationTime = rainChance >= 70 ? "Tomorrow morning" : "Tonight after 7:00 PM";

  const updateFarm = (event) => {
    setFarm({ ...farm, [event.target.name]: event.target.value });
    setAnalysisComplete(false);
    setAdvisoryAccepted(false);
    setAnalysisRecord(null);
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setAdvisoryAccepted(false);
    setAnalysisRecord(findClosestFarmRecord(sugarcaneDataset, farm.soilType, farm.cropStage));
    window.setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 700);
  };

  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-green-600">Farmer workspace</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Irrigation advisory centre</h2>
        <p className="mt-3 max-w-3xl text-slate-600">Bring field details, live conditions, and AI guidance together for a practical decision on every plot.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-green-700"><MapPin size={19} /><h3 className="text-xl font-bold">1. Farm inputs</h3></div>
              <p className="mt-2 text-sm text-slate-500">Tell us about the plot and crop being monitored.</p>
            </div>
            <Sprout className="text-green-600" size={28} />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">Plot name<input name="farmName" value={farm.farmName} onChange={updateFarm} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-green-600" /></label>
            <label className="text-sm font-medium text-slate-700">Crop<select name="crop" value={farm.crop} onChange={updateFarm} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-600"><option>Sugarcane</option><option>Wheat</option><option>Rice</option><option>Cotton</option></select></label>
            <label className="text-sm font-medium text-slate-700">Area (acres)<input name="area" type="number" min="0.1" step="0.1" value={farm.area} onChange={updateFarm} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-green-600" /></label>
            <label className="text-sm font-medium text-slate-700">Crop stage<select name="cropStage" value={farm.cropStage} onChange={updateFarm} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-600"><option>Germination</option><option>Vegetative</option><option>Grand growth</option><option>Maturity</option></select></label>
            <label className="text-sm font-medium text-slate-700">Soil type<select name="soilType" value={farm.soilType} onChange={updateFarm} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-green-600"><option>Loamy</option><option>Clay</option><option>Sandy</option><option>Black soil</option></select></label>
            <label className="text-sm font-medium text-slate-700">Current moisture (%)<input name="soilMoisture" type="number" min="0" max="100" value={farm.soilMoisture} onChange={updateFarm} className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-green-600" /></label>
          </div>
        </div>

        <div className="rounded-2xl bg-[#002B1D] p-6 text-white shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-emerald-300"><Radio size={19} /><h3 className="text-xl font-bold">2. Weather & sensors</h3></div><p className="mt-2 text-sm text-emerald-100">Use live field data or enter readings manually.</p></div><Wifi className={sensorConnected ? "text-emerald-300" : "text-slate-400"} size={26} /></div>
          <button type="button" onClick={() => setSensorConnected(!sensorConnected)} className="mt-6 flex w-full items-center justify-between rounded-xl border border-white/20 bg-white/10 p-4 text-left transition hover:bg-white/15"><span><strong className="block">IoT soil sensor</strong><span className="text-sm text-emerald-100">{sensorConnected ? "Connected · synced just now" : "Disconnected · manual mode"}</span></span><span className={`rounded-full px-3 py-1 text-xs font-semibold ${sensorConnected ? "bg-emerald-400 text-[#002B1D]" : "bg-slate-500 text-white"}`}>{sensorConnected ? "LIVE" : "OFF"}</span></button>
          <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl bg-white/10 p-4"><CloudRain className="text-sky-300" size={21} /><strong className="mt-3 block text-2xl">{rainChance}%</strong><span className="text-sm text-emerald-100">Rain chance</span></div><div className="rounded-xl bg-white/10 p-4"><ThermometerSun className="text-orange-300" size={21} /><strong className="mt-3 block text-2xl">31°C</strong><span className="text-sm text-emerald-100">Temperature</span></div></div>
          <p className="mt-5 flex items-center gap-2 text-sm text-emerald-100"><Droplets size={16} /> Forecast: {rainChance >= 70 ? "rainfall expected tomorrow" : "low rainfall expected"}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="flex items-center gap-2 text-purple-700"><BrainCircuit size={20} /><h3 className="text-xl font-bold">3. AI analysis</h3></div>
          <p className="mt-3 text-sm leading-6 text-slate-600">The model compares your field with {sugarcaneDataset.length.toLocaleString()} historical sugarcane records and weighs crop stage, soil type, moisture, rainfall, and water needs.</p>
          <div className="mt-6 space-y-3 text-sm text-slate-600"><div className="flex justify-between"><span>Field conditions</span><CheckCircle2 className="text-green-600" size={18} /></div><div className="flex justify-between"><span>Weather forecast</span><CheckCircle2 className="text-green-600" size={18} /></div><div className="flex justify-between"><span>Historical crop needs</span><CheckCircle2 className="text-green-600" size={18} /></div></div>
          <button type="button" onClick={runAnalysis} disabled={isAnalyzing} className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-wait disabled:opacity-70">{isAnalyzing ? "Analyzing field data..." : "Analyze field conditions"}<BrainCircuit size={18} /></button>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2 text-green-700"><Gauge size={20} /><h3 className="text-xl font-bold">4. Smart recommendation</h3></div><p className="mt-2 text-sm text-slate-500">{analysisComplete ? `Personalized advice for ${farm.farmName}.` : "Run AI analysis to generate plot-specific advice."}</p></div>{analysisComplete && <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">READY</span>}</div>
          {!analysisComplete ? <div className="mt-8 rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">Your irrigation schedule and water requirement will appear here after analysis.</div> : <><div className="mt-6 rounded-xl bg-green-50 p-5"><div className="flex gap-3"><Sprout className="mt-1 shrink-0 text-green-600" size={22} /><div><h4 className="font-bold text-green-900">Irrigate {irrigationTime.toLowerCase()} for {duration} hours</h4><p className="mt-2 text-sm leading-6 text-green-800">Apply approximately <strong>{waterRequired.toLocaleString()} litres</strong> to the {farm.area}-acre {farm.crop.toLowerCase()} plot using the dataset's {analysisRecord?.Irrigation_Method_Type?.toLowerCase() || "recommended"} method.</p></div></div></div><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><div className="min-w-0 rounded-lg border border-slate-200 p-3"><span className="text-xs text-slate-500">Moisture</span><strong className="mt-1 block">{moisture}%</strong></div><div className="min-w-0 rounded-lg border border-slate-200 p-3"><span className="text-xs text-slate-500">Water required</span><strong className="mt-1 block">{waterRequired.toLocaleString()} L</strong></div><div className="min-w-0 rounded-lg border border-slate-200 p-3"><span className="text-xs text-slate-500">Dataset yield</span><strong className="mt-1 block">{analysisRecord?.Yield_Quintal_per_Acre ? `${Number(analysisRecord.Yield_Quintal_per_Acre).toFixed(1)} q/ac` : "-"}</strong></div><div className="min-w-0 rounded-lg border border-slate-200 p-3"><span className="text-xs text-slate-500">Confidence</span><strong className="mt-1 block">96%</strong></div></div><div className="mt-5 flex flex-wrap items-center justify-between gap-3"><p className="flex items-center gap-2 text-sm text-amber-700"><AlertTriangle size={17} /> {analysisRecord?.Disease_Severity === "High" ? `High ${analysisRecord.Disease_Type.toLowerCase()} risk in the reference record.` : "Recheck sensor readings before starting the pump."}</p><button type="button" onClick={() => setAdvisoryAccepted(!advisoryAccepted)} className="rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50">{advisoryAccepted ? "Advisory accepted" : "Accept advisory"}</button></div></>}
        </div>
      </div>
    </section>
  );
};

export default DashboardWorkspace;