import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  Sprout,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../auth";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user: loggedInUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setMobileMenu(false);
  };

  const scrollToDemo = () => {
    setMobileMenu(false);
    const featuresEl = document.getElementById("features");
    if (featuresEl) {
      featuresEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-white/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => setMobileMenu(false)}
          className="flex items-center gap-3"
        >
          <div className="bg-green-600 p-2.5 rounded-xl text-white">
            <Sprout size={24} />
          </div>

          <div>
            <h1 className="font-bold text-2xl text-[#002B1D] leading-none">
              AgroAI
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Smart Irrigation
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            aria-label="Search"
            onClick={scrollToDemo}
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
              cursor-pointer
            "
          >
            <Search size={18} />
          </button>

          {loggedInUser ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 px-4 py-2 rounded-full font-semibold transition text-sm shadow-xs"
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-slate-700 text-xs font-medium border border-slate-200">
                <User size={14} className="text-slate-500" />
                <span className="max-w-[120px] truncate">{loggedInUser.name || "Farmer"}</span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-slate-600 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 text-sm font-medium transition cursor-pointer"
                title="Log out"
              >
                <LogOut size={16} />
                <span>Log out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
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

              <button
                type="button"
                onClick={scrollToDemo}
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
                  cursor-pointer
                "
              >
                Schedule Demo
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          aria-label={
            mobileMenu
              ? "Close menu"
              : "Open menu"
          }
          className="
            md:hidden
            text-slate-700
            hover:text-green-600
            transition
            cursor-pointer
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

      {mobileMenu && (
        <div
          className="
            md:hidden
            bg-white
            border-t
            border-slate-200
            shadow-lg
          "
        >
          {loggedInUser ? (
            <div className="px-6 py-5 space-y-3">
              <div className="p-3.5 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    {loggedInUser.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 leading-tight">{loggedInUser.name}</p>
                    <p className="text-xs text-slate-500 truncate max-w-[180px]">{loggedInUser.email}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-green-200/70 text-green-800 px-2 py-0.5 rounded-full">
                  Active
                </span>
              </div>

              <Link
                to="/dashboard"
                onClick={() => setMobileMenu(false)}
                className="w-full text-center px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <LayoutDashboard size={18} />
                <span>Open Dashboard</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-semibold transition cursor-pointer"
              >
                <LogOut size={18} />
                <span>Log out</span>
              </button>
            </div>
          ) : (
            <div className="px-6 py-5 space-y-3">
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

              <button
                type="button"
                onClick={scrollToDemo}
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
                  cursor-pointer
                "
              >
                Schedule Demo
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
