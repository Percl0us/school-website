import { useState, useMemo } from "react";
import {
  FileText,
  Download,
  Info,
  ArrowRight,
  CheckCircle2,
  Calculator,
  Phone,
  Mail,
} from "lucide-react";
import AdmissionForm from "../components/AdmissionForm/AdmissionForm";
import ProspectusModal from "../components/modal/ProspectusModal";
import prospectusImage from "../assets/images/prospectus.jpg";

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

  const { selectedFee, selectedTransport, totalMonthly, firstMonth } = useMemo(() => {
    const fee = FEE_DATA.find((c) => c.class === selectedClass) || FEE_DATA[0];
    const transport = TRANSPORT_DATA.find((r) => r.route === selectedRoute) || TRANSPORT_DATA[0];
    return {
      selectedFee: fee,
      selectedTransport: transport,
      totalMonthly: fee.monthlyFee + transport.fee,
      firstMonth: fee.admissionFee + fee.monthlyFee + transport.fee,
    };
  }, [selectedClass, selectedRoute]);

  return (
    <div className="bg-[#fcfcfd] min-h-screen font-sans text-slate-900 antialiased">
      {/* Refined Hero */}
      <section className="bg-[#1a1c2e] py-20 text-white border-b border-indigo-500/20">
        <div className="max-w-6xl mx-auto px-6">
          <span className="text-indigo-400 font-bold tracking-[0.2em] text-sm uppercase">Admissions 2026-27</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 tracking-tight leading-tight">
            Education for <span className="text-indigo-400">Tomorrow</span>.
          </h1>
          <p className="text-slate-400 mt-6 max-w-2xl text-lg leading-relaxed font-light">
            We simplify the path to enrollment. Explore our transparent fee structure and take the first step toward academic excellence.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-16">
            
            {/* 1. Admission Guidelines */}
            <section>
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-8 text-slate-800">
                <CheckCircle2 size={24} className="text-indigo-600" />
                Enrollment Process
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  "Submit Online Inquiry Form",
                  "Parent-Student Interaction",
                  "Document Submission",
                  "Seat Allotment & Fee Deposit"
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 border border-slate-200 bg-white rounded-xl shadow-sm">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <p className="text-[17px] font-semibold text-slate-700">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Professional Fee Calculator */}
            <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Calculator size={24} className="text-indigo-600" />
                  Fee Calculator
                </h2>
                <div className="hidden sm:block text-slate-400 text-sm italic">
                  Instant estimate for selected grades
                </div>
              </div>
              
              <div className="p-8 grid md:grid-cols-2 gap-12">
                {/* Inputs & Breakdown */}
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">Select Student Class</label>
                    <select 
                      value={selectedClass} 
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-lg font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                    >
                      {FEE_DATA.map(f => <option key={f.class}>{f.class}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wide">Transport Route</label>
                    <select 
                      value={selectedRoute} 
                      onChange={(e) => setSelectedRoute(e.target.value)}
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-lg font-medium focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                    >
                      {TRANSPORT_DATA.map(t => <option key={t.route}>{t.route}</option>)}
                    </select>
                  </div>
                  
                  <div className="pt-6 space-y-3 border-t border-slate-100">
                    <div className="flex justify-between text-base text-slate-500">
                      <span>One-time Admission Fee</span>
                      <span className="font-semibold text-slate-700">₹{selectedFee.admissionFee}</span>
                    </div>
                    <div className="flex justify-between text-base text-slate-500">
                      <span>Monthly Fee Component</span>
                      <span className="font-semibold text-slate-700">₹{selectedFee.monthlyFee}</span>
                    </div>
                    <div className="flex justify-between text-base text-slate-500">
                      <span>Route Fare (Monthly)</span>
                      <span className="font-semibold text-slate-700">₹{selectedTransport.fee}</span>
                    </div>
                  </div>
                </div>

                {/* Totals Summary */}
                <div className="bg-slate-900 rounded-2xl p-8 flex flex-col justify-center text-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full translate-x-10 -translate-y-10" />
                   
                  <div className="mb-8 relative z-10">
                    <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest">Monthly Commitment</span>
                    <div className="text-4xl font-bold tracking-tight">₹{totalMonthly.toLocaleString()}</div>
                  </div>
                  <div className="pt-8 border-t border-white/10 relative z-10">
                    <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest">Total at Admission</span>
                    <div className="text-5xl font-black text-indigo-400 tracking-tighter">₹{firstMonth.toLocaleString()}</div>
                    <p className="text-sm text-slate-400 mt-3 leading-relaxed">Includes admission fee and the first month's full payment.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Inquiry Form Area */}
            <section id="inquiry">
              <h2 className="text-2xl font-bold mb-8 text-slate-800">Inquiry & Registration</h2>
              <div className="bg-white rounded-2xl p-10 border border-slate-200 shadow-sm">
                <AdmissionForm />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Prospectus Card */}
            <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-xl shadow-indigo-100 group">
              <FileText className="text-indigo-200 mb-6" size={32} />
              <h3 className="text-xl font-bold mb-3">2026 Prospectus</h3>
              <p className="text-indigo-100/80 text-base leading-relaxed mb-8">
                Download our comprehensive guide to academic programs and campus life.
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowProspectus(true)}
                  className="w-full bg-white text-indigo-600 text-base font-bold py-4 rounded-xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-3 shadow-lg shadow-black/10"
                >
                  View Online <ArrowRight size={18} />
                </button>
                <button className="w-full bg-indigo-700 text-white text-base font-bold py-4 rounded-xl hover:bg-indigo-800 transition-all flex items-center justify-center gap-3">
                  <Download size={18} /> Download PDF
                </button>
              </div>
            </div>

            {/* Assistance Card */}
            <div className="border border-slate-200 rounded-2xl p-8 bg-white">
              <h3 className="font-bold text-lg mb-6">Need Assistance?</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-indigo-600">
                    <Phone size={18} />
                  </div>
                  <span className="text-lg font-semibold">+91 88160-00512</span>
                </div>
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-indigo-600">
                    <Mail size={18} />
                  </div>
                  <span className="text-base font-medium">tagorekalkha@gmail.com</span>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-8 border-t pt-6">
                Our support desk is active Monday — Saturday, 08:00 AM to 02:00 PM.
              </p>
            </div>
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