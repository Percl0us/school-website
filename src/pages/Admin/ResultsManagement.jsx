import { useState, useEffect, useCallback } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useToast } from '../../components/ui/ToastProvider';
import Spinner from '../../components/ui/Spinner';
import CSVUploadForm from './CSVUploadForm';
import ValidationPreview from './ValidationPreviewFixed';
import {
  downloadMarksTemplate,
  uploadMarksFile,
  confirmMarksImport
} from '../../services/marksUploadService';
import api from '../../lib/api';

export default function ResultsManagement() {
  const { academicYear, authReady } = useAdminAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [stage, setStage] = useState('upload'); // upload | preview | success
  const [validationData, setValidationData] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchClasses = useCallback(async () => {
    if (!academicYear) return;
    try {
      const response = await api.get('/admin/classes', {
        params: { academicYear }
      });
      const classList = Array.isArray(response.data) ? response.data : (response.data?.classes || []);
      setClasses(classList);
      if (classList.length > 0) setSelectedClass(classList[0]);
    } catch (err) {
      const errorMessage = 'Failed to load classes: ' + (err.response?.data?.error || err.message);
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }, [academicYear, toast]);

  useEffect(() => {
    if (authReady && academicYear) fetchClasses();
  }, [authReady, academicYear, fetchClasses]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchClasses();
    } finally {
      setRefreshing(false);
    }
  };

  const handleDownloadTemplate = async () => {
    if (!selectedClass) {
      const errorMessage = 'Please select a class';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }
    try {
      setLoading(true);
      setError('');
      await downloadMarksTemplate(selectedClass, academicYear);
    } catch {
      setError('Failed to download template');
      toast.error('Failed to download template');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadFile = async (file) => {
    if (!selectedClass) {
      const errorMessage = 'Please select a class';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }
    try {
      setLoading(true);
      setError('');
      const result = await uploadMarksFile(file, selectedClass, academicYear);
      if (result.success) {
        setValidationData(result);
        setStage('preview');
        toast.info('File uploaded. Please review the validation preview.');
      } else {
        const errorMessage = result.error || 'Validation failed';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Upload failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmImport = async () => {
    // ✅ Check validRows instead of old .data
    if (!validationData?.validRows || validationData.validRows.length === 0) {
      const errorMessage = 'No valid data to import';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }
    try {
      setLoading(true);
      setError('');
      // ✅ Pass validRows, academicYear, and selectedClass
      const result = await confirmMarksImport(
        validationData.validRows,
        academicYear,
        selectedClass
      );
      if (result.success) {
        setSuccessMessage(result.message || 'Import successful');
        toast.success(result.message || 'Import successful');
        setStage('success');
        setTimeout(() => {
          setStage('upload');
          setValidationData(null);
          setSelectedClass('');
        }, 3000);
      } else {
        setError('Import failed');
        toast.error('Import failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Confirm failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Render loading, error, empty states (unchanged, but fixed the success message display)
  if (!classes.length) {
    if (!academicYear) {
      return (
        <div className="p-6 text-center">
          <Spinner label="Initializing..." />
        </div>
      );
    }
    return (
      <div className="p-6 text-center max-w-2xl mx-auto">
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-600 font-semibold">Error Loading Classes</p>
            <p className="text-red-500 mt-2">{error}</p>
            <button onClick={handleRefresh} disabled={refreshing} className="...">Try Again</button>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-600 font-semibold">No Classes Available</p>
            <p className="text-blue-700 mt-2">No fee structures for <strong>{academicYear}</strong>.</p>
            <button onClick={handleRefresh} disabled={refreshing} className="...">Refresh</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Upload Student Marks</h1>
        <p className="text-sm text-gray-600 mt-1">Upload marks via Excel or CSV</p>
      </div>

      {/* Filters (only when not in success) */}
      {stage !== 'success' && (
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                disabled={loading}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Choose a class...</option>
                {classes.map(cls => <option key={cls} value={cls}>{cls}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
              <input type="text" value={academicYear} disabled className="w-full px-3 py-2 border rounded-lg bg-gray-100" />
            </div>
          </div>
        </div>
      )}

      {/* Error / Success / Loader */}
      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">{error}</div>}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
          {successMessage}
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl px-8 py-6 shadow-lg"><Spinner label="Processing..." /></div>
        </div>
      )}

      {/* Stages */}
      {stage === 'upload' && selectedClass && (
        <CSVUploadForm
          onUpload={handleUploadFile}
          className={selectedClass}
          academicYear={academicYear}
          onDownloadTemplate={handleDownloadTemplate}
          loading={loading}
          disabled={!selectedClass}
        />
      )}
      {stage === 'preview' && validationData && (
        <ValidationPreview
          validRows={validationData.validRows || []}
          invalidRows={validationData.invalidRows || []}
          subjects={validationData.subjects || []}
          onConfirm={handleConfirmImport}
          loading={loading}
        />
      )}
      {stage === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-white">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">Import Successful!</h2>
          <p className="text-green-700 mb-4">{successMessage}</p>
          <p className="text-sm text-green-600">Redirecting...</p>
        </div>
      )}
    </div>
  );
}
