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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-green-600 font-semibold uppercase tracking-widest">
            Dashboard
          </span>

          <h2 className="text-4xl font-bold text-slate-900 mt-4">
            AI Irrigation Dashboard
          </h2>

          <p className="mt-5 text-lg text-slate-600 leading-8">
            Monitor weather conditions, soil moisture, AI recommendations,
            and irrigation schedules from a single intelligent dashboard.
          </p>

        </div>

        {/* Dashboard */}

        <div className="mt-16 bg-slate-100 rounded-3xl shadow-xl p-8">

          {/* Top Cards */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Moisture */}

            <div className="bg-white rounded-2xl p-6 shadow">

              <div className="flex justify-between items-center">

                <Droplets className="text-cyan-500" />

                <span className="text-sm text-green-600 font-semibold">
                  LIVE
                </span>

              </div>

              <h3 className="mt-5 text-slate-500">
                Soil Moisture
              </h3>

              <h2 className="text-4xl font-bold mt-2">
                24%
              </h2>

              <div className="mt-5 h-2 bg-slate-200 rounded-full">

                <div className="w-1/4 h-full bg-cyan-500 rounded-full"></div>

              </div>

            </div>

            {/* Weather */}

            <div className="bg-white rounded-2xl p-6 shadow">

              <CloudRain className="text-blue-500" />

              <h3 className="mt-5 text-slate-500">
                Rain Probability
              </h3>

              <h2 className="text-4xl font-bold mt-2">
                78%
              </h2>

              <p className="text-blue-600 mt-4">
                Expected Tomorrow
              </p>

            </div>

            {/* Pump */}

            <div className="bg-white rounded-2xl p-6 shadow">

              <Timer className="text-orange-500" />

              <h3 className="mt-5 text-slate-500">
                Pump Duration
              </h3>

              <h2 className="text-4xl font-bold mt-2">
                2 hrs
              </h2>

              <p className="text-slate-500 mt-4">
                Recommended
              </p>

            </div>

            {/* AI */}

            <div className="bg-white rounded-2xl p-6 shadow">

              <BrainCircuit className="text-green-600" />

              <h3 className="mt-5 text-slate-500">
                AI Confidence
              </h3>

              <h2 className="text-4xl font-bold mt-2">
                96%
              </h2>

              <p className="text-green-600 mt-4">
                Excellent
              </p>

            </div>

          </div>

          {/* Bottom Section */}

          <div className="grid lg:grid-cols-3 gap-8 mt-8">

            {/* Recommendation */}

            <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow">

              <div className="flex justify-between">

                <h3 className="text-2xl font-bold">
                  Today's AI Recommendation
                </h3>

                <BrainCircuit
                  className="text-green-600"
                  size={34}
                />

              </div>

              <div className="mt-8 space-y-5">

                <div className="flex justify-between">

                  <span>Soil Moisture</span>

                  <strong>24%</strong>

                </div>

                <div className="flex justify-between">

                  <span>Rain Chance</span>

                  <strong>78%</strong>

                </div>

                <div className="flex justify-between">

                  <span>Crop Stage</span>

                  <strong>Vegetative</strong>

                </div>

                <div className="flex justify-between">

                  <span>Irrigation</span>

                  <strong className="text-green-600">
                    Tomorrow Morning
                  </strong>

                </div>

                <div className="flex justify-between">

                  <span>Water Required</span>

                  <strong>4200 Litres</strong>

                </div>

              </div>

              <button className="mt-8 bg-green-600 hover:bg-green-700 transition text-white px-8 py-3 rounded-full">
                View Full Report
              </button>

            </div>

            {/* Analytics */}

            <div className="bg-white rounded-2xl shadow p-8">

              <div className="flex items-center gap-3">

                <TrendingUp className="text-green-600" />

                <h3 className="text-xl font-bold">
                  Weekly Analytics
                </h3>

              </div>

              <div className="mt-8 space-y-6">

                <div>

                  <div className="flex justify-between mb-2">

                    <span>Water Saved</span>

                    <span>40%</span>

                  </div>

                  <div className="h-3 rounded-full bg-slate-200">

                    <div className="w-2/5 h-full rounded-full bg-green-600"></div>

                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-2">

                    <span>Crop Health</span>

                    <span>88%</span>

                  </div>

                  <div className="h-3 rounded-full bg-slate-200">

                    <div className="w-[88%] h-full rounded-full bg-blue-500"></div>

                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-2">

                    <span>AI Accuracy</span>

                    <span>96%</span>

                  </div>

                  <div className="h-3 rounded-full bg-slate-200">

                    <div className="w-[96%] h-full rounded-full bg-purple-500"></div>

                  </div>

                </div>

              </div>

              <div className="mt-10 flex items-center gap-3 bg-green-50 rounded-xl p-4">

                <Activity className="text-green-600" />

                <div>

                  <h4 className="font-semibold">
                    Farm Status
                  </h4>

                  <p className="text-sm text-slate-500">
                    All systems operating normally.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default DashboardPreview;