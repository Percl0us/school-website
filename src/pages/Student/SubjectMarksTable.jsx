export default function SubjectMarksTable({ subjects }) {
  if (!subjects || subjects.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No subject marks available.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-3 text-left font-semibold text-gray-700">Subject</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-700">Marks</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-700">Total</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-700">Percentage</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-700">Grade</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, idx) => {
            const marksObtained =
              subject.marksObtained ?? subject.marks ?? null;
            const totalMarks = subject.maxMarks ?? subject.totalMarks ?? 100;
            const grade = subject.grade ?? subject.gradeSymbol ?? "N/A";
            const percentage =
              marksObtained !== null && totalMarks > 0
                ? ((marksObtained / totalMarks) * 100).toFixed(1)
                : 0;

            const gradeColor =
              grade === "A+" || grade === "A"
                ? "bg-green-500"
                : grade === "B"
                ? "bg-blue-500"
                : grade === "C" || grade === "D"
                ? "bg-yellow-500"
                : grade === "AB"
                ? "bg-gray-500"
                : "bg-red-500";

            return (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900">{subject.name}</td>
                <td className="px-4 py-3 text-center font-medium text-gray-700">
                  {marksObtained ?? "AB"}
                </td>
                <td className="px-4 py-3 text-center text-gray-600">
                  {totalMarks}
                </td>
                <td className="px-4 py-3 text-center font-medium text-gray-700">
                  {marksObtained !== null ? `${percentage}%` : "AB"}
                </td>
                <td className="px-4 py-3 text-center font-bold">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs ${gradeColor}`}
                  >
                    {grade}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
