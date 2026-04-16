function StatusBadge({ status }) {
  const color =
    status === "UP_TO_DATE"
      ? "bg-green-100 text-green-700"
      : status === "PARTIAL"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}>
      {status.replace("_", " ")}
    </span>
  );
}

export default function StudentManagementTable({
  filteredStudents,
  loading,
  onManageStudent,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">Admission No</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Parents</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Paid</th>
              <th className="px-4 py-3">Balance</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-4 py-10 text-center text-slate-500" colSpan={8}>
                  Loading students...
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td className="px-4 py-10 text-center text-slate-500" colSpan={8}>
                  No students matched the current filters.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.admissionNo} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">
                    {student.admissionNo}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{student.name}</div>
                    <div className="text-xs text-slate-500">
                      DOB {student.dob ? new Date(student.dob).toLocaleDateString() : "-"}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <div>{student.fatherName || "-"}</div>
                    <div>{student.motherName || "-"}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {student.class} {student.section ? `(${student.section})` : ""}
                  </td>
                  <td className="px-4 py-3 font-mono text-green-600">
                    Rs {student.totalPaid}
                  </td>
                  <td className="px-4 py-3 font-mono text-red-600">
                    Rs {student.balance}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={student.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onManageStudent(student)}
                      className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
