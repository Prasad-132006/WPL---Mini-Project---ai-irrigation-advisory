import {
  Droplets,
  CloudRain,
  Sprout,
  BrainCircuit,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Droplets,
    title: "Smart Irrigation",
    description:
      "AI predicts the optimal irrigation schedule based on soil moisture, crop stage, and weather conditions.",
    color: "text-cyan-600",
  },
  {
    icon: CloudRain,
    title: "Weather Intelligence",
    description:
      "Get rainfall forecasts and irrigation recommendations to avoid unnecessary watering.",
    color: "text-blue-600",
  },
  {
    icon: Sprout,
    title: "Crop Health Monitoring",
    description:
      "Monitor crop conditions and receive alerts about water stress and growth trends.",
    color: "text-green-600",
  },
  {
    icon: BrainCircuit,
    title: "AI Recommendations",
    description:
      "Receive personalized irrigation advice generated using machine learning and real-time farm data.",
    color: "text-purple-600",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track water usage, irrigation history, and farm performance with interactive charts.",
    color: "text-orange-500",
  },
  {
    icon: ShieldCheck,
    title: "Sustainable Farming",
    description:
      "Reduce water wastage, improve crop yield, and support environmentally friendly farming practices.",
    color: "text-emerald-600",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-green-600 font-semibold uppercase tracking-widest">
            Features
          </span>

          <h2 className="text-4xl font-bold mt-4 text-slate-900">
            Everything You Need for Smart Farming
          </h2>

          <p className="mt-5 text-lg text-slate-600 leading-8">
            Our AI-powered platform combines weather intelligence,
            predictive analytics, and real-time monitoring to help
            farmers make informed irrigation decisions.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="
                  group
                  bg-white
                  border
                  border-slate-200
                  rounded-3xl
                  p-8
                  shadow-sm
                  hover:shadow-2xl
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >
                <div
                  className={`
                    w-16
                    h-16
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    bg-slate-100
                    ${feature.color}
                  `}
                >
                  <Icon size={32} />
                </div>

                <h3 className="text-2xl font-semibold mt-6">
                  {feature.title}
                </h3>

                <p className="text-slate-600 mt-4 leading-7">
                  {feature.description}
                </p>

                <button
                  className="
                    mt-6
                    text-green-600
                    font-semibold
                    group-hover:translate-x-1
                    transition
                  "
                >
                  Learn More →
                </button>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default Features;