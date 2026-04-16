import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Layers, ArrowRight, Calendar, ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { admin, setAcademicYear } = useAdminAuth();
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const res = await api.get("/admin/sessions");
        // Extract academicYear from the new sessions format
        const years = res.data.map(session => session.academicYear);
        setAcademicYears(years);
        if (years.length > 0) setSelectedYear(years[0]);
      } catch (err) {
        console.error("Failed to load sessions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchYears();
  }, []);

  const handleEnterSystem = () => {
    if (!selectedYear) return;
    setAcademicYear(selectedYear);
    navigate("/admin/students");
  };

  // --- Professional Skeleton Loader ---
  if (loading) {
    return (
      <div className="p-8 max-w-2xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded-lg w-48"></div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <div className="h-4 bg-slate-100 rounded w-32"></div>
          <div className="h-12 bg-slate-100 rounded-xl w-full"></div>
          <div className="h-12 bg-slate-200 rounded-xl w-full mt-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-blue-600 mb-2">
          <ShieldCheck size={20} />
          <span className="text-xs font-black uppercase tracking-[0.2em]">Authorized Access Only</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Welcome, <span className="text-blue-600">{admin?.name || "Administrator"}</span>
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          Please select an academic session to manage records and finances.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Selection Card */}
        <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-slate-100 space-y-6 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
            <Layers size={120} />
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3 text-slate-700">
              <div className="bg-slate-100 p-2 rounded-lg">
                <Calendar size={20} />
              </div>
              <label className="block text-sm font-bold uppercase tracking-wider text-slate-500">
                Academic Session
              </label>
            </div>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-lg font-bold text-slate-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
            >
              {academicYears.map((year) => (
                <option key={year} value={year}>
                  Session {year}
                </option>
              ))}
            </select>

            <button
              onClick={handleEnterSystem}
              disabled={!selectedYear}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
            >
              Enter Dashboard
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Quick Stats / Info Info Panel */}
        <div className="space-y-4">
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-1">System Integrity</h4>
            <p className="text-sm text-blue-700/80 leading-relaxed">
              All financial transactions and student promotions are locked to the selected session to ensure data consistency.
            </p>
          </div>
          
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-1 text-sm uppercase tracking-tighter">Recent Activity</h4>
            <p className="text-xs text-slate-500 italic">Select a session to view recent logs...</p>
          </div>
        </div>
      </div>
    </div>
  );
}