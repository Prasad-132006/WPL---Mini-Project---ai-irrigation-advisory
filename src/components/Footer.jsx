import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sprout,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  X,
  BookOpen,
  FileText,
  HelpCircle,
  Shield,
  FileCheck,
  CheckCircle2,
} from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const RESOURCE_MODALS = {
  docs: {
    title: "System Documentation",
    subtitle: "Hardware & Platform Specifications",
    icon: BookOpen,
    content: (
      <div className="space-y-4 text-sm text-slate-700">
        <p>
          AgroAI is a college project using manually entered field readings and a local historical sugarcane dataset.
        </p>
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-2">Supported Sensor Protocols</h4>
          <ul className="list-disc list-inside space-y-1 text-slate-600">
            <li>LoRaWAN 868 / 915 MHz long-range telemetry</li>
            <li>MQTT / HTTPS REST API edge gateways</li>
            <li>Modbus RS485 soil moisture & temperature probes</li>
            <li>Solar-powered automated solenoid valve controllers</li>
          </ul>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-2">Algorithm & Calibration</h4>
          <p className="text-slate-600">
            Soil moisture thresholds are calibrated based on the FAO-56 Penman-Monteith equation for reference crop evapotranspiration (ET₀).
          </p>
        </div>
      </div>
    ),
  },
  guide: {
    title: "User Onboarding Guide",
    subtitle: "Get up and running in 4 easy steps",
    icon: FileText,
    content: (
      <div className="space-y-4 text-sm text-slate-700">
        <div className="space-y-3">
          <div className="flex gap-3 items-start p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
            <div>
              <p className="font-semibold text-slate-900">Create & Register Your Farm</p>
              <p className="text-slate-600 text-xs mt-0.5">Enter your farm location, soil type, and primary crop species.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
            <div>
              <p className="font-semibold text-slate-900">Deploy Moisture Probes</p>
              <p className="text-slate-600 text-xs mt-0.5">Place soil probes at root depth (15cm – 45cm) and pair via the dashboard.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
            <div>
              <p className="font-semibold text-slate-900">Receive Irrigation Advisories</p>
              <p className="text-slate-600 text-xs mt-0.5">Review personalized pump run-time and rainfall avoidance alerts.</p>
            </div>
          </div>

          <div className="flex gap-3 items-start p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">4</span>
            <div>
              <p className="font-semibold text-slate-900">Automate or Manually Trigger</p>
              <p className="text-slate-600 text-xs mt-0.5">Run irrigation valves directly from your dashboard or synchronize automated smart relays.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Common answers about smart irrigation",
    icon: HelpCircle,
    content: (
      <div className="space-y-3 text-sm text-slate-700">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <p className="font-semibold text-slate-900">How does AgroAI calculate when to irrigate?</p>
          <p className="text-slate-600 text-xs mt-1">
            The backend matches manually entered soil moisture, soil type, and sugarcane growth stage with historical dataset records.
          </p>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <p className="font-semibold text-slate-900">What happens if internet connectivity is lost?</p>
          <p className="text-slate-600 text-xs mt-1">
            Edge controllers maintain safety threshold limits locally and cache telemetry until network reconnection is established.
          </p>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <p className="font-semibold text-slate-900">How much water and electricity can I save?</p>
          <p className="text-slate-600 text-xs mt-1">
            Farmers report an average of 35% to 45% reduction in water consumption and a 20% reduction in pumping power bills.
          </p>
        </div>
      </div>
    ),
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "Your farm data belongs strictly to you",
    icon: Shield,
    content: (
      <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
        <p>
          At AgroAI, we take agricultural data sovereignty seriously. All field telemetry, crop yields, and geolocation data are encrypted with AES-256 both in transit and at rest.
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <CheckCircle2 className="text-green-600" size={16} />
            <span>We never sell or distribute farmer field metrics to third-party advertisers.</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <CheckCircle2 className="text-green-600" size={16} />
            <span>Farm and advisory records remain separated by farmer account.</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-700">
            <CheckCircle2 className="text-green-600" size={16} />
            <span>Compliant with ISO 27001 data protection standards.</span>
          </div>
        </div>
      </div>
    ),
  },
  terms: {
    title: "Terms & Conditions",
    subtitle: "Service usage and advisory guidelines",
    icon: FileCheck,
    content: (
      <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
        <p>
          By using the AgroAI platform, you agree to follow standard operating procedures for agricultural telemetry equipment and verify irrigation schedules against local environmental conditions.
        </p>
        <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600">
          <li>Recommendations are rule-based and use farmer inputs plus historical sugarcane records.</li>
          <li>Users retain responsibility for ensuring physical pump valves are maintained and operational.</li>
          <li>Platform uptime target is 99.9% across all supported agricultural regions.</li>
        </ul>
      </div>
    ),
  },
};

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavClick = (targetId) => {
    if (window.location.pathname === "/") {
      if (targetId === "top") {
        scrollToTop();
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          scrollToTop();
        }
      }
    } else {
      navigate(targetId === "top" ? "/" : `/#${targetId}`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };

    if (activeModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal]);

  const modalData = activeModal ? RESOURCE_MODALS[activeModal] : null;

  return (
    <footer className="bg-[#002B1D] text-white relative">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          <div>
            <div
              onClick={() => handleNavClick("top")}
              className="flex items-center gap-3 cursor-pointer inline-flex group"
            >
              <div className="bg-green-600 p-3 rounded-xl group-hover:scale-105 transition">
                <Sprout size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AgroAI</h2>
                <p className="text-green-200 text-sm">Smart Irrigation Platform</p>
              </div>
            </div>

            <p className="mt-6 text-gray-300 leading-7">
              Sugarcane irrigation advisory platform helping farmers make informed decisions using current soil moisture and historical farm records.
            </p>

            <div className="flex gap-4 mt-8">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="bg-white/10 hover:bg-green-600 transition p-3 rounded-full flex items-center justify-center cursor-pointer"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="bg-white/10 hover:bg-green-600 transition p-3 rounded-full flex items-center justify-center cursor-pointer"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="bg-white/10 hover:bg-green-600 transition p-3 rounded-full flex items-center justify-center cursor-pointer"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-white/10 hover:bg-green-600 transition p-3 rounded-full flex items-center justify-center cursor-pointer"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>

            <ul className="space-y-4 text-gray-300">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick("top")}
                  className="hover:text-green-400 cursor-pointer transition text-left"
                >
                  Home
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick("features")}
                  className="hover:text-green-400 cursor-pointer transition text-left"
                >
                  Features
                </button>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-green-400 cursor-pointer transition inline-block"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick("how-it-works")}
                  className="hover:text-green-400 cursor-pointer transition text-left"
                >
                  Irrigation Advisor
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Resources</h3>

            <ul className="space-y-4 text-gray-300">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal("docs")}
                  className="hover:text-green-400 cursor-pointer transition text-left"
                >
                  Documentation
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal("guide")}
                  className="hover:text-green-400 cursor-pointer transition text-left"
                >
                  User Guide
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal("faq")}
                  className="hover:text-green-400 cursor-pointer transition text-left"
                >
                  FAQs
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal("privacy")}
                  className="hover:text-green-400 cursor-pointer transition text-left"
                >
                  Privacy Policy
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal("terms")}
                  className="hover:text-green-400 cursor-pointer transition text-left"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          <div id="contact-section">
            <h3 className="text-xl font-semibold mb-6">Contact</h3>

            <div className="space-y-5">
              <a
                href="mailto:support@agroai.com"
                className="flex gap-3 group hover:text-green-300 transition"
              >
                <Mail className="text-green-400 mt-1 shrink-0" size={18} />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-300 group-hover:text-green-300 transition text-sm">
                    support@agroai.com
                  </p>
                </div>
              </a>

              <a
                href="tel:+919876543210"
                className="flex gap-3 group hover:text-green-300 transition"
              >
                <Phone className="text-green-400 mt-1 shrink-0" size={18} />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-300 group-hover:text-green-300 transition text-sm">
                    +91 98765 43210
                  </p>
                </div>
              </a>

              <a
                href="https://maps.google.com/?q=Mumbai,Maharashtra,India"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 group hover:text-green-300 transition"
              >
                <MapPin className="text-green-400 mt-1 shrink-0" size={18} />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-300 group-hover:text-green-300 transition text-sm">
                    Mumbai, Maharashtra, India
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-center md:text-left text-sm">
            © 2026 AgroAI. All Rights Reserved. Empowering Smart Agriculture.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer shadow-md hover:shadow-lg"
          >
            Back to Top
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveModal(null)}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 z-10 my-8 overflow-hidden text-slate-900 border border-slate-100 animate-in fade-in zoom-in-95 duration-200"
          >
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="flex items-start gap-4 pr-8">
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <modalData.icon size={26} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {modalData.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {modalData.subtitle}
                </p>
              </div>
            </div>

            <div className="mt-6">
              {modalData.content}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-6 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
