const formatMarksPreview = (subjects, marks) => {
  if (!Array.isArray(subjects) || !Array.isArray(marks)) {
    return "";
  }

  return subjects
    .map((subject, index) => `${subject}: ${marks[index] ?? "AB"}`)
    .join(" | ");
};

export default function ValidationPreview({
  validRows,
  invalidRows,
  subjects = [],
  onConfirm,
  loading,
}) {
  const totalRows = validRows.length + invalidRows.length;

  return (
    <div className="space-y-6 bg-white rounded-lg shadow p-6">
      {/* Summary */}
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Validation Results
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded p-4 border border-blue-200">
            <p className="text-xs font-medium text-blue-600 uppercase">Total Rows</p>
            <p className="text-2xl font-bold text-blue-900">{totalRows}</p>
          </div>
          <div className="bg-green-50 rounded p-4 border border-green-200">
            <p className="text-xs font-medium text-green-600 uppercase">Valid</p>
            <p className="text-2xl font-bold text-green-900">{validRows.length}</p>
          </div>
          <div className={`rounded p-4 border ${
            invalidRows.length > 0 
              ? 'bg-red-50 border-red-200' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            <p className={`text-xs font-medium uppercase ${
              invalidRows.length > 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              Invalid
            </p>
            <p className={`text-2xl font-bold ${
              invalidRows.length > 0 ? 'text-red-900' : 'text-gray-900'
            }`}>
              {invalidRows.length}
            </p>
          </div>
        </div>
      </div>

      {/* Valid Rows */}
      {validRows.length > 0 && (
        <div className="border-b pb-4">
          <h4 className="font-semibold text-green-700 mb-3 flex items-center">
            <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center mr-2 text-xs">
              ✓
            </span>
            Valid Rows ({validRows.length})
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {validRows.map((row, idx) => (
              <div key={idx} className="bg-green-50 border border-green-200 rounded p-3">
                <p className="font-medium text-gray-900">
                  {row.admission} - {row.student}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {row.subjects.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invalid Rows */}
      {invalidRows.length > 0 && (
        <div className="border-b pb-4">
          <h4 className="font-semibold text-red-700 mb-3 flex items-center">
            <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center mr-2 text-xs">
              ✗
            </span>
            Invalid Rows ({invalidRows.length}) - Fix and Retry
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {invalidRows.map((row, idx) => (
              <div key={idx} className="bg-red-50 border border-red-200 rounded p-3">
                <p className="font-medium text-gray-900">
                  Row {row.rowNum}: {row.admission} - {row.student}
                </p>
                <p className="text-xs text-red-700 mt-1">
                  Error: {row.error}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end pt-4 border-t">
        {invalidRows.length > 0 && (
          <p className="text-sm text-amber-600 flex items-center">
            ⚠ {invalidRows.length} row(s) have errors. Fix them in Excel and upload again.
          </p>
        )}
        
        {validRows.length > 0 && (
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Importing...' : 'Confirm & Import'}
          </button>
        )}
      </div>
    </div>
  );
}
