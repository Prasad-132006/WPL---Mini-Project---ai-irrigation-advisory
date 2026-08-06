import {
  ArrowRight,
  PlayCircle,
  CheckCircle2,
} from "lucide-react";

const CTA = () => {
  return (
    <section>

      {/* Background Blur */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}

          <div className="text-white">

            <span className="uppercase tracking-[3px] font-semibold text-green-100">
              Ready to Get Started?
            </span>

            <h2 className="text-5xl font-bold mt-5 leading-tight">
              Transform Your Farm with
              <br />
              AI-Powered Irrigation
            </h2>

            <p className="mt-6 text-lg text-green-50 leading-8 max-w-xl">
              Join thousands of farmers using Artificial Intelligence
              to optimize irrigation schedules, reduce water usage,
              and improve crop productivity.
            </p>

            {/* Features */}

            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-white" />
                <span>AI-based Irrigation Recommendations</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-white" />
                <span>Weather Forecast Integration</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-white" />
                <span>Real-time Soil Moisture Monitoring</span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-white" />
                <span>Smart Analytics Dashboard</span>
              </div>

            </div>

          </div>

          {/* Right Card */}

          <div className="bg-white rounded-3xl shadow-2xl p-10">

            <h3 className="text-3xl font-bold text-slate-900">
              Request a Demo
            </h3>

            <p className="text-slate-500 mt-3">
              Experience intelligent irrigation management
              in just a few clicks.
            </p>

            <div className="mt-8 space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="text"
                placeholder="Organization"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>

            <button className="w-full mt-8 bg-green-600 hover:bg-green-700 transition text-white rounded-xl py-4 font-semibold flex justify-center items-center gap-2">
              Schedule Demo
              <ArrowRight size={18} />
            </button>

            <button className="w-full mt-4 border border-slate-300 hover:bg-slate-100 transition rounded-xl py-4 flex justify-center items-center gap-2">
              <PlayCircle size={20} />
              Watch Product Tour
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CTA;