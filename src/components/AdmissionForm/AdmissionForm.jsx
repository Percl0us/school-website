import { useState, useEffect, useRef } from "react";
import { Send, CheckCircle, AlertCircle, Loader2, Sparkles, User, GraduationCap, MapPin, Phone, Mail, Calendar } from "lucide-react";

const ADMISSIONS_API_URL = "https://script.google.com/macros/s/AKfycbwR_NnQYKtotEjMdhnomRUBQpSwyn1GvmQkb93hs_gD88i1LUgHIaqTkHXxlMmPXk9z6Q/exec";

// Scroll Reveal Wrapper (consistent with other pages)
const RevealOnScroll = ({ children, delay = "0ms", className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`transform transition-all duration-1000 ${className} ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-12 opacity-0 scale-95"
      }`}
    >
      {children}
    </div>
  );
};

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
        <RevealOnScroll>
          <div className="flex items-center gap-3 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 text-red-800 px-5 py-4 rounded-xl mb-6 text-sm shadow-sm">
            <AlertCircle size={20} className="text-red-500" />
            <span className="font-medium">{error}</span>
          </div>
        </RevealOnScroll>
      )}

      {submitted ? (
        <RevealOnScroll>
          <div className="bg-gradient-to-br from-white to-green-50 border border-green-100 p-8 rounded-3xl text-center shadow-xl">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
              <CheckCircle size={36} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent mb-2">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you. Our admissions coordinator will contact you at <span className="font-semibold text-green-700">{parent.phone}</span>.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all hover:scale-105"
            >
              Submit Another Application
            </button>
          </div>
        </RevealOnScroll>
      ) : (
        <RevealOnScroll>
          <form className="bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden" onSubmit={handleSubmit}>
            {/* Form Header with gradient */}
            <div className="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 px-6 py-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <Sparkles size={80} className="absolute top-2 right-2" />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-500/20 px-3 py-1 backdrop-blur-sm mb-3">
                  <Sparkles size={12} className="text-yellow-300" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Admissions Open 2026-27</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Student Enrollment</h2>
                <p className="text-indigo-200 text-sm mt-1">Fill the form below to begin your journey with us</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Student & Guardian Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                    <User size={14} className="text-blue-600" /> Student Details
                  </h3>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Full name *" 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" 
                      value={student.name} 
                      onChange={(e) => setStudent({...student, name: e.target.value})} 
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <select 
                        value={student.gender} 
                        onChange={(e) => setStudent({...student, gender: e.target.value})} 
                        className="px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:border-blue-500"
                      >
                        <option value="">Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="date" 
                          className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm" 
                          value={student.dob} 
                          onChange={(e) => setStudent({...student, dob: e.target.value})} 
                        />
                      </div>
                    </div>
                    <select 
                      value={student.classApplying} 
                      onChange={(e) => setStudent({...student, classApplying: e.target.value})} 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:border-blue-500"
                    >
                      <option value="">Class applying *</option>
                      {["LKG","UKG","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Guardian Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                    <Phone size={14} className="text-blue-600" /> Guardian Details
                  </h3>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Father's name" 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-blue-500" 
                      value={parent.fatherName} 
                      onChange={(e) => setParent({...parent, fatherName: e.target.value})} 
                    />
                    <input 
                      type="text" 
                      placeholder="Mother's name" 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" 
                      value={parent.motherName} 
                      onChange={(e) => setParent({...parent, motherName: e.target.value})} 
                    />
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="tel" 
                        placeholder="Phone number *" 
                        className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm" 
                        value={parent.phone} 
                        onChange={(e) => setParent({...parent, phone: e.target.value})} 
                      />
                    </div>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="email" 
                        placeholder="Email address" 
                        className="w-full pl-9 pr-3 py-3 border border-gray-200 rounded-xl text-sm" 
                        value={parent.email} 
                        onChange={(e) => setParent({...parent, email: e.target.value})} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address + Academic */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                    <MapPin size={14} className="text-blue-600" /> Address
                  </h3>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="City / Village" 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" 
                      value={address.city} 
                      onChange={(e) => setAddress({...address, city: e.target.value})} 
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        placeholder="State" 
                        className="px-4 py-3 border border-gray-200 rounded-xl text-sm" 
                        value={address.state} 
                        onChange={(e) => setAddress({...address, state: e.target.value})} 
                      />
                      <input 
                        type="text" 
                        placeholder="Pincode" 
                        className="px-4 py-3 border border-gray-200 rounded-xl text-sm" 
                        value={address.pincode} 
                        onChange={(e) => setAddress({...address, pincode: e.target.value})} 
                      />
                    </div>
                  </div>
                </div>

                {/* Previous School (conditional) */}
                {showAcademicSection && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1 h-5 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                      <GraduationCap size={14} className="text-blue-600" /> Previous School
                    </h3>
                    <div className="space-y-3">
                      <input 
                        type="text" 
                        placeholder="Last class/grade" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" 
                        value={academic.lastClass} 
                        onChange={(e) => setAcademic({...academic, lastClass: e.target.value})} 
                      />
                      <input 
                        type="text" 
                        placeholder="Board / Medium (e.g., CBSE English)" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" 
                        value={academic.medium} 
                        onChange={(e) => setAcademic({...academic, medium: e.target.value})} 
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Form Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-indigo-50 border-t border-gray-200 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-xs flex items-center gap-1">
                <Sparkles size={12} className="text-blue-500" />
                By submitting, you confirm that the information is accurate.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-md ${
                  submitting 
                    ? "bg-gray-400 text-white cursor-wait" 
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105 active:scale-95"
                }`}
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {submitting ? "Submitting..." : "Submit Enrollment"}
              </button>
            </div>
          </form>
        </RevealOnScroll>
      )}
    </div>
  );
}