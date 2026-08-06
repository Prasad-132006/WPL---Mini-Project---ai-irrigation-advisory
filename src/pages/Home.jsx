import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import DashboardPreview from "../components/DashboardPreview";
import Recommendation from "../components/Recommendation";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";

const Home = () => {
  return (
    <div className="bg-slate-50 text-slate-900 overflow-x-hidden">

      {/* Announcement Bar */}
      <Announcement />

      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <main>

        <section id="hero">
          <Hero />
        </section>

        {/* Statistics */}
        <section
          id="stats"
          className="max-w-7xl mx-auto px-6 lg:px-8 py-20"
        >
          <Stats />
        </section>

        {/* AI Features */}
        <section
          id="features"
          className="bg-white py-24"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Features />
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="bg-slate-50 py-24"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <HowItWorks />
          </div>
        </section>

        {/* Dashboard Preview */}
        <section
          id="dashboard"
          className="bg-white py-24"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <DashboardPreview />
          </div>
        </section>

        {/* AI Recommendation */}
        {/* <section
          id="recommendation"
          className="py-24 bg-linear-to-r from-green-700 to-green-600"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Recommendation />
          </div>
        </section>

        {/* Testimonials */}
        {/* <section
          id="testimonials"
          className="bg-white py-24"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Testimonials />
          </div>
        </section>  */}

        {/* CTA */}
        <section
          id="cta"
          className="py-24 bg-linear-to-r from-emerald-600 to-cyan-500"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <CTA />
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Cookie Banner */}
      <CookieBanner />

    </div>
  );
};

export default Home;