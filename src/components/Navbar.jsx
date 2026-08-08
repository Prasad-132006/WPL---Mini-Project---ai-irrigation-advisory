import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Sprout,
} from "lucide-react";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Navigation items
  const navItems = [
    "Products",
    "Solutions",
    "Resources",
    "Company",
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-white/90 backdrop-blur-md"
      }`}
    >
      {/* Main Navbar */}

      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setMobileMenu(false)}
        >
          {/* Logo Icon */}

          <div className="bg-green-600 p-2.5 rounded-xl text-white">
            <Sprout size={24} />
          </div>

          {/* Logo Text */}

          <div>
            <h1 className="font-bold text-2xl text-[#002B1D] leading-none">
              AgroAI
            </h1>

            <p className="text-xs text-slate-500 mt-1">
              Smart Irrigation
            </p>
          </div>
        </Link>

        {/* ================= DESKTOP NAVIGATION ================= */}

        <nav className="hidden xl:flex items-center gap-9">
          {navItems.map((item) => (
            <div
              key={item}
              className="
                group
                flex
                items-center
                gap-1
                cursor-pointer
                text-slate-700
                font-medium
                hover:text-green-600
                transition
              "
            >
              {item}

              <ChevronDown
                size={15}
                className="
                  transition-transform
                  duration-200
                  group-hover:rotate-180
                "
              />
            </div>
          ))}
        </nav>

        {/* ================= DESKTOP ACTIONS ================= */}

        <div className="hidden xl:flex items-center gap-4">

          {/* Search */}

          <button
            type="button"
            aria-label="Search"
            className="
              w-10
              h-10
              rounded-full
              border
              border-slate-200
              flex
              items-center
              justify-center
              text-slate-600
              hover:bg-green-50
              hover:text-green-600
              transition
            "
          >
            <Search size={18} />
          </button>

          {/* Login */}

          <Link
            to="/login"
            className="
              px-4
              py-2
              rounded-full
              font-medium
              text-slate-700
              hover:bg-slate-100
              hover:text-green-600
              transition
            "
          >
            Login
          </Link>

          {/* Register */}

          <Link
            to="/register"
            className="
              px-5
              py-2.5
              rounded-full
              border
              border-green-600
              text-green-600
              font-semibold
              hover:bg-green-50
              transition
            "
          >
            Register
          </Link>

          {/* Schedule Demo */}

          <button
            type="button"
            className="
              bg-[#00A859]
              hover:bg-green-700
              text-white
              px-5
              py-2.5
              rounded-full
              font-semibold
              transition
              shadow-md
              hover:shadow-lg
            "
          >
            Schedule Demo
          </button>

        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}

        <button
          type="button"
          aria-label={
            mobileMenu
              ? "Close menu"
              : "Open menu"
          }
          className="
            xl:hidden
            text-slate-700
            hover:text-green-600
            transition
          "
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>

      </div>

      {/* ================= MOBILE MENU ================= */}

      {mobileMenu && (
        <div
          className="
            xl:hidden
            bg-white
            border-t
            border-slate-200
            shadow-lg
          "
        >

          {/* Navigation Links */}

          <div>
            {navItems.map((item) => (
              <div
                key={item}
                className="
                  px-6
                  py-4
                  border-b
                  border-slate-100
                  hover:bg-green-50
                  cursor-pointer
                  text-slate-700
                  font-medium
                  flex
                  items-center
                  justify-between
                "
              >
                <span>{item}</span>

                <ChevronDown size={17} />
              </div>
            ))}
          </div>

          {/* Authentication */}

          <div
            className="
              px-6
              py-5
              space-y-3
              border-b
              border-slate-200
            "
          >

            {/* Login */}

            <Link
              to="/login"
              onClick={() => setMobileMenu(false)}
              className="
                block
                w-full
                text-center
                px-5
                py-3
                rounded-xl
                border
                border-slate-300
                text-slate-700
                font-semibold
                hover:bg-slate-100
                hover:text-green-600
                transition
              "
            >
              Login
            </Link>

            {/* Register */}

            <Link
              to="/register"
              onClick={() => setMobileMenu(false)}
              className="
                block
                w-full
                text-center
                px-5
                py-3
                rounded-xl
                border
                border-green-600
                text-green-600
                font-semibold
                hover:bg-green-50
                transition
              "
            >
              Register
            </Link>

          </div>

          {/* Schedule Demo */}

          <div className="p-6">

            <button
              type="button"
              className="
                w-full
                bg-[#00A859]
                hover:bg-green-700
                text-white
                rounded-xl
                py-3
                font-semibold
                transition
                shadow-md
              "
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