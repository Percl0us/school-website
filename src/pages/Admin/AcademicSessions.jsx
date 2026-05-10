import { useEffect, useState } from "react";
import api from "../../lib/api";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Plus, Edit, Trash2, Calendar, Check, X } from "lucide-react";

export default function AcademicSessions() {
  const { token, authReady } = useAdminAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    academicYear: "",
    startDate: "",
    endDate: "",
    isActive: true,
  });

  useEffect(() => {
    if (authReady && token) {
      fetchSessions();
    }
  }, [authReady, token]);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/sessions");
      setSessions(res.data || []);
      setError("");
    } catch (err) {
      setError("Failed to load academic sessions");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.academicYear || !formData.startDate || !formData.endDate) {
      setError("All fields are required");
      return;
    }

    try {
      if (editingId) {
        await api.patch(`/admin/sessions/${editingId}`, formData);
        setSuccess("Academic session updated successfully");
      } else {
        await api.post("/admin/sessions", formData);
        setSuccess("Academic session created successfully");
      }

      setFormData({ academicYear: "", startDate: "", endDate: "", isActive: true });
      setEditingId(null);
      setShowForm(false);
      fetchSessions();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save session");
    }
  };

  const handleEdit = (session) => {
    setFormData({
      academicYear: session.academicYear,
      startDate: session.startDate.split("T")[0],
      endDate: session.endDate.split("T")[0],
      isActive: session.isActive,
    });
    setEditingId(session.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;

    try {
      await api.delete(`/admin/sessions/${id}`);
      setSuccess("Academic session deleted successfully");
      fetchSessions();
    } catch (err) {
      setError("Failed to delete session");
    }
  };

  const handleCancel = () => {
    setFormData({ academicYear: "", startDate: "", endDate: "", isActive: true });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded-lg w-48"></div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Academic Sessions</h1>
          <p className="text-slate-500 text-sm mt-1">Manage academic years and sessions</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl transition"
          >
            <Plus size={18} /> New Session
          </button>
        )}
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm font-medium">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm font-medium">
          {success}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            {editingId ? "Edit Session" : "Create New Session"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Academic Year (e.g., 2024-2025)
              </label>
              <input
                type="text"
                placeholder="e.g., 2024-2025"
                value={formData.academicYear}
                onChange={(e) =>
                  setFormData({ ...formData, academicYear: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="w-4 h-4 rounded border-slate-300"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-slate-700">
                Set as Active Session
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
              >
                {editingId ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2.5 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sessions List */}
      {sessions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
          <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">No academic sessions yet</p>
          <p className="text-slate-400 text-sm mt-1">Create one to get started</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      {session.academicYear}
                    </h3>
                    {session.isActive && (
                      <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                        <Check size={12} /> Active
                      </span>
                    )}
                  </div>
                  <div className="flex gap-6 text-sm text-slate-600">
                    <div>
                      <span className="font-medium">Start:</span> {new Date(session.startDate).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">End:</span> {new Date(session.endDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(session)}
                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(session.id)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
