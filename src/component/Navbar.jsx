import "../CSS/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>🌱 Smart Irrigation AI</h2>

      <ul>
        <li>Home</li>
        <li>Dashboard</li>
        <li>Sensors</li>
        <li>Weather</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;