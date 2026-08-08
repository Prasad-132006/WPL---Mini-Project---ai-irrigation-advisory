import {
  ArrowRight,
  PlayCircle,
  CheckCircle2,
} from "lucide-react";

const CTA = () => {
  return (
    <div className="relative w-full overflow-hidden">

      {/* Main Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">

          {/* ================= LEFT SIDE ================= */}

          <div className="text-white text-center lg:text-left min-w-0">

            {/* Small Heading */}
            <span className="inline-block uppercase tracking-[2px] sm:tracking-[3px] font-semibold text-green-100 text-xs sm:text-sm">
              Ready to Get Started?
            </span>

            {/* Main Heading */}
            <h2 className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight break-words">

              Transform Your Farm
              <br className="hidden sm:block" />

              <span className="sm:hidden"> </span>

              with AI-Powered Irrigation

            </h2>

            {/* Description */}
            <p className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-lg text-green-50 leading-7 sm:leading-8 max-w-xl mx-auto lg:mx-0">

              Join thousands of farmers using Artificial Intelligence
              to optimize irrigation schedules, reduce water usage,
              and improve crop productivity.

            </p>

            {/* Features */}
            <div className="mt-7 sm:mt-9 space-y-4 max-w-md mx-auto lg:mx-0 text-left">

              <div className="flex items-start gap-3">

                <CheckCircle2
                  size={20}
                  className="text-white shrink-0 mt-0.5"
                />

                <span className="text-sm sm:text-base">
                  AI-based Irrigation Recommendations
                </span>

              </div>

              <div className="flex items-start gap-3">

                <CheckCircle2
                  size={20}
                  className="text-white shrink-0 mt-0.5"
                />

                <span className="text-sm sm:text-base">
                  Weather Forecast Integration
                </span>

              </div>

              <div className="flex items-start gap-3">

                <CheckCircle2
                  size={20}
                  className="text-white shrink-0 mt-0.5"
                />

                <span className="text-sm sm:text-base">
                  Real-time Soil Moisture Monitoring
                </span>

              </div>

              <div className="flex items-start gap-3">

                <CheckCircle2
                  size={20}
                  className="text-white shrink-0 mt-0.5"
                />

                <span className="text-sm sm:text-base">
                  Smart Analytics Dashboard
                </span>

              </div>

            </div>

          </div>


          {/* ================= RIGHT SIDE ================= */}

          <div className="w-full min-w-0">

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-7 md:p-8 lg:p-10 w-full">

              {/* Card Heading */}
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Request a Demo
              </h3>

              {/* Card Description */}
              <p className="text-slate-500 mt-2 sm:mt-3 text-sm sm:text-base leading-6">

                Experience intelligent irrigation management
                in just a few clicks.

              </p>


              {/* Form */}
              <div className="mt-6 sm:mt-8 space-y-4">

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <input
                  type="text"
                  placeholder="Organization"
                  className="w-full min-w-0 rounded-xl border border-slate-300 px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>


              {/* Schedule Demo */}
              <button
                type="button"
                className="w-full mt-6 sm:mt-8 bg-green-600 hover:bg-green-700 transition text-white rounded-xl py-3.5 sm:py-4 font-semibold flex justify-center items-center gap-2 text-sm sm:text-base"
              >

                <span>Schedule Demo</span>

                <ArrowRight size={18} />

              </button>


              {/* Product Tour */}
              <button
                type="button"
                className="w-full mt-3 sm:mt-4 border border-slate-300 hover:bg-slate-100 transition text-slate-800 rounded-xl py-3.5 sm:py-4 flex justify-center items-center gap-2 text-sm sm:text-base"
              >

                <PlayCircle size={20} />

                <span>Watch Product Tour</span>

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CTA;