import { useState } from 'react';
import { Upload } from 'lucide-react';

export default function CSVUploadForm({ 
  onUpload, 
  className, 
  academicYear, 
  onDownloadTemplate,
  loading,
  disabled
}) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    const ext = selectedFile.name.split('.').pop().toLowerCase();
    const validExt = ['csv', 'xlsx', 'xls'];

    if (!validExt.includes(ext)) {
      alert('Please upload a CSV or Excel file');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    await onUpload(file);
    setFile(null);
  };

  return (
    <div className="space-y-4">
      {/* Download Template Button */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-gray-700 mb-3">
          📝 Start by downloading the template with your class students:
        </p>
        <button
          onClick={onDownloadTemplate}
          disabled={disabled || loading}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors text-sm"
        >
          📥 Download Excel Template
        </button>
        <p className="text-xs text-gray-600 mt-2">
          This will download an Excel file with all students in {className}, {academicYear}
        </p>
      </div>

      {/* File Upload Area */}
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`text-center transition-colors ${
            dragActive ? 'bg-blue-50 border-blue-400' : ''
          }`}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          
          <p className="text-sm font-medium text-gray-900 mb-1">
            Drop your filled Excel/CSV file here
          </p>
          <p className="text-xs text-gray-600 mb-4">
            or
          </p>

          <label className="inline-block">
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              disabled={disabled || loading}
              className="hidden"
            />
            <span className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 cursor-pointer transition-colors text-sm inline-block">
              Browse Files
            </span>
          </label>

          <p className="text-xs text-gray-600 mt-4">
            CSV or Excel (.xlsx, .xls) • Max 5MB
          </p>
        </div>

        {/* Selected File */}
        {file && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
              <span className="text-green-700 font-bold text-sm">✓</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-green-900 text-sm truncate">
                {file.name}
              </p>
              <p className="text-xs text-green-700">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button
              onClick={() => setFile(null)}
              className="text-green-600 hover:text-green-700 font-medium text-sm"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <div className="flex justify-end">
        <button
          onClick={handleUpload}
          disabled={!file || disabled || loading}
          className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin">⌛</span>
              Validating...
            </>
          ) : (
            <>
              <Upload size={18} />
              Validate & Review
            </>
          )}
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-amber-50 border border-amber-200 rounded p-4">
        <h4 className="font-semibold text-amber-900 mb-2">Instructions:</h4>
        <ul className="text-xs text-amber-800 space-y-1">
          <li>✓ Download the template (includes all students in the class)</li>
          <li>✓ Fill marks (0-100) for each subject - whole numbers only</li>
          <li>✓ Save the file in Excel or CSV format</li>
          <li>✓ Upload back here to validate and import</li>
        </ul>
      </div>
    </div>
  );
}
