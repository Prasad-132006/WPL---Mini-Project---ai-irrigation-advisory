import React from 'react';
import { CloudRain, Droplets, Clock, Cpu, ArrowRight } from 'lucide-react';

const Recommendation = () => {
  const recommendationData = {
    action: "Irrigate Tomorrow Morning",
    soilMoisture: "24%",
    rainChance: "78%",
    cropStage: "Vegetative",
    waterRequired: "4,200 Litres",
    pumpDuration: "2 Hours",
    aiConfidence: "96%",
  };

  return (
    <div className="text-white">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium mb-4">
          <Cpu className="w-4 h-4 text-emerald-200" /> Real-Time Decision Support
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Today's AI Recommendation
        </h2>
        <p className="text-emerald-100 text-lg">
          Personalized advice based on your current field moisture levels, live weather forecasting, and crop stage requirements.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-emerald-200 text-sm uppercase tracking-wider font-semibold">Suggested Action</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {recommendationData.action}
            </h3>
          </div>
          <button className="inline-flex items-center gap-2 bg-white text-green-800 hover:bg-emerald-50 px-5 py-3 rounded-xl font-semibold transition-colors duration-200 shadow-md">
            View Full Report <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 text-emerald-200 text-sm mb-1">
              <Droplets className="w-4 h-4" /> Soil Moisture
            </div>
            <p className="text-2xl font-bold">{recommendationData.soilMoisture}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 text-emerald-200 text-sm mb-1">
              <CloudRain className="w-4 h-4" /> Rain Chance
            </div>
            <p className="text-2xl font-bold">{recommendationData.rainChance}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 text-emerald-200 text-sm mb-1">
              <Clock className="w-4 h-4" /> Pump Duration
            </div>
            <p className="text-2xl font-bold">{recommendationData.pumpDuration}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 text-emerald-200 text-sm mb-1">
              <Cpu className="w-4 h-4" /> AI Confidence
            </div>
            <p className="text-2xl font-bold text-emerald-300">{recommendationData.aiConfidence}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;