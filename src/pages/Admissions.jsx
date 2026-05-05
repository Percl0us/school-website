import { useState } from "react";
import {
  FileText,
  Download,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react";
import AdmissionForm from "../components/AdmissionForm/AdmissionForm";
import ProspectusModal from "../components/modal/ProspectusModal";
import prospectusImage from "../assets/images/prospectus.jpg";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { FloatingImageField } from "../components/shared/FloatingImageField";
import { pageImageMosaics } from "../data/pageImageMosaics";

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

  return (
    <div className="overflow-x-hidden scroll-smooth bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 min-h-screen font-body text-slate-900 antialiased">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-16 sm:py-20 text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
          <div
            className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl animate-bounce"
            style={{ animationDuration: "8s" }}
          />
          <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-2xl animate-spin-slow" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-500/20 px-4 py-2 backdrop-blur-md mb-6">
              <Sparkles size={14} className="text-yellow-300 animate-pulse" />
              <span className="font-dyna text-xs font-bold uppercase tracking-widest text-yellow-100 pb-0.5">
                Admissions 2026-27
              </span>
            </div>
            <h1 className="font-henny text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.2] pb-2">
              Education for <span className="text-indigo-300">Tomorrow</span>.
            </h1>
            <p className="font-indie text-indigo-100 mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg leading-relaxed pb-1">
              From the first enquiry to the first school day, we want the admission
              journey to feel welcoming, clear, and exciting for every family.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <div className="relative isolate">
        <FloatingImageField {...pageImageMosaics.admissions} />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-8 space-y-12 sm:space-y-16">
              <section>
                <RevealOnScroll>
                  <h2 className="font-dyna text-xl sm:text-2xl font-bold flex items-center gap-3 mb-6 sm:mb-8 pb-1">
                    <CheckCircle2 size={24} className="text-indigo-600" />
                    Enrollment Process
                  </h2>
                </RevealOnScroll>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {[
                    "Send Your Enquiry",
                    "Friendly Parent-Student Interaction",
                    "Complete the Required Documents",
                    "Confirm Admission and Begin the Journey",
                  ].map((step, i) => (
                    <RevealOnScroll key={i} delay={`${i * 100}ms`}>
                      <div className="group flex items-center gap-4 p-4 sm:p-5 border border-slate-200 bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          {i + 1}
                        </span>
                        <p className="font-indie text-sm sm:text-[17px] font-semibold text-slate-700 pb-0.5">
                          {step}
                        </p>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </section>

              <RevealOnScroll>
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-5 sm:p-8 border-b border-slate-100 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
                    <h2 className="font-dyna text-xl sm:text-2xl font-bold pb-1">
                      Fee Structure
                    </h2>
                  </div>

                  <div className="p-5 sm:p-8 space-y-8">
                    <div className="overflow-x-auto rounded-2xl border border-slate-200">
                      <table className="w-full min-w-[520px] text-left">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="px-4 py-4 font-dyna text-xs uppercase tracking-wider text-slate-500">
                              Class
                            </th>
                            <th className="px-4 py-4 font-dyna text-xs uppercase tracking-wider text-slate-500">
                              Admission Fee
                            </th>
                            <th className="px-4 py-4 font-dyna text-xs uppercase tracking-wider text-slate-500">
                              Monthly Fee
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {FEE_DATA.map((fee) => (
                            <tr key={fee.class} className="bg-white">
                              <td className="px-4 py-4 font-dyna text-slate-800 pb-0.5">
                                {fee.class}
                              </td>
                              <td className="px-4 py-4 font-indie text-slate-600 pb-0.5">
                                Rs. {fee.admissionFee}
                              </td>
                              <td className="px-4 py-4 font-indie text-slate-600 pb-0.5">
                                Rs. {fee.monthlyFee}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                      <div className="overflow-x-auto rounded-2xl border border-slate-200">
                        <table className="w-full min-w-[320px] text-left">
                          <thead className="bg-slate-50">
                            <tr>
                              <th className="px-4 py-4 font-dyna text-xs uppercase tracking-wider text-slate-500">
                                Transport Route
                              </th>
                              <th className="px-4 py-4 font-dyna text-xs uppercase tracking-wider text-slate-500">
                                Monthly Fare
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {TRANSPORT_DATA.map((route) => (
                              <tr key={route.route} className="bg-white">
                                <td className="px-4 py-4 font-dyna text-slate-800 pb-0.5">
                                  {route.route}
                                </td>
                                <td className="px-4 py-4 font-indie text-slate-600 pb-0.5">
                                  Rs. {route.fee}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full translate-x-10 -translate-y-10 animate-pulse" />
                        <div className="relative z-10 space-y-5">
                          <div>
                            <p className="font-dyna text-indigo-300 text-xs font-bold uppercase tracking-widest pb-0.5">
                              Fee Note
                            </p>
                            <p className="font-indie mt-3 text-sm sm:text-base text-slate-200 leading-relaxed pb-0.5">
                              Total payable at admission = admission fee + first month fee + transport fare if selected.
                            </p>
                          </div>
                          <div className="border-t border-white/10 pt-5">
                            <p className="font-dyna text-indigo-300 text-xs font-bold uppercase tracking-widest pb-0.5">
                              Example
                            </p>
                            <p className="font-indie mt-3 text-sm sm:text-base text-slate-200 leading-relaxed pb-0.5">
                              If a student takes admission in Class 1st and also uses a route with Rs. 300 transport fare, the first payment will be Rs. 4,250.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              <section id="inquiry">
                <RevealOnScroll>
                  <h2 className="font-dyna text-xl sm:text-2xl font-bold mb-5 sm:mb-8 flex items-center gap-3 pb-1">
                    <Sparkles size={24} className="text-indigo-600" />
                    Enquiry & Registration
                  </h2>
                </RevealOnScroll>
                <RevealOnScroll>
                  <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <AdmissionForm />
                  </div>
                </RevealOnScroll>
              </section>
            </div>

            <aside className="lg:col-span-4 space-y-6 md:space-y-8">
              {/* <RevealOnScroll>
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-all group">
                  <FileText className="text-indigo-200 mb-5" size={32} />
                  <h3 className="font-henny text-xl font-bold mb-3 pb-1">2026 Prospectus</h3>
                  <p className="font-indie text-indigo-100/80 text-base leading-relaxed mb-6 pb-0.5">
                    Download our comprehensive guide to academic programs and campus life.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowProspectus(true)}
                      className="font-dyna w-full bg-white text-indigo-700 text-base font-bold py-3 rounded-xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl group-hover:scale-105 transition-transform"
                    >
                      View Online <ArrowRight size={18} />
                    </button>
                    <button className="font-dyna w-full bg-indigo-700 text-white text-base font-bold py-3 rounded-xl hover:bg-indigo-800 transition-all flex items-center justify-center gap-3">
                      <Download size={18} /> Download PDF
                    </button>
                  </div>
                </div>
              </RevealOnScroll> */}

              <RevealOnScroll delay="200ms">
                <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 bg-white hover:shadow-lg transition-all">
                  <h3 className="font-dyna font-bold text-lg mb-5 sm:mb-6 flex items-center gap-2 pb-1">
                    <Phone size={20} className="text-indigo-600" />
                    Need Assistance?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-slate-700 flex-wrap">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-indigo-600 shrink-0">
                        <Phone size={18} />
                      </div>
                      <span className="font-dyna text-base sm:text-lg font-semibold break-all pb-0.5">
                        +91 88160-00512
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-700 flex-wrap">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-indigo-600 shrink-0">
                        <Mail size={18} />
                      </div>
                      <span className="font-indie text-sm sm:text-base font-medium break-all pb-0.5">
                        tagorekalkha@gmail.com
                      </span>
                    </div>
                  </div>
                  <p className="font-indie text-xs sm:text-sm text-slate-400 mt-6 sm:mt-8 border-t pt-5 sm:pt-6 pb-0.5">
                    Our support desk is active Monday - Saturday, 08:00 AM to 02:00 PM.
                  </p>
                </div>
              </RevealOnScroll>
            </aside>
          </div>
        </main>
      </div>

      {showProspectus && (
        <ProspectusModal
          image={prospectusImage}
          onClose={() => setShowProspectus(false)}
        />
      )}
    </div>
  );
}
