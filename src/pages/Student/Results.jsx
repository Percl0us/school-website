import { useStudent } from "../../context/StudentContext";
import { useState, useEffect } from "react";
import { getStudentResultsByYear, getAllStudentResults } from "../../services/resultsService";
import Spinner from "../../components/ui/Spinner";
import ReportCard from "./ReportCard";

export default function StudentResults() {
  const { studentSession } = useStudent();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [currentResult, setCurrentResult] = useState(null);

  useEffect(() => {
    if (studentSession) {
      setSelectedYear(studentSession.academic.academicYear);
      fetchAllResults();
    }
  }, [studentSession]);

  useEffect(() => {
    if (selectedYear && studentSession) {
      fetchResultsForYear(selectedYear);
    }
  }, [selectedYear, studentSession]);

  const fetchAllResults = async () => {
    try {
      setLoading(true);
      setError("");
      // ✅ No admissionNo needed – token identifies student
      const results = await getAllStudentResults();
      setAllResults(results);
      if (results.length > 0) {
        setSelectedYear(results[0].academicYear);
      }
    } catch (err) {
      setError("Failed to load results");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchResultsForYear = async (year) => {
    try {
      setLoading(true);
      setError("");
      // ✅ Only pass the year – admissionNo comes from token
      const result = await getStudentResultsByYear(year);
      setCurrentResult(result);
    } catch (err) {
      if (err.response?.status === 404) {
        setCurrentResult(null);
        setError(`No results available for ${year}`);
      } else {
        setError("Failed to load results");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!studentSession) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {loading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl px-8 py-6 shadow-lg">
            <Spinner label="Loading results…" />
          </div>
        </div>
      )}

      {/* Academic Year Selector */}
      <div className="bg-white rounded-lg shadow p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Academic Year
        </label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose a year...</option>
          {allResults.map((result) => (
            <option key={result.id} value={result.academicYear}>
              {result.academicYear}
            </option>
          ))}
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Report Card */}
      {currentResult && (
        <ReportCard
          result={currentResult}
          student={studentSession.student}
          academic={studentSession.academic}
        />
      )}

      {/* No Results */}
      {!loading && !currentResult && !error && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
          No results available for the selected year.
        </div>
      )}
    </div>
  );
}
