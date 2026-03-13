import { useState } from "react";
import subjects from "../data/subjects";
import {
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  ArrowRight,
  Eye,
  X,
} from "lucide-react";

export default function Academics() {
  // State to manage the active image for the lightbox
  const [activeImage, setActiveImage] = useState(null);

  const categoryTitles = {
    prePrimary: "Pre-Primary (LKG - UKG)",
    primary: "Primary (Class I - V)",
    middle: "Middle (Class VI - VIII)",
    secondary: "Secondary (Class IX - X)",
    seniorSecondary: "Senior Secondary (Class XI - XII)",
  };

  const syllabusData = [
    { label: "Pre-Primary", links: ["LKG", "UKG"] },
    { label: "Primary", links: ["Class I", "Class II", "Class III", "Class IV", "Class V"] },
    { label: "Middle", links: ["Class VI", "Class VII", "Class VIII"] },
    { label: "Secondary", links: ["Class IX", "Class X"] },
    { label: "Senior Secondary", links: ["Class XI", "Class XII"] },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 space-y-24 bg-white">
      {/* Page Header */}
      <div className="relative p-10 rounded-[2rem] bg-gradient-to-br from-blue-900 to-blue-700 text-white overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Academic Excellence</h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Tagore Public School follows a well-structured academic program designed
            to promote conceptual understanding and overall development under the 
            Haryana Board of School Education (HBSE).
          </p>
        </div>
        <div className="absolute top-[-10%] right-[-10%] opacity-10 text-white">
          <GraduationCap size={300} />
        </div>
      </div>

      {/* Curriculum & Classes Info */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl border border-gray-100 shadow-sm bg-white hover:border-blue-200 transition-colors">
          <div className="flex items-center gap-3 mb-6 text-blue-700">
            <BookOpen size={28} />
            <h2 className="text-2xl font-bold">Our Curriculum</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            As an <span className="font-semibold text-gray-900">HBSE affiliated</span> institution, 
            our curriculum is designed to balance rigorous academics with practical 
            application, ensuring students meet state standards while fostering creativity.
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-gray-100 shadow-sm bg-white">
          <div className="flex items-center gap-3 mb-6 text-gray-800">
            <GraduationCap size={28} />
            <h2 className="text-2xl font-bold">Levels of Education</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {Object.values(categoryTitles).map((title, i) => (
              <span key={i} className="px-4 py-2 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-100">
                {title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Subjects Offered */}
      <div>
        <div className="flex items-center gap-4 mb-12">
          <span className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm font-bold uppercase tracking-wider">Subjects</span>
          <h2 className="text-3xl font-bold text-gray-900">Comprehensive Learning</h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(subjects).map(([key, list]) => (
            <div key={key} className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold mb-6 text-blue-800">{categoryTitles[key] || key}</h3>
              <ul className="space-y-3">
                {list.map((sub, i) => (
                  <li key={i} className="text-gray-600 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Examination System */}
      <div className="bg-gray-900 text-white p-12 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-blue-400 mb-4 px-3 py-1 bg-blue-400/10 rounded-full border border-blue-400/20">
              <ClipboardCheck size={18} />
              <span className="text-sm font-bold uppercase tracking-widest">Assessment</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">Evaluation & Growth</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Unit Tests", "Term Examinations", "Practical Assessment", "Internal Evaluation"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <ArrowRight size={16} className="text-blue-500" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block bg-gray-800/50 backdrop-blur-md p-10 rounded-[1.9rem] border border-white/5">
            <p className="text-2xl font-serif italic text-blue-200">
              "Education is not the learning of facts, but the training of the mind to think."
            </p>
          </div>
        </div>
      </div>

      {/* Syllabus View Table */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Syllabus Resources</h2>
          <p className="text-gray-600">Click on a class to view the prescribed syllabus image.</p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-sm">
          <table className="w-full text-left bg-white border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-5 text-gray-700 font-bold uppercase text-xs tracking-wider">Level</th>
                <th className="px-8 py-5 text-gray-700 font-bold uppercase text-xs tracking-wider text-right">View Syllabus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {syllabusData.map((row, i) => (
                <tr key={i} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-8 py-6 font-bold text-gray-900">{row.label}</td>
                  <td className="px-8 py-6">
                    <div className="flex flex-wrap justify-end gap-3">
                      {row.links.map((link, j) => (
                        <button
                          key={j}
                          onClick={() => setActiveImage(`/assets/images/syllabus/${link.toLowerCase().replace(" ", "-")}.jpg`)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-blue-700 shadow-sm hover:border-blue-400 hover:text-blue-800 hover:shadow-md transition-all active:scale-95"
                        >
                          <Eye size={14} />
                          {link}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            onClick={() => setActiveImage(null)}
          >
            <X size={32} />
          </button>
          
          <div 
            className="max-w-5xl w-full max-h-[90vh] overflow-auto rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={activeImage} 
              alt="Syllabus Preview" 
              className="w-full h-auto object-contain bg-white"
            />
          </div>
        </div>
      )}
    </section>
  );
}