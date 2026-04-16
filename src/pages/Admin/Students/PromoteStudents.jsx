import { useCallback, useEffect, useState } from "react";
import api from "../../../lib/api";
import { useToast } from "../../../components/ui/ToastProvider";
import { useAdminAuth } from "../../../context/AdminAuthContext";

export default function PromoteStudents() {
  const { academicYear } = useAdminAuth();
  const toast = useToast();

  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [newAcademicYear, setNewAcademicYear] = useState("");
  const [newClass, setNewClass] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  const [availableNewClasses, setAvailableNewClasses] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchStudentsForClass = useCallback(async (className) => {
    const res = await api.get(
      `/admin/students?academicYear=${academicYear}`
    );

    const filtered = res.data.filter(
      (s) => s.class === className
    );

    setStudents(filtered);
    setSelectedStudents([]);
  }, [academicYear]);

  useEffect(() => {
    if (!academicYear) return;

    const fetchInitial = async () => {
      const classRes = await api.get(
        `/admin/classes?academicYear=${academicYear}`
      );
      setClasses(classRes.data);

      const yearRes = await api.get(
        `/admin/academic-years`
      );
      setAvailableYears(
        yearRes.data.filter((year) => year !== academicYear)
      );
    };

    fetchInitial();
  }, [academicYear]);

  useEffect(() => {
    if (!selectedClass) {
      setStudents([]);
      setSelectedStudents([]);
      return;
    }

    const fetchStudents = async () => {
      await fetchStudentsForClass(selectedClass);
    };

    fetchStudents();
  }, [selectedClass, academicYear, fetchStudentsForClass]);

  useEffect(() => {
    if (!newAcademicYear) {
      setAvailableNewClasses([]);
      setNewClass("");
      return;
    }

    const fetchNewClasses = async () => {
      const res = await api.get(
        `/admin/classes?academicYear=${newAcademicYear}`
      );
      setAvailableNewClasses(res.data);
      setNewClass("");
    };

    fetchNewClasses();
  }, [newAcademicYear]);

  const toggleStudent = (admissionNo) => {
    setSelectedStudents((prev) =>
      prev.includes(admissionNo)
        ? prev.filter((id) => id !== admissionNo)
        : [...prev, admissionNo]
    );
  };

  const handlePromote = async () => {
    if (!selectedClass) {
      const message = "Select the current class first.";
      setError(message);
      toast.error(message);
      return;
    }

    if (selectedStudents.length === 0) {
      const message = "Select at least one student to promote.";
      setError(message);
      toast.error(message);
      return;
    }

    if (!newAcademicYear) {
      const message = "Select the target academic year.";
      setError(message);
      toast.error(message);
      return;
    }

    if (newAcademicYear === academicYear) {
      const message = "Target academic year must be different from the current session.";
      setError(message);
      toast.error(message);
      return;
    }

    if (!newClass) {
      const message = "Select the target class.";
      setError(message);
      toast.error(message);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      await api.post("/admin/students/promote", {
        academicYear,
        newAcademicYear,
        currentClass: selectedClass,
        newClass,
        admissionNos: selectedStudents,
      });

      setMessage("Students promoted successfully.");
      toast.success("Students promoted successfully.");
      await fetchStudentsForClass(selectedClass);
      setSelectedStudents([]);
      setNewAcademicYear("");
      setNewClass("");
      setAvailableNewClasses([]);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        "Promotion failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!academicYear)
    return <div className="p-6">No session selected.</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">
        Promote Students — {academicYear}
      </h1>

      {/* Select current class */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <label>Select Current Class</label>
        <select
          value={selectedClass}
          onChange={(e) =>
            setSelectedClass(e.target.value)
          }
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">Select</option>
          {classes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Student list */}
      {students.length > 0 && (
        <div className="bg-white p-4 rounded shadow space-y-3">
          <h2 className="font-medium">
            Select Students
          </h2>

          {students.map((s) => (
            <div
              key={s.admissionNo}
              className="flex items-center gap-3"
            >
              <input
                type="checkbox"
                checked={selectedStudents.includes(
                  s.admissionNo
                )}
                onChange={() =>
                  toggleStudent(s.admissionNo)
                }
              />
              <span>{s.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Promotion target */}
      {selectedStudents.length > 0 && (
        <div className="bg-white p-4 rounded shadow space-y-3">
          <h2 className="font-medium">
            Promotion Details
          </h2>

          <select
            value={newAcademicYear}
            onChange={(e) =>
              setNewAcademicYear(e.target.value)
            }
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">Select New Academic Year</option>
            {availableYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            value={newClass}
            onChange={(e) =>
              setNewClass(e.target.value)
            }
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">Select New Class</option>
            {availableNewClasses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {error && (
            <p className="text-red-600 text-sm">
              {error}
            </p>
          )}

          {message && (
            <p className="text-green-600 text-sm">
              {message}
            </p>
          )}

          <button
            onClick={handlePromote}
            disabled={loading || !selectedStudents.length}
            className="w-full bg-blue-700 text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? "Promoting..." : "Promote Selected Students"}
          </button>
        </div>
      )}
    </div>
  );
}
