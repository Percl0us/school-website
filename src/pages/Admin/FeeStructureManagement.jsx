import { useState, useEffect, useCallback } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import Spinner from "../../components/ui/Spinner";
import {
  listFeeStructures,
  createFeeStructure,
  updateFeeStructure,
  deleteFeeStructure,
} from "../../services/feeStructureService";
import { Plus, Trash2, Edit2, X } from "lucide-react";

const emptyFormData = {
  class: "",
  tuitionFee: "",
  frequency: "TERM",
  subjects: [],
};

export default function FeeStructureManagement() {
  const { academicYear, authReady } = useAdminAuth();
  const [loading, setLoading] = useState(false);
  const [structures, setStructures] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(emptyFormData);
  const [subjectInput, setSubjectInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch fee structures
  const fetchStructures = useCallback(async () => {
    if (!academicYear) return;

    try {
      setError("");
      const data = await listFeeStructures(academicYear);
      setStructures(data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load fee structures");
      console.error(err);
    }
  }, [academicYear]);

  useEffect(() => {
    if (authReady && academicYear) {
      fetchStructures();
    }
  }, [authReady, academicYear, fetchStructures]);

  const resetForm = () => {
    setFormData(emptyFormData);
    setSubjectInput("");
    setEditingId(null);
    setShowForm(false);
  };

  const addSubject = () => {
    const nextSubject = subjectInput.trim();

    if (!nextSubject) {
      return;
    }

    const exists = formData.subjects.some(
      (subject) => subject.toLowerCase() === nextSubject.toLowerCase()
    );

    if (!exists) {
      setFormData({
        ...formData,
        subjects: [...formData.subjects, nextSubject],
      });
    }

    setSubjectInput("");
  };

  const removeSubject = (subjectToRemove) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter((subject) => subject !== subjectToRemove),
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.class || !formData.tuitionFee) {
      setError("Class name and tuition fee are required");
      return;
    }

    if (formData.subjects.length === 0) {
      setError("Add at least one subject");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        academicYear,
        class: formData.class.trim(),
        tuitionFee: parseInt(formData.tuitionFee, 10),
        frequency: formData.frequency,
        subjects: formData.subjects,
      };

      if (editingId) {
        await updateFeeStructure(editingId, payload);
        setSuccessMessage("Fee structure updated successfully!");
      } else {
        await createFeeStructure(payload);
        setSuccessMessage("Fee structure created successfully!");
      }

      resetForm();
      await fetchStructures();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          `Failed to ${editingId ? "update" : "create"} fee structure`
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this fee structure?")) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      await deleteFeeStructure(id);
      setSuccessMessage("Fee structure deleted successfully!");
      await fetchStructures();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete fee structure");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!authReady || !academicYear) {
    return (
      <div className="p-6 text-center">
        <Spinner label="Loading..." />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Fee Structures</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage fee structures for classes in {academicYear}
            </p>
          </div>
          <button
            onClick={() => {
              if (showForm && !editingId) {
                resetForm();
                return;
              }

              setShowForm(true);
              setEditingId(null);
              setFormData(emptyFormData);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus size={18} /> New Structure
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-start gap-3">
          <span className="text-xl">✓</span>
          <div>
            <p className="font-semibold">Success!</p>
            <p className="text-sm">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-start gap-3">
          <span className="text-xl">⚠</span>
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {editingId ? "Edit Fee Structure" : "Add New Fee Structure"}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class Name
              </label>
              <input
                type="text"
                value={formData.class}
                onChange={(e) =>
                  setFormData({ ...formData, class: e.target.value })
                }
                placeholder="e.g., Class 1A, Class 2B"
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tuition Fee (Annual)
                </label>
                <input
                  type="number"
                  value={formData.tuitionFee}
                  onChange={(e) =>
                    setFormData({ ...formData, tuitionFee: e.target.value })
                  }
                  placeholder="e.g., 50000"
                  disabled={loading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency
                </label>
                <select
                  value={formData.frequency}
                  onChange={(e) =>
                    setFormData({ ...formData, frequency: e.target.value })
                  }
                  disabled={loading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                >
                  <option value="TERM">Term</option>
                  <option value="MONTHLY">Monthly</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subjects
              </label>
              <div className="border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                <div className="flex flex-wrap gap-2">
                  {formData.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                    >
                      {subject}
                      <button
                        type="button"
                        onClick={() => removeSubject(subject)}
                        disabled={loading}
                        className="text-blue-500 transition-colors hover:text-blue-700 disabled:opacity-50"
                        aria-label={`Remove ${subject}`}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === ",") {
                        e.preventDefault();
                        addSubject();
                      }
                    }}
                    onBlur={addSubject}
                    placeholder={
                      formData.subjects.length === 0
                        ? "Type a subject and press Enter"
                        : "Add another subject"
                    }
                    disabled={loading}
                    className="min-w-[180px] flex-1 border-0 p-0 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none disabled:bg-transparent"
                  />
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Type a subject and press Enter or comma to turn it into a note.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
              >
                {loading ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Fee Structures List */}
      {structures.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No fee structures found</p>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              setSubjectInput("");
              setFormData(emptyFormData);
            }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus size={18} /> Create First Structure
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {structures.map((structure) => (
            <div
              key={structure.id}
              className="bg-white rounded-lg shadow p-6 flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">
                  {structure.class}
                </h3>
                <div className="flex gap-6 mt-2 text-sm text-gray-600">
                  <span>
                    <strong>Tuition Fee:</strong> ₹{structure.tuitionFee.toLocaleString()}
                  </span>
                  <span>
                    <strong>Frequency:</strong> {structure.frequency}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  <strong>Subjects:</strong>{" "}
                  {Array.isArray(structure.subjects) && structure.subjects.length > 0
                    ? structure.subjects.join(", ")
                    : "No subjects added"}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(structure.id);
                    setFormData({
                      class: structure.class,
                      tuitionFee: String(structure.tuitionFee),
                      frequency: structure.frequency,
                      subjects: Array.isArray(structure.subjects)
                        ? structure.subjects
                        : [],
                    });
                    setSubjectInput("");
                    setShowForm(true);
                  }}
                  disabled={loading}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                  title="Edit"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(structure.id)}
                  disabled={loading}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl px-8 py-6 shadow-lg">
            <Spinner label="Processing..." />
          </div>
        </div>
      )}
    </div>
  );
}
