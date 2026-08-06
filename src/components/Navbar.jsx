import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ChevronDown, Sprout } from "lucide-react";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Products", "Solutions", "Resources", "Company"];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-green-600 p-2 rounded-xl text-white">
            <Sprout size={22} />
          </div>

          <div>
            <h1 className="font-bold text-3xl text-[#002B1D] leading-none">AgroAI</h1>

            <p className="text-xs text-slate-500">Smart Irrigation</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-10">
          {navItems.map((item) => (
            <div
              key={item}
              className="group flex items-center gap-1 cursor-pointer text-slate-700 font-medium hover:text-green-600 transition"
            >
              {item}

              <ChevronDown
                size={15}
                className="group-hover:rotate-180 transition"
              />
            </div>
          ))}
        </nav>

        {/* Right Buttons */}
        <div className="hidden xl:flex items-center gap-5 ml-10">
          <button className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center hover:bg-green-50 transition">
            <Search size={18} />
          </button>

          <Link
            to="/login"
            className="px-4 py-2 rounded-full font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2.5 rounded-full border border-green-600 text-green-600 font-semibold hover:bg-green-50 transition"
          >
            Register
          </Link>

          <button className="bg-[#00A859] hover:bg-green-700 text-white px-5 py-2.5 rounded-full font-semibold transition shadow-md">
            Schedule Demo
          </button>
        </div>

        {/* Mobile Button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {mobileMenu && (
        <div className="lg:hidden bg-white border-t">
          {navItems.map((item) => (
            <div
              key={item}
              className="px-6 py-4 border-b hover:bg-green-50 cursor-pointer"
            >
              {item}
            </div>
          ))}

          <div className="p-6">
            <button
              className="
              w-full
              bg-green-600
              text-white
              rounded-xl
              py-3
              font-semibold"
            >
              Schedule Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
