import { useState } from "react";
import {
  CloudRain,
  Droplets,
  BrainCircuit,
  Timer,
  TrendingUp,
  Activity,
  X,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Zap,
} from "lucide-react";

const DashboardPreview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full overflow-hidden relative">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto px-4">
        <span className="text-green-600 font-semibold uppercase tracking-widest text-sm">
          Dashboard
        </span>

        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 sm:mt-4">
          Sugarcane Irrigation Dashboard
        </h2>

        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 leading-7 sm:leading-8">
          Review historical conditions, soil moisture, recommendations,
          and irrigation schedules from a single intelligent dashboard.
        </p>
        <p className="mt-3 text-sm font-medium text-amber-700">
          Illustrative interface preview — the values below are examples, not live farm, sensor, or weather data.
        </p>
      </div>

      {/* Dashboard Container */}
      <div className="mt-10 sm:mt-16 bg-slate-100 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8">

        {/* ================= TOP CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

          {/* Moisture */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex justify-between items-center">
              <Droplets className="text-cyan-500" size={24} />
              <span className="text-xs sm:text-sm text-green-600 font-semibold">
                MANUAL
              </span>
            </div>
            <h3 className="mt-4 sm:mt-5 text-sm sm:text-base text-slate-500">
              Soil Moisture
            </h3>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              24%
            </h2>
            <div className="mt-4 sm:mt-5 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-1/4 h-full bg-cyan-500 rounded-full"></div>
            </div>
          </div>

          {/* Weather */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
            <CloudRain className="text-blue-500" size={24} />
            <h3 className="mt-4 sm:mt-5 text-sm sm:text-base text-slate-500">
              Historical Rainfall
            </h3>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              CSV
            </h2>
            <p className="text-blue-600 text-sm sm:text-base mt-3 sm:mt-4">
              Reference field
            </p>
          </div>

          {/* Pump */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
            <Timer className="text-orange-500" size={24} />
            <h3 className="mt-4 sm:mt-5 text-sm sm:text-base text-slate-500">
              Pump Duration
            </h3>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              2 hrs
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-3 sm:mt-4">
              Recommended
            </p>
          </div>

          {/* AI */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
            <BrainCircuit className="text-green-600" size={24} />
            <h3 className="mt-4 sm:mt-5 text-sm sm:text-base text-slate-500">
              Dataset Rows
            </h3>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              3,000
            </h2>
            <p className="text-green-600 text-sm sm:text-base mt-3 sm:mt-4">
              Excellent
            </p>
          </div>

        </div>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8 mt-5 sm:mt-8">

          {/* Recommendation */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-8 shadow-sm">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Example Dataset Recommendation
              </h3>
              <BrainCircuit className="text-green-600 shrink-0" size={30} />
            </div>

            {/* Recommendation Data */}
            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
              <div className="flex justify-between items-center gap-4">
                <span className="text-sm sm:text-base text-slate-600">
                  Soil Moisture
                </span>
                <strong className="text-sm sm:text-base">24%</strong>
              </div>

              <div className="flex justify-between items-center gap-4">
                <span className="text-sm sm:text-base text-slate-600">
                  Historical rainfall
                </span>
                <strong className="text-sm sm:text-base">Matched CSV row</strong>
              </div>

              <div className="flex justify-between items-center gap-4">
                <span className="text-sm sm:text-base text-slate-600">
                  Crop Stage
                </span>
                <strong className="text-sm sm:text-base">Vegetative</strong>
              </div>

              <div className="flex justify-between items-center gap-4">
                <span className="text-sm sm:text-base text-slate-600">
                  Irrigation
                </span>
                <strong className="text-sm sm:text-base text-green-600 text-right">
                  Check field before watering
                </strong>
              </div>

              <div className="flex justify-between items-center gap-4">
                <span className="text-sm sm:text-base text-slate-600">
                  Water Required
                </span>
                <strong className="text-sm sm:text-base">4200 Litres</strong>
              </div>
            </div>

            {/* Button to Open Overlay */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 sm:mt-8 w-full sm:w-auto bg-green-600 hover:bg-green-700 transition text-white px-6 sm:px-8 py-3 rounded-full font-medium shadow-md cursor-pointer"
            >
              View Full Report
            </button>
          </div>

          {/* ================= ANALYTICS ================= */}
          <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-8">

            <div className="flex items-center gap-3">
              <TrendingUp className="text-green-600 shrink-0" size={24} />
              <h3 className="text-xl font-bold">Saved Data Overview</h3>
            </div>

            {/* Analytics */}
            <div className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">

              {/* Data source */}
              <div>
                <div className="flex justify-between mb-2 text-sm sm:text-base">
                  <span>Moisture Source</span>
                  <span>Manual</span>
                </div>
                <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div className="w-full h-full rounded-full bg-green-600"></div>
                </div>
              </div>

              {/* Storage */}
              <div>
                <div className="flex justify-between mb-2 text-sm sm:text-base">
                  <span>Advisory History</span>
                  <span>MongoDB</span>
                </div>
                <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div className="w-full h-full rounded-full bg-blue-500"></div>
                </div>
              </div>

              {/* AI Accuracy */}
              <div>
                <div className="flex justify-between mb-2 text-sm sm:text-base">
                  <span>Dataset Coverage</span>
                  <span>Sugarcane</span>
                </div>
                <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div className="w-full h-full rounded-full bg-purple-500"></div>
                </div>
              </div>

            </div>

            {/* Preview status */}
            <div className="mt-8 sm:mt-10 flex items-start gap-3 bg-green-50 rounded-xl p-4">
              <Activity className="text-green-600 shrink-0 mt-0.5" size={22} />
              <div>
                <h4 className="font-semibold">Preview Status</h4>
                <p className="text-sm text-slate-500 mt-1">
                  Example only. Open the dashboard to use your saved plot data.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ================= OVERLAY MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          {/* Modal Card */}
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
              aria-label="Close Modal"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 pr-8">
              <div className="p-2.5 bg-green-100 text-green-700 rounded-xl">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Comprehensive Irrigation Advisory Report
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Example report • Sugarcane North Plot
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="mt-6 space-y-6 text-slate-700 text-sm sm:text-base">
              
              {/* Key Summary */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
                  <Zap size={18} className="text-amber-500" />
                  Executive Summary
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  This example uses a manually entered 24% soil-moisture reading. The real dashboard compares farmer inputs with the matched historical sugarcane cohort and asks the farmer to verify current field and rainfall conditions before irrigating.
                </p>
              </div>

              {/* Example inputs and references */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">
                  Example Input and Reference Data
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-slate-500 block">Soil Moisture:</span>
                    <strong className="text-slate-900">24% (manually entered)</strong>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-slate-500 block">Crop Stage:</span>
                    <strong className="text-slate-900">Vegetative</strong>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-slate-500 block">Historical Context:</span>
                    <strong className="text-slate-900">Matched CSV cohort</strong>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <span className="text-slate-500 block">Pump Flow:</span>
                    <strong className="text-slate-900">Farmer-entered value</strong>
                  </div>
                </div>
              </div>

              {/* Recommendations Checklist */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">
                  Actionable Steps
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
                    <span>Confirm the current root-zone moisture before operating the pump.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
                    <span>Use the calculated volume and duration from the saved plot’s area and pump flow.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                    <span>Check a genuine local weather source; CSV rainfall values are historical, not a forecast.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="mt-8 border-t border-slate-100 pt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition cursor-pointer"
              >
                Close Report
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default DashboardPreview;
