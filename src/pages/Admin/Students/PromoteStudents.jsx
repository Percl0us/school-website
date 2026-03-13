import { useEffect, useState } from "react";
import api from "../../../lib/api";
import { useAdminAuth } from "../../../context/AdminAuthContext";

export default function PromoteStudents() {
  const { academicYear } = useAdminAuth();

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
      setAvailableYears(yearRes.data);
    };

    fetchInitial();
  }, [academicYear]);

  useEffect(() => {
    if (!selectedClass) return;

    const fetchStudents = async () => {
      const res = await api.get(
        `/admin/students?academicYear=${academicYear}`
      );

      const filtered = res.data.filter(
        (s) => s.class === selectedClass
      );

      setStudents(filtered);
      setSelectedStudents([]);
    };

    fetchStudents();
  }, [selectedClass, academicYear]);

  useEffect(() => {
    if (!newAcademicYear) return;

    const fetchNewClasses = async () => {
      const res = await api.get(
        `/admin/classes?academicYear=${newAcademicYear}`
      );
      setAvailableNewClasses(res.data);
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
    try {
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
      setSelectedStudents([]);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Promotion failed"
      );
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
            className="w-full bg-blue-700 text-white py-2 rounded"
          >
            Promote Selected Students
          </button>
        </div>
      )}
    </div>
  );
}