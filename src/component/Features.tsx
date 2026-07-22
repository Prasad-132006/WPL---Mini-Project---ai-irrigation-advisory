import "../CSS/Features.css";
import {
  FaCloudRain,
  FaRobot,
  FaChartLine,
} from "react-icons/fa";
import { GiPlantWatering } from "react-icons/gi";

function Features() {
  const features = [
    {
      icon: <FaRobot />,
      title: "AI Advisory",
      desc: "Get intelligent irrigation recommendations.",
    },
    {
      icon: <FaCloudRain />,
      title: "Weather Forecast",
      desc: "Rainfall and climate predictions.",
    },
    {
      icon: <GiPlantWatering />,
      title: "Smart Irrigation",
      desc: "Reduce water usage and optimize crop growth.",
    },
    {
      icon: <FaChartLine />,
      title: "Analytics",
      desc: "Visualize trends and farm performance.",
    },
  ];

  return (
    <section className="features">
      <h2>Key Features</h2>

      <div className="feature-grid">
        {features.map((feature) => (
          <div className="feature-card" key={feature.title}>
            <div className="icon">{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;