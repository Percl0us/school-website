import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { attachToken } from "../../lib/api";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Lock, User, ShieldCheck, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Standard practice for forms
    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/admin/login", { username, password });
      login(res.data);
      attachToken(res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      {/* Branding / Logo Area */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-200 mb-4">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Admin Gateway</h1>
        <p className="text-sm text-slate-500 font-medium">Tagore Public School</p>
      </div>

      <div className="bg-white p-8 shadow-2xl shadow-slate-200 rounded-[2rem] border border-slate-100 w-full max-w-md">
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <User size={18} />
              </span>
              <input
                type="text"
                required
                placeholder="Enter admin ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 pl-11 pr-4 py-3.5 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-bold border border-red-100 flex items-center gap-2 animate-shake">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "Secure Login"
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t pt-6">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
            Authorized Personnel Access Only
          </p>
        </div>
      </div>

      <p className="mt-8 text-xs text-slate-400">
        &copy; 2026 Tagore Public School • v2.4.0
      </p>
    </div>
  );
}