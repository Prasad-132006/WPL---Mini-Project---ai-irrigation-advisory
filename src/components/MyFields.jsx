import { ArrowRight, Droplets, Gauge, History, Leaf, MapPin, Pencil, Plus, Sprout, Zap } from "lucide-react";

const advisoryFieldId = (advisory) => String(typeof advisory.field === "object" ? advisory.field?._id : advisory.field);

const MyFields = ({ fields, advisories, selectedFieldId, onAdd, onOpen, onEdit, onAnalyze }) => {
  const selectedField = fields.find((field) => field._id === selectedFieldId);
  const selectedAdvisories = selectedField ? advisories.filter((advisory) => advisoryFieldId(advisory) === selectedField._id) : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm font-semibold uppercase tracking-widest text-green-600">Saved field management</p><h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">My Fields</h2><p className="mt-3 max-w-3xl text-slate-600">View and manage every sugarcane field saved to your farmer account.</p></div>
        <button type="button" onClick={onAdd} className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"><Plus size={18} /> Add new field</button>
      </div>

      {fields.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm"><Sprout className="mx-auto text-green-600" size={38} /><h3 className="mt-4 text-xl font-bold text-slate-900">No saved fields yet</h3><p className="mt-2 text-slate-500">Add your first sugarcane field to save its conditions and generate irrigation advice.</p><button type="button" onClick={onAdd} className="mt-6 rounded-lg bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700">Add first field</button></div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {fields.map((field) => {
            const historyCount = advisories.filter((advisory) => advisoryFieldId(advisory) === field._id).length;
            return (
              <article key={field._id} className={`rounded-2xl bg-white p-6 shadow-sm ring-1 transition hover:-translate-y-0.5 hover:shadow-md ${selectedFieldId === field._id ? "ring-2 ring-green-500" : "ring-slate-200"}`}>
                <div className="flex items-start justify-between gap-4"><div className="rounded-xl bg-green-100 p-3 text-green-700"><Leaf size={24} /></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Sugarcane</span></div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">{field.farmName}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500"><MapPin size={15} /> {field.area} acres · {field.soilType} soil</p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-slate-50 p-3"><span className="block text-xs text-slate-500">Crop stage</span><strong className="mt-1 block text-slate-800">{field.cropStage}</strong></div>
                  <div className="rounded-lg bg-slate-50 p-3"><span className="block text-xs text-slate-500">Soil moisture</span><strong className="mt-1 block text-slate-800">{field.soilMoisture}%</strong></div>
                  <div className="rounded-lg bg-slate-50 p-3"><span className="block text-xs text-slate-500">Pump flow</span><strong className="mt-1 block text-slate-800">{field.pumpFlowRateLph.toLocaleString()} L/h</strong></div>
                  <div className="rounded-lg bg-slate-50 p-3"><span className="block text-xs text-slate-500">Advisories</span><strong className="mt-1 block text-slate-800">{historyCount}</strong></div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                  <button type="button" onClick={() => onOpen(field._id)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">View details</button>
                  <button type="button" onClick={() => onEdit(field._id)} className="flex items-center gap-1.5 rounded-lg border border-green-600 px-3 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"><Pencil size={15} /> Edit</button>
                  <button type="button" onClick={() => onAnalyze(field._id)} className="flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700">Analyze <ArrowRight size={15} /></button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {selectedField && (
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-wider text-green-600">Complete field details</p><h3 className="mt-1 text-2xl font-bold text-slate-900">{selectedField.farmName}</h3></div><button type="button" onClick={() => onAnalyze(selectedField._id)} className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700"><Gauge size={17} /> Open irrigation analysis</button></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 p-4"><MapPin className="text-green-600" size={19} /><span className="mt-3 block text-xs text-slate-500">Area</span><strong>{selectedField.area} acres</strong></div>
            <div className="rounded-xl border border-slate-200 p-4"><Sprout className="text-green-600" size={19} /><span className="mt-3 block text-xs text-slate-500">Stage and soil</span><strong>{selectedField.cropStage} · {selectedField.soilType}</strong></div>
            <div className="rounded-xl border border-slate-200 p-4"><Droplets className="text-cyan-600" size={19} /><span className="mt-3 block text-xs text-slate-500">Current moisture</span><strong>{selectedField.soilMoisture}%</strong></div>
            <div className="rounded-xl border border-slate-200 p-4"><Zap className="text-amber-500" size={19} /><span className="mt-3 block text-xs text-slate-500">Electricity and pump</span><strong>{selectedField.electricity} · {selectedField.pumpFlowRateLph.toLocaleString()} L/h</strong></div>
          </div>
          <div className="mt-8"><div className="flex items-center gap-2 text-slate-800"><History size={19} /><h4 className="text-lg font-bold">Field advisory history</h4></div>
            {selectedAdvisories.length === 0 ? <p className="mt-3 text-sm text-slate-500">No advisories have been generated for this field.</p> : <div className="mt-4 overflow-x-auto"><table className="w-full min-w-160 text-left text-sm"><thead className="border-b border-slate-200 text-slate-500"><tr><th className="py-3">Date</th><th>Moisture</th><th>Water</th><th>Decision</th><th>Status</th></tr></thead><tbody>{selectedAdvisories.map((advisory) => <tr key={advisory._id} className="border-b border-slate-100"><td className="py-3">{new Date(advisory.createdAt).toLocaleString()}</td><td>{advisory.inputs.soilMoisture}%</td><td>{advisory.recommendation.waterRequiredLitres.toLocaleString()} L</td><td>{advisory.recommendation.irrigationRecommended ? "Irrigate" : "Wait and recheck"}</td><td>{advisory.accepted ? "Accepted" : "Pending"}</td></tr>)}</tbody></table></div>}
          </div>
        </section>
      )}
    </div>
  );
};

export default MyFields;
