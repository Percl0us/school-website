import { useState } from "react";
import { User, Users, MapPin, BookOpen, Send, CheckCircle, AlertCircle } from "lucide-react";

const ADMISSIONS_API_URL = "https://script.google.com/macros/s/AKfycbwR_NnQYKtotEjMdhnomRUBQpSwyn1GvmQkb93hs_gD88i1LUgHIaqTkHXxlMmPXk9z6Q/exec";

function Spinner() {
  return (
    <span className="inline-block h-5 w-5 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
  );
}

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

    if (!student.name.trim()) return setError("Please enter the student’s name.");
    if (!student.classApplying) return setError("Please select the class for admission.");
    if (!parent.phone.trim()) return setError("Please enter a contact number.");

    setSubmitting(true);

    const payload = {
      studentName: student.name,
      ...student, ...parent, ...address, ...academic
    };

    try {
      await fetch(ADMISSIONS_API_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      setSubmitted(true);
    } catch {
      setError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const showAcademicSection = !["LKG", "UKG", ""].includes(student.classApplying);

  // Reusable Input Component for cleaner code
  const FormInput = ({ label, value, onChange, type = "text", placeholder }) => (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50/50 hover:bg-white"
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success/Error Toasts */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl mb-8 animate-in slide-in-from-top-4">
          <AlertCircle size={20} />
          <p className="font-bold">{error}</p>
        </div>
      )}

      {submitted && (
        <div className="bg-blue-600 text-white p-8 rounded-[2rem] mb-10 text-center shadow-xl shadow-blue-200 animate-in zoom-in-95">
          <CheckCircle size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-black mb-2">Enquiry Received!</h2>
          <p className="text-blue-100">Our office will contact you shortly regarding the next steps.</p>
        </div>
      )}

      {!submitted && (
        <form className="space-y-12 bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-2xl" onSubmit={handleSubmit}>
          
          {/* Section 1: Student */}
          <section className="space-y-8">
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl"><User size={24} /></div>
              <h3 className="text-2xl font-black text-gray-900">Student Details</h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <FormInput label="Full Name" value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} />
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Gender</label>
                <select 
                  value={student.gender} 
                  onChange={(e) => setStudent({ ...student, gender: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none bg-gray-50/50"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <FormInput label="Date of Birth" type="date" value={student.dob} onChange={(e) => setStudent({ ...student, dob: e.target.value })} />
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Applying For</label>
                <select 
                  value={student.classApplying} 
                  onChange={(e) => setStudent({ ...student, classApplying: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none bg-gray-50/50"
                >
                  <option value="">Select Class</option>
                  {["LKG", "UKG", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"].map(c => (
                    <option key={c} value={c}>{c === "LKG" || c === "UKG" ? c : `Class ${c}`}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Section 2: Parents */}
          <section className="space-y-8">
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl"><Users size={24} /></div>
              <h3 className="text-2xl font-black text-gray-900">Parent / Guardian</h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <FormInput label="Father's Name" value={parent.fatherName} onChange={(e) => setParent({ ...parent, fatherName: e.target.value })} />
              <FormInput label="Mother's Name" value={parent.motherName} onChange={(e) => setParent({ ...parent, motherName: e.target.value })} />
              <FormInput label="Contact Number" type="tel" value={parent.phone} onChange={(e) => setParent({ ...parent, phone: e.target.value })} />
              <FormInput label="Email Address" type="email" value={parent.email} onChange={(e) => setParent({ ...parent, email: e.target.value })} />
            </div>
          </section>

          {/* Section 3: Address */}
          <section className="space-y-8">
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl"><MapPin size={24} /></div>
              <h3 className="text-2xl font-black text-gray-900">Address Details</h3>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <FormInput label="City / Village" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
              <FormInput label="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
              <FormInput label="Pin Code" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
            </div>
          </section>

          {/* Section 4: Academic (Conditional) */}
          {showAcademicSection && (
            <section className="space-y-8 animate-in slide-in-from-left-4 duration-500">
              <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl"><BookOpen size={24} /></div>
                <h3 className="text-2xl font-black text-gray-900">Academic Background</h3>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <FormInput label="Last Class" value={academic.lastClass} onChange={(e) => setAcademic({ ...academic, lastClass: e.target.value })} />
                <FormInput label="Board" value={academic.board} onChange={(e) => setAcademic({ ...academic, board: e.target.value })} />
                <FormInput label="Medium" value={academic.medium} onChange={(e) => setAcademic({ ...academic, medium: e.target.value })} />
              </div>
            </section>
          )}

          {/* Submit */}
          <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-500 text-sm max-w-sm">
              By submitting, you agree to receive follow-up communication from Tagore Public School office.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className={`w-full md:w-auto px-10 py-4 rounded-2xl font-black text-white transition-all flex items-center gap-3 justify-center ${
                submitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 active:scale-95"
              }`}
            >
              {submitting ? <Spinner /> : <Send size={20} />}
              {submitting ? "Processing..." : "Submit Enquiry"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}