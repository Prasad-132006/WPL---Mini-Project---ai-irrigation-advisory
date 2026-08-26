import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("agroai_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type) => {
    localStorage.setItem("agroai_cookie_consent", type);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-5 rounded-2xl shadow-2xl border border-slate-700/60 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-green-500/20 text-green-400 rounded-xl">
              <Cookie size={20} />
            </div>
            <h4 className="font-semibold text-sm text-slate-100">Cookie & Telemetry Preferences</h4>
          </div>
          <button
            type="button"
            onClick={() => handleAccept("dismissed")}
            className="text-slate-400 hover:text-white transition p-1 cursor-pointer"
            aria-label="Dismiss cookie banner"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          We use essential cookies to remember your farm preferences, authenticate sessions, and deliver precise localized weather and irrigation analytics.
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleAccept("all")}
            className="flex-1 py-2 px-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-semibold transition cursor-pointer text-center"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={() => handleAccept("essential")}
            className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer border border-slate-700"
          >
            Essential Only
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CookieBanner;
