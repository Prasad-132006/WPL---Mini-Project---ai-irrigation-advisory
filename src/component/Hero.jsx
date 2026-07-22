import "../CSS/Hero.css"

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>AI-Powered Smart Irrigation Advisory</h1>

        <p>
          Monitor soil moisture, weather conditions, and receive
          intelligent irrigation recommendations for sugarcane farms.
        </p>

        <button>View Dashboard</button>
      </div>

      <div className="hero-image">
        🌾
      </div>
    </section>
  );
}

export default Hero;