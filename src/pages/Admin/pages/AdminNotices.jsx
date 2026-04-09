import { useEffect, useState } from "react";
import api from "../../../lib/api";

export default function AdminNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [togglingId, setTogglingId] = useState(null); // Track which specific item is syncing

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", type: "Notice" });

  const fetchNotices = async () => {
    try {
      const res = await api.get("/admin/notices");
      setNotices(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    // 1. OPTIMISTIC UPDATE: Flip the UI immediately
    setTogglingId(id);
    const originalNotices = [...notices];
    setNotices(prev => 
      prev.map(n => n.id === id ? { ...n, isActive: !currentStatus } : n)
    );

    try {
      // 2. Perform API call in background
      await api.patch(`/admin/notices/${id}`);
    } catch (err) {
      // 3. ROLLBACK: If it fails, revert the UI state
      console.error("Toggle failed:", err);
      setNotices(originalNotices);
      alert("Failed to update status. Reverting...");
    } finally {
      setTogglingId(null);
    }
  };

  const createNotice = async () => {
    if (!form.title || !form.date) return;
    setIsCreating(true);
    try {
      await api.post("/admin/notices", form);
      setShowModal(false);
      setForm({ title: "", date: "", type: "Notice" });
      await fetchNotices();
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => { fetchNotices(); }, []);

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-black text-slate-800">Manage Notices</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition"
        >
          + Create Notice
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {notices.map((n) => (
          <div key={n.id} className="p-5 bg-white border border-slate-100 rounded-2xl flex justify-between items-center shadow-sm">
            <div className={togglingId === n.id ? "opacity-50 transition-opacity" : ""}>
              <p className="font-bold text-slate-800">{n.title}</p>
              <p className="text-xs text-slate-400">
                {new Date(n.date).toDateString()} • {n.type}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Sync Spinner (Mini) */}
              {togglingId === n.id && (
                <div className="w-3 h-3 border-2 border-slate-200 border-t-slate-500 rounded-full animate-spin" />
              )}
              
              <label className="relative inline-flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={n.isActive}
                  disabled={togglingId === n.id}
                  onChange={() => toggleStatus(n.id, n.isActive)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-green-500 transition-all after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5" />
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md space-y-4 shadow-2xl animate-in fade-in zoom-in duration-150">
            <h2 className="text-xl font-bold text-slate-800">New Notice</h2>
            
            <input
              type="text" placeholder="Title"
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              type="date"
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <select
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="Notice">Notice</option>
              <option value="Event">Event</option>
            </select>

            <div className="flex justify-end gap-3 pt-2">
              <button
                disabled={isCreating}
                onClick={() => setShowModal(false)}
                className="px-4 py-2 font-bold text-slate-400"
              >
                Cancel
              </button>
              <button
                disabled={isCreating}
                onClick={createNotice}
                className="min-w-[100px] px-6 py-2 bg-blue-600 text-white rounded-xl font-bold flex justify-center items-center gap-2"
              >
                {isCreating ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}