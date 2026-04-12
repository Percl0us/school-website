import { useState, useMemo } from "react";
import {
  FileText,
  Download,
  ArrowRight,
  CheckCircle2,
  Calculator,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react";
import AdmissionForm from "../components/AdmissionForm/AdmissionForm";
import ProspectusModal from "../components/modal/ProspectusModal";
import prospectusImage from "../assets/images/prospectus.jpg";
import { RevealOnScroll } from "../components/RevealOnScroll"; // ✅ shared component

const FEE_DATA = [
  { class: "Nursery", admissionFee: 2000, monthlyFee: 800 },
  { class: "LKG", admissionFee: 2000, monthlyFee: 850 },
  { class: "UKG", admissionFee: 2000, monthlyFee: 900 },
  { class: "1st", admissionFee: 3000, monthlyFee: 950 },
  { class: "2nd", admissionFee: 3000, monthlyFee: 1000 },
  { class: "3rd", admissionFee: 3000, monthlyFee: 1050 },
  { class: "4th", admissionFee: 3000, monthlyFee: 1100 },
  { class: "5th", admissionFee: 3000, monthlyFee: 1150 },
  { class: "6th", admissionFee: 3500, monthlyFee: 1250 },
  { class: "7th", admissionFee: 3500, monthlyFee: 1350 },
  { class: "8th", admissionFee: 3500, monthlyFee: 1450 },
  { class: "9th", admissionFee: 4000, monthlyFee: 1600 },
  { class: "10th", admissionFee: 4000, monthlyFee: 1700 },
  { class: "11th", admissionFee: 4500, monthlyFee: 2250 },
  { class: "12th", admissionFee: 4500, monthlyFee: 2450 },
];

const TRANSPORT_DATA = [
  { route: "SUTANA", fee: 300 },
  { route: "BHADOUR", fee: 350 },
  { route: "BEGAMPUR", fee: 350 },
  { route: "ALUPUR", fee: 350 },
  { route: "NAIN", fee: 350 },
  { route: "BAHUPUR", fee: 350 },
  { route: "WAISERY", fee: 300 },
  { route: "LOHARI", fee: 250 },
  { route: "KALKHA", fee: 200 },
];

export default function Admissions() {
  const [showProspectus, setShowProspectus] = useState(false);
  const [selectedClass, setSelectedClass] = useState("Nursery");
  const [selectedRoute, setSelectedRoute] = useState("KALKHA");

  const { selectedFee, selectedTransport, totalMonthly, firstMonth } =
    useMemo(() => {
      const fee =
        FEE_DATA.find((c) => c.class === selectedClass) || FEE_DATA[0];
      const transport =
        TRANSPORT_DATA.find((r) => r.route === selectedRoute) ||
        TRANSPORT_DATA[0];
      return {
        selectedFee: fee,
        selectedTransport: transport,
        totalMonthly: fee.monthlyFee + transport.fee,
        firstMonth: fee.admissionFee + fee.monthlyFee + transport.fee,
      };
    }, [selectedClass, selectedRoute]);

  return (
    <div className="overflow-x-hidden scroll-smooth bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 min-h-screen font-sans text-slate-900 antialiased">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-16 sm:py-20 text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl animate-bounce" style={{ animationDuration: "8s" }} />
          <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-2xl animate-spin-slow" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-500/20 px-4 py-1.5 backdrop-blur-md mb-6">
              <Sparkles size={14} className="text-yellow-300 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-yellow-100">
                Admissions 2026-27
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Education for <span className="text-indigo-300">Tomorrow</span>.
            </h1>
            <p className="text-indigo-100 mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg leading-relaxed font-light">
              We simplify the path to enrollment. Explore our transparent fee
              structure and take the first step toward academic excellence.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Main content */}
          <div className="lg:col-span-8 space-y-12 sm:space-y-16">
            {/* 1. Admission Guidelines */}
            <section>
              <RevealOnScroll>
                <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 mb-6 sm:mb-8">
                  <CheckCircle2 size={24} className="text-indigo-600" />
                  Enrollment Process
                </h2>
              </RevealOnScroll>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  "Submit Online Inquiry Form",
                  "Parent-Student Interaction",
                  "Document Submission",
                  "Seat Allotment & Fee Deposit",
                ].map((step, i) => (
                  <RevealOnScroll key={i} delay={`${i * 100}ms`}>
                    <div className="group flex items-center gap-4 p-4 sm:p-5 border border-slate-200 bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        {i + 1}
                      </span>
                      <p className="text-sm sm:text-[17px] font-semibold text-slate-700">
                        {step}
                      </p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </section>

            {/* 2. Fee Calculator */}
            <RevealOnScroll>
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-5 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                  <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                    <Calculator size={24} className="text-indigo-600" />
                    Fee Calculator
                  </h2>
                </div>

                <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {/* Inputs */}
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                        Select Student Class
                      </label>
                      <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-base sm:text-lg font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                      >
                        {FEE_DATA.map((f) => (
                          <option key={f.class}>{f.class}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">
                        Transport Route
                      </label>
                      <select
                        value={selectedRoute}
                        onChange={(e) => setSelectedRoute(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-base sm:text-lg font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                      >
                        {TRANSPORT_DATA.map((t) => (
                          <option key={t.route}>{t.route}</option>
                        ))}
                      </select>
                    </div>

                    <div className="pt-5 space-y-3 border-t border-slate-100">
                      <div className="flex justify-between text-sm sm:text-base text-slate-500">
                        <span>One-time Admission Fee</span>
                        <span className="font-semibold text-slate-700">
                          ₹{selectedFee.admissionFee}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm sm:text-base text-slate-500">
                        <span>Monthly Fee Component</span>
                        <span className="font-semibold text-slate-700">
                          ₹{selectedFee.monthlyFee}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm sm:text-base text-slate-500">
                        <span>Route Fare (Monthly)</span>
                        <span className="font-semibold text-slate-700">
                          ₹{selectedTransport.fee}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl p-6 md:p-8 flex flex-col justify-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full translate-x-10 -translate-y-10 animate-pulse" />
                    <div className="mb-6 md:mb-8 relative z-10">
                      <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest">
                        Monthly Commitment
                      </span>
                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                        ₹{totalMonthly.toLocaleString()}
                      </div>
                    </div>
                    <div className="pt-6 md:pt-8 border-t border-white/10 relative z-10">
                      <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest">
                        Total at Admission
                      </span>
                      <div className="text-3xl sm:text-4xl md:text-5xl font-black text-indigo-400 tracking-tighter">
                        ₹{firstMonth.toLocaleString()}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
                        Includes admission fee and the first month's full payment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* 3. Inquiry Form */}
            <section id="inquiry">
              <RevealOnScroll>
                <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-8 flex items-center gap-3">
                  <Sparkles size={24} className="text-indigo-600" />
                  Inquiry & Registration
                </h2>
              </RevealOnScroll>
              <RevealOnScroll>
                <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <AdmissionForm />
                </div>
              </RevealOnScroll>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 md:space-y-8">
            {/* <RevealOnScroll>
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-all group">
                <FileText className="text-indigo-200 mb-5" size={32} />
                <h3 className="text-xl font-bold mb-3">2026 Prospectus</h3>
                <p className="text-indigo-100/80 text-base leading-relaxed mb-6">
                  Download our comprehensive guide to academic programs and campus life.
                </p>
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowProspectus(true)}
                    className="w-full bg-white text-indigo-700 text-base font-bold py-3 rounded-xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl group-hover:scale-105 transition-transform"
                  >
                    View Online <ArrowRight size={18} />
                  </button>
                  <button className="w-full bg-indigo-700 text-white text-base font-bold py-3 rounded-xl hover:bg-indigo-800 transition-all flex items-center justify-center gap-3">
                    <Download size={18} /> Download PDF
                  </button>
                </div>
              </div>
            </RevealOnScroll> */}

            <RevealOnScroll delay="200ms">
              <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 bg-white hover:shadow-lg transition-all">
                <h3 className="font-bold text-lg mb-5 sm:mb-6 flex items-center gap-2">
                  <Phone size={20} className="text-indigo-600" />
                  Need Assistance?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-slate-700 flex-wrap">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-indigo-600 shrink-0">
                      <Phone size={18} />
                    </div>
                    <span className="text-base sm:text-lg font-semibold break-all">+91 88160-00512</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-700 flex-wrap">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-indigo-600 shrink-0">
                      <Mail size={18} />
                    </div>
                    <span className="text-sm sm:text-base font-medium break-all">tagorekalkha@gmail.com</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-6 sm:mt-8 border-t pt-5 sm:pt-6">
                  Our support desk is active Monday — Saturday, 08:00 AM to 02:00 PM.
                </p>
              </div>
            </RevealOnScroll>
          </aside>
        </div>
      </main>

      {showProspectus && (
        <ProspectusModal
          image={prospectusImage}
          onClose={() => setShowProspectus(false)}
        />
      )}
    </div>
  );
}