import { useNavigate } from "react-router-dom";
import { useStudent } from "../../context/StudentContext";
import { useState } from "react";

export default function StudentLogin() {
  const navigate = useNavigate();
  const { loginStudent, studentSession } = useStudent();

  const [form, setForm] = useState({
    admissionNo: "",
    dob: "",
    academicYear: "2026-27",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      await loginStudent(form);

      navigate("/student/fees", { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || "Invalid details");
    } finally {
      setLoading(false);
    }
  };

  // Optional: if already logged in, skip login page
  if (studentSession) {
    navigate("/student/fees", { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-semibold text-center mb-6">
          Student Portal
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Admission Number
            </label>
            <input
              type="text"
              name="admissionNo"
              value={form.admissionNo}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. A301"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Academic Year
            </label>
            <select
              name="academicYear"
              value={form.academicYear}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="2026-27">2026–27</option>
              <option value="2025-26">2025–26</option>
              <option value="2024-25">2024–25</option>
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 disabled:opacity-50"
          >
            {loading ? "Please wait..." : "View Student Profile"}
          </button>

          <p className="text-xs text-gray-500 text-center">
            For parents and guardians only
          </p>
        </div>
      </div>
    </div>
  );
}
