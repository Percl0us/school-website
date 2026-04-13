import { Sparkles } from "lucide-react";

export const FloatingCTA = ({ handleNav, loading }) => {
  return (
    <div className="fixed bottom-20 right-6 z-50 md:hidden">
      <button
        onClick={() => handleNav("/admissions", "admissions")}
        className="font-swanky flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
      >
        <Sparkles size={16} /> Apply Now
      </button>
    </div>
  );
};