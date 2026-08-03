import {
  Sprout,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#002B1D] text-white">

      {/* Main Footer */}

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Company */}

          <div>

            <div className="flex items-center gap-3">

              <div className="bg-green-600 p-3 rounded-xl">
                <Sprout size={28} />
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  AgroAI
                </h2>

                <p className="text-green-200 text-sm">
                  Smart Irrigation Platform
                </p>

              </div>

            </div>

            <p className="mt-6 text-gray-300 leading-7">
              AI-powered irrigation advisory platform helping
              farmers make intelligent decisions using weather,
              soil moisture, and predictive analytics.
            </p>

            {/* Social */}

            <div className="flex gap-4 mt-8">

              <button className="bg-white/10 hover:bg-green-600 transition p-3 rounded-full">
                <FaFacebookF size={18} />
              </button>

              <button className="bg-white/10 hover:bg-green-600 transition p-3 rounded-full">
                <FaTwitter size={18} />
              </button>

              <button className="bg-white/10 hover:bg-green-600 transition p-3 rounded-full">
                <FaLinkedinIn size={18} />
              </button>

              <button className="bg-white/10 hover:bg-green-600 transition p-3 rounded-full">
                <FaInstagram size={18} />
              </button>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-300">

              <li className="hover:text-green-400 cursor-pointer transition">
                Home
              </li>

              <li className="hover:text-green-400 cursor-pointer transition">
                Features
              </li>

              <li className="hover:text-green-400 cursor-pointer transition">
                Dashboard
              </li>

              <li className="hover:text-green-400 cursor-pointer transition">
                AI Advisor
              </li>

              <li className="hover:text-green-400 cursor-pointer transition">
                Contact
              </li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Resources
            </h3>

            <ul className="space-y-4 text-gray-300">

              <li className="hover:text-green-400 cursor-pointer transition">
                Documentation
              </li>

              <li className="hover:text-green-400 cursor-pointer transition">
                User Guide
              </li>

              <li className="hover:text-green-400 cursor-pointer transition">
                FAQs
              </li>

              <li className="hover:text-green-400 cursor-pointer transition">
                Privacy Policy
              </li>

              <li className="hover:text-green-400 cursor-pointer transition">
                Terms & Conditions
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">

                <Mail className="text-green-400 mt-1" size={18} />

                <div>

                  <p className="font-medium">
                    Email
                  </p>

                  <p className="text-gray-300">
                    support@agroai.com
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <Phone className="text-green-400 mt-1" size={18} />

                <div>

                  <p className="font-medium">
                    Phone
                  </p>

                  <p className="text-gray-300">
                    +91 98765 43210
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <MapPin className="text-green-400 mt-1" size={18} />

                <div>

                  <p className="font-medium">
                    Address
                  </p>

                  <p className="text-gray-300">
                    Mumbai, Maharashtra, India
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Footer */}

      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-400 text-center md:text-left">
            © 2026 AgroAI. All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition px-5 py-3 rounded-full"
          >
            Back to Top
            <ArrowUp size={18} />
          </button>

        </div>

      </div>

    </footer>
  );
};

export default Footer;