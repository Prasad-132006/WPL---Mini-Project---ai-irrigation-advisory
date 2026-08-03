import { Sparkles } from "lucide-react";

const Announcement = () => {
  return (
    <div className="w-full bg-[#002B1D] text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 px-4 py-2 text-sm md:text-base">
        <Sparkles size={18} className="text-yellow-300" />

        <p className="text-center">
          AI-powered Smart Irrigation Advisory is now available for farmers.
          <span className="ml-2 font-semibold underline cursor-pointer hover:text-green-300 transition">
            Learn More
          </span>
        </p>
      </div>
    </div>
  );
};

export default Announcement;