import Navbar from "../component/Navbar";
import Hero from "../component/Hero";
import Stats from "../component/Stats";
import Monitoring from "../component/Monitoring";
import Features from "../component/Features";
import Alerts from "../component/Alerts";
import Footer from "../component/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Monitoring />
      <Features />
      <Alerts />
      <Footer />
    </>
  );
}

export default Home;