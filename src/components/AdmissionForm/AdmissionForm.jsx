import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const ADMISSIONS_API_URL = "https://script.google.com/macros/s/AKfycbwR_NnQYKtotEjMdhnomRUBQpSwyn1GvmQkb93hs_gD88i1LUgHIaqTkHXxlMmPXk9z6Q/exec";

export default function AdmissionForm() {
  const [student, setStudent] = useState({ name: "", gender: "", dob: "", classApplying: "" });
  const [parent, setParent] = useState({ fatherName: "", motherName: "", phone: "", email: "" });
  const [address, setAddress] = useState({ city: "", state: "", pincode: "" });
  const [academic, setAcademic] = useState({ lastClass: "", board: "", medium: "" });
  
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!student.name.trim() || !student.classApplying || !parent.phone.trim()) {
      return setError("Please complete all required fields (Name, Class, and Phone).");
    }
    setSubmitting(true);
    const payload = { studentName: student.name, ...student, ...parent, ...address, ...academic };
    try {
      await fetch(ADMISSIONS_API_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      setSubmitted(true);
    } catch {
      setError("Network error. Your submission couldn't be sent. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const showAcademicSection = !["LKG", "UKG", ""].includes(student.classApplying);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 rounded-md mb-6 text-sm">
          <AlertCircle size={18} />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {submitted ? (
        <div className="bg-white border border-gray-200 p-8 rounded-2xl text-center shadow-lg">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted</h2>
          <p className="text-gray-500 mb-6">
            Thank you. Our admissions coordinator will contact you at <span className="font-semibold text-gray-900">{parent.phone}</span>.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition"
          >
            Submit Another
          </button>
        </div>
      ) : (
        <form className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden" onSubmit={handleSubmit}>
          {/* Compact header */}
          <div className="bg-gray-900 px-6 py-5 text-white">
            <h2 className="text-2xl font-bold tracking-tight">Student Enrollment</h2>
            <p className="text-indigo-300 text-xs uppercase tracking-wider">Academic Year 2026-2027</p>
          </div>

          <div className="p-6 space-y-8">
            {/* Student & Guardian in one combined grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1 h-5 bg-indigo-600 rounded-full"></span> Student
                </h3>
                <input type="text" placeholder="Full name *" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" 
                  value={student.name} onChange={(e) => setStudent({...student, name: e.target.value})} />
                <div className="grid grid-cols-2 gap-3">
                  <select value={student.gender} onChange={(e) => setStudent({...student, gender: e.target.value})} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                    <option value="">Gender</option>
                    <option>Male</option><option>Female</option>
                  </select>
                  <input type="date" placeholder="DOB" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" 
                    value={student.dob} onChange={(e) => setStudent({...student, dob: e.target.value})} />
                </div>
                <select value={student.classApplying} onChange={(e) => setStudent({...student, classApplying: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium">
                  <option value="">Class applying *</option>
                  {["LKG","UKG","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1 h-5 bg-indigo-600 rounded-full"></span> Guardian
                </h3>
                <input type="text" placeholder="Father's name" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" 
                  value={parent.fatherName} onChange={(e) => setParent({...parent, fatherName: e.target.value})} />
                <input type="text" placeholder="Mother's name" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" 
                  value={parent.motherName} onChange={(e) => setParent({...parent, motherName: e.target.value})} />
                <input type="tel" placeholder="Phone *" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" 
                  value={parent.phone} onChange={(e) => setParent({...parent, phone: e.target.value})} />
                <input type="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" 
                  value={parent.email} onChange={(e) => setParent({...parent, email: e.target.value})} />
              </div>
            </div>

            {/* Address + Academic (inline) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1 h-5 bg-indigo-600 rounded-full"></span> Address
                </h3>
                <input type="text" placeholder="City / Village" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" 
                  value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="State" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" 
                    value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} />
                  <input type="text" placeholder="Pincode" className="px-3 py-2 border border-gray-200 rounded-lg text-sm" 
                    value={address.pincode} onChange={(e) => setAddress({...address, pincode: e.target.value})} />
                </div>
              </div>

              {showAcademicSection && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1 h-5 bg-indigo-600 rounded-full"></span> Previous School
                  </h3>
                  <input type="text" placeholder="Last class/grade" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" 
                    value={academic.lastClass} onChange={(e) => setAcademic({...academic, lastClass: e.target.value})} />
                  <input type="text" placeholder="Board / Medium (e.g., CBSE English)" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" 
                    value={academic.medium} onChange={(e) => setAcademic({...academic, medium: e.target.value})} />
                </div>
              )}
            </div>
          </div>

          {/* Footer – slim */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-gray-400 text-xs italic">By submitting, you confirm accuracy.</p>
            <button
              type="submit"
              disabled={submitting}
              className={`px-8 py-2.5 rounded-lg font-bold text-sm transition flex items-center gap-2 ${
                submitting ? "bg-gray-300 text-gray-500 cursor-wait" : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {submitting ? "Sending..." : "Submit Enrollment"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}