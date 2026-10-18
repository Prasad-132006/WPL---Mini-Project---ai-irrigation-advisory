import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";

const Home = () => {
  return (
    <div className="bg-slate-50 text-slate-900 overflow-x-hidden">

      <Navbar />

      <main>

        <section id="hero">
          <Hero />
        </section>

        <section
          id="features"
          className="bg-white py-24"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Features />
          </div>
        </section>

        <section
          id="how-it-works"
          className="bg-slate-50 py-24"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <HowItWorks />
          </div>
        </section>

        <section
          id="testimonials"
          className="bg-white py-24"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Testimonials />
          </div>
        </section> 

      </main>

      <Footer />

      <CookieBanner />

    </div>
  );
};

export default Home;
