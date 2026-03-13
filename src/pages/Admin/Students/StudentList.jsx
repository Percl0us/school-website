import { useEffect, useState, useMemo } from "react";
import api from "../../../lib/api";
import { useAdminAuth } from "../../../context/AdminAuthContext";

export default function StudentList() {
  const { academicYear } = useAdminAuth();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await api.get(
        `/admin/students?academicYear=${academicYear}`
      );
      setStudents(res.data);
      setLoading(false);
    };

    if (academicYear) fetchStudents();
  }, [academicYear]);

  const classes = useMemo(() => {
    const unique = new Set(students.map((s) => s.class));
    return ["ALL", ...unique];
  }, [students]);

  const filteredStudents = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return students
      .filter((s) => {
        if (classFilter !== "ALL" && s.class !== classFilter) {
          return false;
        }

        if (
          searchTerm &&
          !(
            s.name.toLowerCase().includes(searchTerm) ||
            s.admissionNo.toLowerCase().includes(searchTerm)
          )
        ) {
          return false;
        }

        return true;
      })
      .map((s) => ({
        ...s,
        status: calculateStatus(s),
      }));
  }, [students, search, classFilter]);

  if (!academicYear)
    return <div className="p-6">No session selected.</div>;

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">
        Students — {academicYear}
      </h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search name or admission no..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />

        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {classes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2 w-10 text-gray-500">#</th>
              <th>Admission No</th>
              <th>Name</th>
              <th>Father Name</th>
              <th>Mother Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s, index) => (
              <tr key={s.admissionNo} className="border-b">
                <td className="py-2 text-gray-400">
                  {index + 1}
                </td>

                <td className="font-mono text-xs text-gray-500">
                  {s.admissionNo}
                </td>

                <td className="font-medium">
                  {s.name}
                </td>

                <td className="text-gray-700">
                  {s.fatherName}
                </td>

                <td className="text-gray-700">
                  {s.motherName}
                </td>

                <td>{s.class}</td>

                <td>{s.section || "-"}</td>

                <td className="text-green-600 font-mono">
                  ₹{s.totalPaid}
                </td>

                <td className="text-red-600 font-mono">
                  ₹{s.balance}
                </td>

                <td>
                  <StatusBadge status={s.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function calculateStatus(student) {
  if (student.balance <= 0) return "UP_TO_DATE";
  if (student.totalPaid > 0) return "PARTIAL";
  return "UNPAID";
}

function StatusBadge({ status }) {
  const color =
    status === "UP_TO_DATE"
      ? "bg-green-100 text-green-700"
      : status === "PARTIAL"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`px-2 py-1 rounded text-xs ${color}`}>
      {status.replace("_", " ")}
    </span>
  );
}