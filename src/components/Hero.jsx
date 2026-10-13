import {
  ArrowRight,
  CloudRain,
  Droplets,
  BrainCircuit,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";

const Hero = () => {
  const { user } = useAuth();
  const getStartedPath = user ? "/dashboard" : "/register";

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
      <div className="relative z-10 max-w-7xl mx-auto min-h-175 px-6 py-20 lg:py-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-12">
        {/* LEFT */}
        <div className="max-w-2xl text-center lg:text-left text-white">
          <span className="inline-flex items-center gap-1.5 bg-green-600/20 border border-green-400 text-green-300 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-5 sm:mb-6 whitespace-nowrap">
            🌱 Data-Guided Sugarcane Farming
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Smarter Irrigation
            <br />
            <span className="text-green-400">Better Harvests</span>
          </h1>

          <p className="mt-8 text-lg text-slate-200 leading-8 max-w-xl">
            Use historical sugarcane records and current field inputs to plan
            irrigation, reduce water wastage, and keep an advisory history.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to={getStartedPath}
              className="bg-[#00A859] hover:bg-green-700 transition px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg"
            >
              {user ? "Open Dashboard" : "Create Account"}
              <ArrowRight size={18} />
            </Link>

            {/* <button className="border border-white text-white hover:bg-white hover:text-black transition px-8 py-4 rounded-full flex items-center justify-center gap-2">
              <PlayCircle size={20} />
              Watch Demo
            </button> */}
          </div>

          {/* Stats */}

          <div className="flex flex-wrap gap-8 mt-14">
            <div>
              <h2 className="text-3xl font-bold">25K+</h2>
              <p className="text-slate-300">Farmers Supported</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">40%</h2>
              <p className="text-slate-300">Water Saved</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">3,000</h2>
              <p className="text-slate-300">Dataset Records</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:flex flex-col gap-4 w-full max-w-lg">
          {/* Main Dashboard Recommendation */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 text-slate-900 border border-slate-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-green-700 bg-green-50 px-2.5 py-1 rounded-full inline-block mb-1.5">
                  Irrigation Advisory
                </span>
                <p className="text-xs text-gray-500">Today's Recommendation</p>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">Irrigate Tomorrow</h3>
              </div>
              <div className="p-3 bg-green-50 rounded-2xl">
                <BrainCircuit className="text-green-600" size={30} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Soil Moisture</span>
                <span className="font-bold text-green-600">24% (Low)</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Rain Chance</span>
                <span className="font-bold text-blue-600">78%</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Pump Duration</span>
                <span className="font-bold text-gray-900">2 Hours</span>
              </div>

              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-3 gap-4">
            {/* Weather Card */}
            <div className="bg-white rounded-2xl shadow-xl p-4 text-slate-900 border border-slate-100 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <CloudRain className="text-blue-500" size={24} />
                <span className="text-[10px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Weather</span>
              </div>
              <div className="mt-3">
                <p className="text-xs text-gray-500">Rain Chance</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">78%</p>
              </div>
            </div>

            {/* Soil Card */}
            <div className="bg-white rounded-2xl shadow-xl p-4 text-slate-900 border border-slate-100 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <Droplets className="text-cyan-500" size={24} />
                <span className="text-[10px] font-medium text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-full">Soil</span>
              </div>
              <div className="mt-3">
                <p className="text-xs text-gray-500">Moisture</p>
                <p className="text-2xl font-bold text-cyan-600 mt-0.5">24%</p>
              </div>
            </div>

            {/* AI Card */}
            <div className="bg-green-600 text-white rounded-2xl shadow-xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <TrendingUp className="text-green-100" size={24} />
                <span className="text-[10px] font-medium text-green-800 bg-green-100 px-2 py-0.5 rounded-full">Method</span>
              </div>
              <div className="mt-3">
                <p className="text-xs text-green-100">Analysis</p>
                <p className="text-lg font-bold text-white mt-0.5">Rule-based</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
