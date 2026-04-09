import { useState } from "react";
import { User, Users, MapPin, BookOpen, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

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

  const FormField = ({ label, children, required = false }) => (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] ml-0.5">
        {label} {required && <span className="text-indigo-500">*</span>}
      </label>
      {children}
    </div>
  );

  const inputBase = "w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-[15px] transition-all outline-none placeholder:text-slate-300 shadow-sm";
  const inputFocus = "focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/5";

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border-l-4 border-red-500 text-red-800 px-6 py-4 rounded-r-lg mb-8 shadow-sm">
          <AlertCircle size={20} className="text-red-500" />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      {submitted ? (
        <div className="bg-white border border-slate-200 p-12 rounded-3xl text-center shadow-xl max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <CheckCircle size={40} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Application Submitted</h2>
          <p className="text-slate-500 text-lg leading-relaxed mb-10">
            Thank you for your interest. Our admissions coordinator will review the details and contact you at <span className="text-slate-900 font-semibold">{parent.phone}</span>.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
          >
            Submit Another Entry
          </button>
        </div>
      ) : (
        <form className="bg-white border border-slate-200 rounded-[2rem] shadow-2xl overflow-hidden" onSubmit={handleSubmit}>
          
          {/* Header Section */}
          <div className="bg-slate-900 p-10 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
            <h2 className="text-3xl font-bold tracking-tight">Student Enrollment</h2>
            <p className="text-indigo-300 font-medium mt-2 text-sm uppercase tracking-widest">Academic Year 2026-2027</p>
          </div>

          <div className="p-8 md:p-14 space-y-16">
            
            {/* Section 1: Student */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-indigo-600 rounded-full" />
                <h3 className="text-xl font-bold text-slate-900">1. Student Information</h3>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <FormField label="Legal Full Name" required>
                  <input type="text" className={`${inputBase} ${inputFocus}`} placeholder="As per birth certificate" value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} />
                </FormField>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="Gender">
                    <select value={student.gender} onChange={(e) => setStudent({ ...student, gender: e.target.value })} className={`${inputBase} ${inputFocus}`}>
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </FormField>
                  <FormField label="Date of Birth">
                    <input type="date" className={`${inputBase} ${inputFocus}`} value={student.dob} onChange={(e) => setStudent({ ...student, dob: e.target.value })} />
                  </FormField>
                </div>
                <FormField label="Class Applying For" required>
                  <select value={student.classApplying} onChange={(e) => setStudent({ ...student, classApplying: e.target.value })} className={`${inputBase} ${inputFocus} font-semibold`}>
                    <option value="">Select Grade</option>
                    {["LKG", "UKG", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"].map(c => (
                      <option key={c} value={c}>{c.includes('G') ? c : `Grade ${c}`}</option>
                    ))}
                  </select>
                </FormField>
              </div>
            </section>

            {/* Section 2: Parents */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-indigo-600 rounded-full" />
                <h3 className="text-xl font-bold text-slate-900">2. Guardian Details</h3>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <FormField label="Father's Name">
                  <input type="text" className={`${inputBase} ${inputFocus}`} value={parent.fatherName} onChange={(e) => setParent({ ...parent, fatherName: e.target.value })} />
                </FormField>
                <FormField label="Mother's Name">
                  <input type="text" className={`${inputBase} ${inputFocus}`} value={parent.motherName} onChange={(e) => setParent({ ...parent, motherName: e.target.value })} />
                </FormField>
                <FormField label="Primary Contact Number" required>
                  <input type="tel" className={`${inputBase} ${inputFocus} font-mono`} placeholder="+91" value={parent.phone} onChange={(e) => setParent({ ...parent, phone: e.target.value })} />
                </FormField>
                <FormField label="Email Address">
                  <input type="email" className={`${inputBase} ${inputFocus}`} placeholder="name@example.com" value={parent.email} onChange={(e) => setParent({ ...parent, email: e.target.value })} />
                </FormField>
              </div>
            </section>

            {/* Section 3: Address & Academic */}
            <div className="grid md:grid-cols-2 gap-16">
              <section className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-8 bg-indigo-600 rounded-full" />
                  <h3 className="text-xl font-bold text-slate-900">3. Residency</h3>
                </div>
                <div className="space-y-5">
                  <FormField label="City / Village">
                    <input type="text" className={`${inputBase} ${inputFocus}`} value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                  </FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="State">
                      <input type="text" className={`${inputBase} ${inputFocus}`} value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                    </FormField>
                    <FormField label="Pincode">
                      <input type="text" className={`${inputBase} ${inputFocus}`} value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
                    </FormField>
                  </div>
                </div>
              </section>

              {showAcademicSection && (
                <section className="space-y-8 animate-in fade-in duration-500">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-8 bg-indigo-600 rounded-full" />
                    <h3 className="text-xl font-bold text-slate-900">4. History</h3>
                  </div>
                  <div className="space-y-5">
                    <FormField label="Previous Grade">
                      <input type="text" className={`${inputBase} ${inputFocus}`} value={academic.lastClass} onChange={(e) => setAcademic({ ...academic, lastClass: e.target.value })} />
                    </FormField>
                    <FormField label="Board / Medium">
                      <input type="text" className={`${inputBase} ${inputFocus}`} placeholder="e.g. CBSE / English" value={academic.medium} onChange={(e) => setAcademic({ ...academic, medium: e.target.value })} />
                    </FormField>
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-slate-50 border-t border-slate-200 p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xs">
              <p className="text-slate-400 text-xs font-medium leading-relaxed italic">
                By submitting this form, you certify that the provided information is accurate to the best of your knowledge.
              </p>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={`w-full md:w-auto px-14 py-4 rounded-xl font-bold text-base tracking-wide transition-all flex items-center gap-4 justify-center shadow-xl ${
                submitting 
                  ? "bg-slate-300 cursor-wait text-slate-500 shadow-none" 
                  : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.97] shadow-indigo-200"
              }`}
            >
              {submitting ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              {submitting ? "PROCESSING" : "SUBMIT ENROLLMENT"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}