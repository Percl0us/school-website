const formatMarksPreview = (subjects, marks) => {
  if (!Array.isArray(subjects) || !Array.isArray(marks)) {
    return "";
  }

  return subjects
    .map((subject, index) => `${subject}: ${marks[index] ?? "AB"}`)
    .join(" | ");
};

export default function ValidationPreviewFixed({
  validRows,
  invalidRows,
  subjects = [],
  onConfirm,
  loading,
}) {
  const totalRows = validRows.length + invalidRows.length;

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow">
      <div className="border-b pb-4">
        <h3 className="mb-3 text-lg font-semibold text-gray-900">
          Validation Results
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded border border-blue-200 bg-blue-50 p-4">
            <p className="text-xs font-medium uppercase text-blue-600">
              Total Rows
            </p>
            <p className="text-2xl font-bold text-blue-900">{totalRows}</p>
          </div>
          <div className="rounded border border-green-200 bg-green-50 p-4">
            <p className="text-xs font-medium uppercase text-green-600">
              Valid
            </p>
            <p className="text-2xl font-bold text-green-900">
              {validRows.length}
            </p>
          </div>
          <div
            className={`rounded border p-4 ${
              invalidRows.length > 0
                ? "border-red-200 bg-red-50"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <p
              className={`text-xs font-medium uppercase ${
                invalidRows.length > 0 ? "text-red-600" : "text-gray-600"
              }`}
            >
              Invalid
            </p>
            <p
              className={`text-2xl font-bold ${
                invalidRows.length > 0 ? "text-red-900" : "text-gray-900"
              }`}
            >
              {invalidRows.length}
            </p>
          </div>
        </div>
      </div>

      {validRows.length > 0 && (
        <div className="border-b pb-4">
          <h4 className="mb-3 flex items-center font-semibold text-green-700">
            <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
              OK
            </span>
            Valid Rows ({validRows.length})
          </h4>
          <div className="max-h-48 space-y-2 overflow-y-auto">
            {validRows.map((row, idx) => (
              <div
                key={idx}
                className="rounded border border-green-200 bg-green-50 p-3"
              >
                <p className="font-medium text-gray-900">
                  {row.admissionNo || row.admission} -{" "}
                  {row.studentName || row.student}
                </p>
                <p className="mt-1 text-xs text-gray-600">
                  {formatMarksPreview(subjects, row.marks)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {invalidRows.length > 0 && (
        <div className="border-b pb-4">
          <h4 className="mb-3 flex items-center font-semibold text-red-700">
            <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              X
            </span>
            Invalid Rows ({invalidRows.length}) - Fix and Retry
          </h4>
          <div className="max-h-48 space-y-2 overflow-y-auto">
            {invalidRows.map((row, idx) => (
              <div
                key={idx}
                className="rounded border border-red-200 bg-red-50 p-3"
              >
                <p className="font-medium text-gray-900">
                  Row {row.rowNumber || row.rowNum}:{" "}
                  {row.admissionNo || row.admission || "Unknown"} -{" "}
                  {row.studentName || row.student || "Unknown"}
                </p>
                <p className="mt-1 text-xs text-red-700">Error: {row.error}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-3 border-t pt-4">
        {invalidRows.length > 0 && (
          <p className="flex items-center text-sm text-amber-600">
            Warning: {invalidRows.length} row(s) have errors. Fix them in Excel
            and upload again.
          </p>
        )}

        {validRows.length > 0 && (
          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Importing..." : "Confirm & Import"}
          </button>
        )}
      </div>
    </div>
  );
}
