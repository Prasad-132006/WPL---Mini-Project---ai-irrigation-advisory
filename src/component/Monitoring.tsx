import "../CSS/Monitoring.css";

function Monitoring() {
  const monitoringData = [
    {
      label: "Soil Moisture",
      value: "24%",
    },
    {
      label: "Temperature",
      value: "33°C",
    },
    {
      label: "Humidity",
      value: "70%",
    },
    {
      label: "Rain Chance",
      value: "65%",
    },
  ];

  return (
    <section className="monitoring">
      <h2>Live Monitoring</h2>

      <div className="monitor-grid">
        {monitoringData.map((item) => (
          <div className="monitor-card" key={item.label}>
            <h3>{item.value}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Monitoring;