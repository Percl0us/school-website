import { useState, useEffect, useRef } from "react";
import { FileText, Download, CheckCircle2, Info, ArrowRight } from "lucide-react";
import AdmissionForm from "../components/AdmissionForm/AdmissionForm";
import ProspectusModal from "../components/modal/ProspectusModal";
import prospectusImage from "../assets/images/prospectus.jpg";

// Reusable Scroll Animation Wrapper
const RevealOnScroll = ({ children, delay = "0ms" }) => {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

export default function Admissions() {
  const [showProspectus, setShowProspectus] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Page Header / Hero Area */}
      <section className="bg-blue-900 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <RevealOnScroll>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              Join the <span className="text-blue-400">Legacy</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
              Admissions are now open for the academic session 2026–27 (LKG to XII). 
              Start your journey toward excellence today.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: Process & Info */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* 2. Admission Process */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-1.5 bg-blue-600 rounded-full" />
                <h2 className="text-3xl font-bold text-gray-900">Admission Process</h2>
              </div>
              
              <div className="grid gap-4">
                {[
                  "Fill the online admission enquiry form below.",
                  "Expect a call from our office for parent-student interaction.",
                  "Submit required documents (Birth Cert, Transfer Cert, etc.).",
                  "Final verification and fee submission to confirm seat."
                ].map((step, idx) => (
                  <RevealOnScroll key={idx} delay={`${idx * 100}ms`}>
                    <div className="flex gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 font-medium pt-1">{step}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>

            {/* 3. Fee Structure Table */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-1.5 bg-blue-600 rounded-full" />
                <h2 className="text-3xl font-bold text-gray-900">Fee Structure</h2>
              </div>
              
              <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 font-bold text-gray-900">Class Level</th>
                      <th className="px-6 py-4 font-bold text-gray-900 text-right">Monthly Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { class: "LKG – UKG", fee: "₹ X,XXX" },
                      { class: "Class I – V", fee: "₹ X,XXX" },
                      { class: "Class VI – VIII", fee: "₹ X,XXX" },
                      { class: "Class IX – XII", fee: "₹ X,XXX" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-6 py-4 text-gray-700 font-medium">{row.class}</td>
                        <td className="px-6 py-4 text-blue-600 font-bold text-right">{row.fee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex items-start gap-2 text-gray-500 text-sm italic">
                <Info size={16} className="mt-0.5 text-blue-500" />
                <p>* Fees are subject to change. Transport and laboratory charges are calculated separately based on requirements.</p>
              </div>
            </div>

            {/* 4. Admission Enquiry Form */}
            <div id="enquiry-form">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-1.5 bg-blue-600 rounded-full" />
                <h2 className="text-3xl font-bold text-gray-900">Enquiry Form</h2>
              </div>
              <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-inner">
                <AdmissionForm />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Prospectus & Quick Links */}
          <div className="space-y-8">
            <RevealOnScroll>
              <div className="sticky top-24 space-y-8">
                {/* Prospectus Card */}
                <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform" />
                  
                  <FileText className="mb-6 opacity-80" size={40} />
                  <h3 className="text-2xl font-bold mb-3 text-white">School Prospectus</h3>
                  <p className="text-blue-10/80 mb-8 text-sm leading-relaxed">
                    Download or view our detailed guide on academic philosophy, 
                    campus life, and detailed admission policies.
                  </p>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={() => setShowProspectus(true)}
                      className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                    >
                      View Online <ArrowRight size={18} />
                    </button>
                    <button className="w-full bg-blue-700 text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
                      <Download size={18} /> Download PDF
                    </button>
                  </div>
                </div>

                {/* Quick Help Card */}
                <div className="bg-gray-900 rounded-[2rem] p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                  <p className="text-gray-400 text-sm mb-6">Our admission counselors are here to assist you from 8:00 AM to 2:00 PM.</p>
                  <div className="space-y-2 font-mono text-blue-400 font-bold">
                    <p>+91 88160-00512</p>
                    <p>tagorekalkha@gmail.com</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </section>

      {/* Prospectus Modal */}
      {showProspectus && (
        <ProspectusModal
          image={prospectusImage}
          onClose={() => setShowProspectus(false)}
        />
      )}
    </div>
  );
}