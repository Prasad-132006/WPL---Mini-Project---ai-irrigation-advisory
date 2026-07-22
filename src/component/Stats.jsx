import "../CSS/Stats.css";

function Stats() {
  const stats = [
    { title: "Farms", value: "25,000+" },
    { title: "Sensors", value: "150+" },
    { title: "Water Saved", value: "82%" },
    { title: "AI Accuracy", value: "98%" },
  ];

  return (
    <section className="stats">
      {stats.map((item) => (
        <div className="stat-card" key={item.title}>
          <h2>{item.value}</h2>
          <p>{item.title}</p>
        </div>
      ))}
    </section>
  );
}

export default Stats;