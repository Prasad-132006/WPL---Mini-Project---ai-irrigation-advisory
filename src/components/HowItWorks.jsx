import {
  UserRound,
  CloudSunRain,
  BrainCircuit,
  Sprout,
  ArrowDown,
} from "lucide-react";

const steps = [
  {
    icon: UserRound,
    title: "Farmer Inputs",
    description:
      "Enter farm details, crop stage, soil type, or connect IoT sensors for automatic data collection.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: CloudSunRain,
    title: "Weather & Sensor Data",
    description:
      "The platform collects weather forecasts, rainfall predictions, and soil moisture readings.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis",
    description:
      "Machine learning analyzes historical irrigation data, weather conditions, and crop requirements.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Sprout,
    title: "Smart Recommendation",
    description:
      "Farmers receive personalized irrigation schedules, water requirements, and alerts.",
    color: "bg-emerald-100 text-emerald-600",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-green-600 uppercase tracking-widest font-semibold">
            Process
          </span>

          <h2 className="text-4xl font-bold text-slate-900 mt-4">
            How Our AI Works
          </h2>

          <p className="mt-5 text-lg text-slate-600 leading-8">
            From collecting field data to generating irrigation advice,
            our AI-powered workflow helps farmers make better decisions
            with confidence.
          </p>

        </div>

        {/* Timeline */}

        <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="relative bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-8 text-center group"
              >
                {/* Icon */}

                <div
                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${step.color}`}
                >
                  <Icon size={38} />
                </div>

                {/* Step Number */}

                <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                {/* Content */}

                <h3 className="text-xl font-bold mt-6">
                  {step.title}
                </h3>

                <p className="text-slate-600 mt-4 leading-7">
                  {step.description}
                </p>

                {/* Arrow */}

                {index !== steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-7 top-1/2 -translate-y-1/2 text-green-500">
                    <ArrowDown
                      size={28}
                      className="rotate-[-90deg]"
                    />
                  </div>
                )}
              </div>
            );
          })}

        </div>

        {/* Bottom Info */}

        <div className="mt-20 bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl text-white p-10 lg:flex items-center justify-between">

          <div>

            <h3 className="text-3xl font-bold">
              AI Makes Every Drop Count 💧
            </h3>

            <p className="mt-4 text-green-100 max-w-2xl leading-7">
              By combining weather intelligence, soil moisture data,
              and machine learning predictions, the platform helps
              farmers reduce water usage while improving crop health
              and productivity.
            </p>

          </div>

          <button className="mt-8 lg:mt-0 bg-white text-green-700 px-8 py-4 rounded-full font-semibold hover:scale-105 transition">
            Explore Dashboard
          </button>

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;