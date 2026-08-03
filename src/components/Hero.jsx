import {
  ArrowRight,
  PlayCircle,
  CloudRain,
  Droplets,
  BrainCircuit,
  TrendingUp,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-175 overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto min-h-175 px-6 flex flex-col lg:flex-row items-center justify-between">

        {/* LEFT */}
        <div className="max-w-2xl text-center lg:text-left text-white">

          <span className="inline-block bg-green-600/20 border border-green-400 text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🌱 AI Powered Smart Farming
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Smarter Irrigation
            <br />
            <span className="text-green-400">
              Better Harvests
            </span>
          </h1>

          <p className="mt-8 text-lg text-slate-200 leading-8 max-w-xl">
            Use Artificial Intelligence, weather forecasting,
            and soil moisture analytics to optimize irrigation,
            reduce water wastage, and maximize crop yield.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">

            <button className="bg-[#00A859] hover:bg-green-700 transition px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg">
              Get Started
              <ArrowRight size={18} />
            </button>

            <button className="border border-white text-white hover:bg-white hover:text-black transition px-8 py-4 rounded-full flex items-center justify-center gap-2">
              <PlayCircle size={20} />
              Watch Demo
            </button>

          </div>

          {/* Stats */}

          <div className="flex flex-wrap gap-8 mt-14">

            <div>
              <h2 className="text-3xl font-bold">25K+</h2>
              <p className="text-slate-300">
                Farmers Supported
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">40%</h2>
              <p className="text-slate-300">
                Water Saved
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">96%</h2>
              <p className="text-slate-300">
                Prediction Accuracy
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="hidden lg:flex relative w-130 h-130">

          {/* Main Dashboard */}

          <div className="absolute right-0 top-16 bg-white rounded-3xl shadow-2xl p-6 w-90">

            <div className="flex justify-between items-center mb-6">

              <div>

                <p className="text-sm text-gray-500">
                  Today's Recommendation
                </p>

                <h3 className="text-xl font-bold mt-1">
                  Irrigate Tomorrow
                </h3>

              </div>

              <BrainCircuit
                className="text-green-600"
                size={34}
              />

            </div>

            <div className="space-y-5">

              <div className="flex justify-between">

                <span>Soil Moisture</span>

                <span className="font-bold text-green-600">
                  24%
                </span>

              </div>

              <div className="flex justify-between">

                <span>Rain Chance</span>

                <span className="font-bold text-blue-600">
                  78%
                </span>

              </div>

              <div className="flex justify-between">

                <span>Pump Duration</span>

                <span className="font-bold">
                  2 Hours
                </span>

              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                <div className="w-3/4 h-full bg-green-500 rounded-full"></div>

              </div>

            </div>

          </div>

          {/* Weather Card */}

          <div className="absolute left-0 top-0 bg-white rounded-2xl shadow-xl p-5 w-52">

            <CloudRain
              className="text-blue-500 mb-3"
              size={34}
            />

            <h4 className="font-semibold">
              Weather Forecast
            </h4>

            <p className="text-gray-500 mt-2">
              Rain Tomorrow
            </p>

            <p className="text-4xl font-bold mt-3">
              78%
            </p>

          </div>

          {/* Soil Card */}

          <div className="absolute left-12 bottom-12 bg-white rounded-2xl shadow-xl p-5 w-56">

            <Droplets
              className="text-cyan-500 mb-3"
              size={34}
            />

            <h4 className="font-semibold">
              Soil Moisture
            </h4>

            <p className="text-4xl font-bold mt-3">
              24%
            </p>

            <div className="mt-4 h-2 bg-gray-200 rounded-full">

              <div className="w-1/4 h-full bg-cyan-500 rounded-full"></div>

            </div>

          </div>

          {/* Floating AI Card */}

          <div className="absolute right-10 bottom-0 bg-green-600 text-white rounded-2xl shadow-xl px-6 py-5">

            <TrendingUp
              className="mb-2"
              size={28}
            />

            <h4 className="font-semibold">
              AI Confidence
            </h4>

            <p className="text-3xl font-bold">
              96%
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;