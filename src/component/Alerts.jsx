import "../CSS/Alerts.css"

function Alerts() {
  const alerts = [
    "⚠ Low Soil Moisture Detected",
    "🌧 Rain Expected Tomorrow",
    "🔧 Pump Maintenance Due",
  ];

  return (
    <section className="alerts">
      <h2>Recent Alerts</h2>

      {alerts.map((alert, index) => (
        <div className="alert-card" key={index}>
          {alert}
        </div>
      ))}
    </section>
  );
}

export default Alerts;