import {
  CloudRain,
  Droplets,
  BrainCircuit,
  Timer,
  TrendingUp,
  Activity,
} from "lucide-react";

const DashboardPreview = () => {
  return (
    <section className="w-full overflow-hidden">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto px-4">
        <span className="text-green-600 font-semibold uppercase tracking-widest text-sm">
          Dashboard
        </span>

        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 sm:mt-4">
          AI Irrigation Dashboard
        </h2>

        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 leading-7 sm:leading-8">
          Monitor weather conditions, soil moisture, AI recommendations,
          and irrigation schedules from a single intelligent dashboard.
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
                LIVE
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
              Rain Probability
            </h3>

            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              78%
            </h2>

            <p className="text-blue-600 text-sm sm:text-base mt-3 sm:mt-4">
              Expected Tomorrow
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
              AI Confidence
            </h3>

            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              96%
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
                Today's AI Recommendation
              </h3>

              <BrainCircuit
                className="text-green-600 shrink-0"
                size={30}
              />

            </div>

            {/* Recommendation Data */}
            <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">

              <div className="flex justify-between items-center gap-4">
                <span className="text-sm sm:text-base text-slate-600">
                  Soil Moisture
                </span>

                <strong className="text-sm sm:text-base">
                  24%
                </strong>
              </div>

              <div className="flex justify-between items-center gap-4">
                <span className="text-sm sm:text-base text-slate-600">
                  Rain Chance
                </span>

                <strong className="text-sm sm:text-base">
                  78%
                </strong>
              </div>

              <div className="flex justify-between items-center gap-4">
                <span className="text-sm sm:text-base text-slate-600">
                  Crop Stage
                </span>

                <strong className="text-sm sm:text-base">
                  Vegetative
                </strong>
              </div>

              <div className="flex justify-between items-center gap-4">
                <span className="text-sm sm:text-base text-slate-600">
                  Irrigation
                </span>

                <strong className="text-sm sm:text-base text-green-600 text-right">
                  Tomorrow Morning
                </strong>
              </div>

              <div className="flex justify-between items-center gap-4">
                <span className="text-sm sm:text-base text-slate-600">
                  Water Required
                </span>

                <strong className="text-sm sm:text-base">
                  4200 Litres
                </strong>
              </div>

            </div>

            {/* Button */}
            <button
              className="
                mt-6 sm:mt-8
                w-full sm:w-auto
                bg-green-600
                hover:bg-green-700
                transition
                text-white
                px-6 sm:px-8
                py-3
                rounded-full
                font-medium
              "
            >
              View Full Report
            </button>

          </div>

          {/* ================= ANALYTICS ================= */}

          <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-8">

            <div className="flex items-center gap-3">

              <TrendingUp
                className="text-green-600 shrink-0"
                size={24}
              />

              <h3 className="text-xl font-bold">
                Weekly Analytics
              </h3>

            </div>

            {/* Analytics */}
            <div className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">

              {/* Water Saved */}
              <div>

                <div className="flex justify-between mb-2 text-sm sm:text-base">
                  <span>Water Saved</span>
                  <span>40%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div className="w-2/5 h-full rounded-full bg-green-600"></div>
                </div>

              </div>

              {/* Crop Health */}
              <div>

                <div className="flex justify-between mb-2 text-sm sm:text-base">
                  <span>Crop Health</span>
                  <span>88%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div className="w-[88%] h-full rounded-full bg-blue-500"></div>
                </div>

              </div>

              {/* AI Accuracy */}
              <div>

                <div className="flex justify-between mb-2 text-sm sm:text-base">
                  <span>AI Accuracy</span>
                  <span>96%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
                  <div className="w-[96%] h-full rounded-full bg-purple-500"></div>
                </div>

              </div>

            </div>

            {/* Farm Status */}
            <div className="mt-8 sm:mt-10 flex items-start gap-3 bg-green-50 rounded-xl p-4">

              <Activity
                className="text-green-600 shrink-0 mt-0.5"
                size={22}
              />

              <div>

                <h4 className="font-semibold">
                  Farm Status
                </h4>

                <p className="text-sm text-slate-500 mt-1">
                  All systems operating normally.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default DashboardPreview;