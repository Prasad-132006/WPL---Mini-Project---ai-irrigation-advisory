import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Droplets,
  CloudRain,
  Sprout,
  BrainCircuit,
  BarChart3,
  ShieldCheck,
  X,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../auth";

const features = [
  {
    id: "smart-irrigation",
    icon: Droplets,
    title: "Smart Irrigation",
    tagline: "Precision Water Control",
    description:
      "Rule-based analysis estimates a sugarcane irrigation schedule from field inputs and historical records.",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    badgeColor: "bg-cyan-100 text-cyan-800",
    accentColor: "border-cyan-500",
    overview:
      "Smart Irrigation uses manually entered moisture and sugarcane growth stages to estimate water needs from comparable historical records.",
    highlights: [
      "Dynamic pump run-time calculations down to the minute",
      "Adapts automatically to soil types (sandy, loamy, clay)",
      "Multiple saved sugarcane plots per farmer",
      "Persisted recommendations and acceptance history",
    ],
    metric: "Pump duration calculated from measured flow rate",
  },
  {
    id: "weather-intelligence",
    icon: CloudRain,
    title: "Weather Intelligence",
    tagline: "Historical Weather Context",
    description:
      "Review historical rainfall indicators alongside irrigation recommendations.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    badgeColor: "bg-blue-100 text-blue-800",
    accentColor: "border-blue-500",
    overview:
      "Historical context exposes rainfall, humidity, evapotranspiration, and temperature values from the matched sugarcane dataset row.",
    highlights: [
      "Matched historical precipitation and temperature indicators",
      "Clear distinction from a live weather forecast",
      "Historical rainfall indicator included with each advisory",
      "Dataset humidity and rainfall used transparently",
    ],
    metric: "Historical context is clearly labeled—not a forecast",
  },
  {
    id: "crop-health",
    icon: Sprout,
    title: "Crop Health Monitoring",
    tagline: "Agronomic Vitality",
    description:
      "Review manually entered moisture against stage-specific sugarcane thresholds.",
    color: "text-green-600",
    bgColor: "bg-green-50",
    badgeColor: "bg-green-100 text-green-800",
    accentColor: "border-green-500",
    overview:
      "The advisory compares a farmer-entered moisture reading with historical records for the selected sugarcane stage and soil type.",
    highlights: [
      "Sugarcane stage-specific planning depths and intervals",
      "Manually entered moisture is preserved with each advisory",
      "Wet-field results prescribe no additional irrigation volume",
      "Historical disease notes remain clearly identified as references",
    ],
    metric: "Four supported sugarcane growth stages",
  },
  {
    id: "ai-recommendations",
    icon: BrainCircuit,
    title: "Dataset Recommendations",
    tagline: "Historical Matching Engine",
    description:
      "Receive irrigation advice generated from your inputs and historical sugarcane data.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    badgeColor: "bg-purple-100 text-purple-800",
    accentColor: "border-purple-500",
    overview:
      "The backend matches historical agronomic data by soil, sugarcane growth stage, and nearest soil-moisture value to produce an explainable result.",
    highlights: [
      "Plain-language advisory: exact time, duration, and pump settings",
      "Transparent reference row and explanatory factors",
      "No unsupported trained-model or sensor claims",
      "One-click generation and persisted acceptance",
    ],
    metric: "3,000 historical sugarcane records",
  },
  {
    id: "analytics-dashboard",
    icon: BarChart3,
    title: "Analytics Dashboard",
    tagline: "Saved Farm Insights",
    description:
      "Review saved plots, recommendation history, and acceptance status by farmer account.",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    badgeColor: "bg-orange-100 text-orange-800",
    accentColor: "border-orange-500",
    overview:
      "The dashboard retrieves each farmer’s saved plots and advisory history from MongoDB and keeps records isolated by account.",
    highlights: [
      "Saved plot details remain available after signing in again",
      "Recommendation inputs and calculated outputs are stored together",
      "Acceptance status and time are persisted",
      "Selecting history also selects its associated plot",
    ],
    metric: "Persistent per-farmer advisory history",
  },
  {
    id: "sustainable-farming",
    icon: ShieldCheck,
    title: "Sustainable Farming",
    tagline: "Eco-Resource Conservation",
    description:
      "Reduce water wastage, improve crop yield, and support environmentally friendly farming practices.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    badgeColor: "bg-emerald-100 text-emerald-800",
    accentColor: "border-emerald-500",
    overview:
      "Sustainable farming practices protect local water tables, minimize runoff pollution, and prevent nutrient leaching, ensuring long-term soil fertility and environmental resilience.",
    highlights: [
      "Guards ground water reserves from over-extraction",
      "Prevents soil nutrient leaching from excessive watering",
      "Reduces electrical power consumption for irrigation pumps",
      "Aligns with sustainable and organic agriculture best practices",
    ],
    metric: "Zero unsupported impact claims",
  },
];

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const { user } = useAuth();
  const ctaPath = user ? "/dashboard" : "/register";
  const ctaText = user ? "Open in Dashboard" : "Get Started Free";

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedFeature(null);
      }
    };

    if (selectedFeature) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedFeature]);

  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-green-600 font-semibold uppercase tracking-widest text-sm">
            Features
          </span>

          <h2 className="text-4xl font-bold mt-4 text-slate-900">
            Everything You Need for Smart Farming
          </h2>

          <p className="mt-5 text-lg text-slate-600 leading-8">
            Our platform combines historical sugarcane data,
            rule-based analysis, and persistent farm records to help
            farmers make informed irrigation decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.bgColor} ${feature.color}`}
                  >
                    <Icon size={32} />
                  </div>

                  <span className={`inline-block mt-5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${feature.badgeColor}`}>
                    {feature.tagline}
                  </span>

                  <h3 className="text-2xl font-semibold mt-2 text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 mt-4 leading-7">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedFeature(feature)}
                    className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 group-hover:translate-x-1 transition duration-200 cursor-pointer"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={16} />
                  </button>
                  <span className="text-xs font-medium text-slate-400">
                    Details & Impact
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedFeature(null)}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="feature-modal-title"
            className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 z-10 my-8 overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200"
          >
            <button
              type="button"
              onClick={() => setSelectedFeature(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Close feature details"
            >
              <X size={22} />
            </button>

            <div className="flex items-start gap-4 pr-10">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${selectedFeature.bgColor} ${selectedFeature.color}`}
              >
                <selectedFeature.icon size={30} />
              </div>
              <div>
                <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${selectedFeature.badgeColor}`}>
                  {selectedFeature.tagline}
                </span>
                <h3
                  id="feature-modal-title"
                  className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1.5"
                >
                  {selectedFeature.title}
                </h3>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Overview & Methodology
              </h4>
              <p className="text-slate-700 mt-2 leading-relaxed text-base">
                {selectedFeature.overview}
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Key Capabilities & Features
              </h4>
              <div className="space-y-2.5">
                {selectedFeature.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-green-600 shrink-0 mt-0.5"
                      size={18}
                    />
                    <span className="text-sm text-slate-700 leading-snug">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 flex items-center gap-3">
              <div className="p-2 bg-green-600 text-white rounded-xl">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                  Verified Capability
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {selectedFeature.metric}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedFeature(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition text-sm cursor-pointer text-center"
              >
                Close
              </button>

              <Link
                to={ctaPath}
                onClick={() => setSelectedFeature(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center gap-2 shadow-md transition text-sm cursor-pointer"
              >
                <span>{ctaText}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Features;
