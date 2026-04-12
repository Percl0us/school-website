import { useState, useEffect, useRef } from "react";
import subjects from "../data/subjects";
import {
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  Eye,
  X,
  Sparkles,
} from "lucide-react";

// Scroll Animation Wrapper
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

export default function Academics() {
  const [activeImage, setActiveImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const categoryTitles = {
    prePrimary: "Pre-Primary (LKG - UKG)",
    primary: "Primary (Class I - V)",
    middle: "Middle (Class VI - VIII)",
    secondary: "Secondary (Class IX - X)",
    seniorSecondary: "Senior Secondary (Class XI - XII)",
  };

  const syllabusData = [
    { label: "Pre-Primary", links: ["LKG", "UKG"] },
    {
      label: "Primary",
      links: ["Class I", "Class II", "Class III", "Class IV", "Class V"],
    },
    { label: "Middle", links: ["Class VI", "Class VII", "Class VIII"] },
    { label: "Secondary", links: ["Class IX", "Class X"] },
    { label: "Senior Secondary", links: ["Class XI", "Class XII"] },
  ];

  const getImagePath = (className) => {
    const slug = className.toLowerCase().replace(/\s+/g, "-");
    return `/assets/images/syllabus/${slug}.jpg`;
  };

  // Lock body scroll when lightbox is open – but allow scrolling inside lightbox
  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage]);

  return (
    <div className="overflow-x-hidden scroll-smooth bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-20 sm:space-y-32">
        
        {/* Hero Header */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-3xl sm:rounded-[3rem] bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white shadow-2xl">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
              <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl animate-bounce" style={{ animationDuration: "8s" }} />
              <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-2xl animate-spin-slow" />
            </div>

            <div className="relative z-10 p-8 sm:p-12 md:p-20">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/30 backdrop-blur-md mb-6">
                  <Sparkles size={14} className="text-yellow-400 animate-pulse" />
                  <span className="text-xs font-bold tracking-widest uppercase text-yellow-100">
                    HBSE Affiliated
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight">
                  Academic <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Excellence</span>
                </h1>
                <p className="text-blue-100 text-base sm:text-lg md:text-xl leading-relaxed font-medium">
                  A meticulously structured academic roadmap designed to foster
                  critical thinking, conceptual clarity, and holistic growth for
                  every student.
                </p>
              </div>
            </div>

            <div className="absolute bottom-[-10%] right-[-5%] opacity-10 text-white rotate-12 hidden lg:block">
              <GraduationCap size={450} />
            </div>
          </div>
        </RevealOnScroll>

        {/* Curriculum & Levels */}
        <div className="grid md:grid-cols-2 gap-8">
          <RevealOnScroll delay="200ms">
            <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 p-8 sm:p-10 rounded-3xl border border-blue-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full hover:-translate-y-1">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:rotate-6 transition-transform">
                  <BookOpen size={28} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  Our Curriculum
                </h2>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  We follow the Haryana Board of School Education (HBSE) guidelines,
                  enhanced with modern pedagogy to ensure our students remain
                  competitive and creative.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay="400ms">
            <div className="group relative bg-gradient-to-br from-gray-50 to-slate-50 p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 h-full hover:-translate-y-1">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-700/5 to-slate-700/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-slate-800 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:rotate-6 transition-transform">
                  <GraduationCap size={28} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-slate-800 bg-clip-text text-transparent">
                  Levels of Education
                </h2>
                <div className="flex flex-wrap gap-3">
                  {Object.values(categoryTitles).map((title, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-white text-gray-700 rounded-xl text-xs sm:text-sm font-bold border border-gray-200 shadow-sm hover:shadow-md transition"
                    >
                      {title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Subjects Grid */}
        <div>
          <RevealOnScroll>
            <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 mb-4">
                <Sparkles size={14} className="text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Subject Offerings</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent tracking-tight">
                Comprehensive Learning
              </h2>
              <p className="text-gray-500 mt-3 text-base sm:text-lg">
                Diverse subject offerings across all educational tiers.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(subjects).map(([key, list], index) => {
              const gradients = [
                "from-red-50 to-orange-50 border-red-100",
                "from-green-50 to-emerald-50 border-green-100",
                "from-blue-50 to-cyan-50 border-blue-100",
                "from-purple-50 to-pink-50 border-purple-100",
                "from-yellow-50 to-amber-50 border-yellow-100",
                "from-indigo-50 to-violet-50 border-indigo-100",
              ];
              const gradient = gradients[index % gradients.length];
              return (
                <RevealOnScroll key={key} delay={`${index * 100}ms`}>
                  <div className={`group bg-gradient-to-br ${gradient} p-6 sm:p-8 rounded-2xl sm:rounded-3xl border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}>
                    <h3 className="text-lg sm:text-xl font-black mb-5 text-blue-700 uppercase tracking-tight">
                      {categoryTitles[key] || key}
                    </h3>
                    <ul className="space-y-3">
                      {list.map((sub, i) => (
                        <li
                          key={i}
                          className="text-gray-700 font-medium flex items-center gap-3 group-hover:translate-x-1 transition-transform text-sm sm:text-base"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>

        {/* Assessment Section */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-3xl sm:rounded-[3.5rem] bg-gradient-to-br from-gray-900 to-slate-900 text-white shadow-2xl">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-bounce" style={{ animationDuration: "10s" }} />
            </div>

            <div className="relative z-10 p-8 sm:p-12 md:p-20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 text-blue-400 mb-6 px-4 py-1.5 bg-blue-400/10 rounded-full border border-blue-400/20">
                    <ClipboardCheck size={18} />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">
                      Assessment Strategy
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight">
                    Evaluation & <span className="text-blue-400">Growth</span>
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      "Unit Tests",
                      "Term Exams",
                      "Practical Labs",
                      "Internal Viva",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="font-bold text-gray-200 text-sm sm:text-base">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="hidden lg:flex items-center justify-center">
                  <div className="p-8 border-2 border-dashed border-white/20 rounded-3xl text-center rotate-2 hover:rotate-0 transition-transform">
                    <p className="text-xl sm:text-2xl font-serif italic text-blue-200/80 leading-relaxed">
                      "Education is not the learning of facts, but the training of
                      the mind to think."
                    </p>
                    <p className="mt-4 text-blue-400 font-bold uppercase tracking-widest text-xs">
                      — Albert Einstein
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Syllabus Table */}
        <div className="space-y-8">
          <RevealOnScroll>
            <div className="flex items-center gap-3">
              <div className="w-10 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Syllabus Resources
              </h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="overflow-x-auto rounded-2xl sm:rounded-3xl border border-gray-100 shadow-lg bg-white">
              <table className="w-full text-left min-w-[500px]">
                <thead className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 sm:px-10 py-5 text-gray-800 font-black uppercase text-xs tracking-[0.2em]">
                      Level
                    </th>
                    <th className="px-6 sm:px-10 py-5 text-gray-800 font-black uppercase text-xs tracking-[0.2em] text-right">
                      View Documents
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {syllabusData.map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                      <td className="px-6 sm:px-10 py-6 font-black text-gray-800 text-base sm:text-lg">
                        {row.label}
                      </td>
                      <td className="px-6 sm:px-10 py-6">
                        <div className="flex flex-wrap justify-end gap-2 sm:gap-3">
                          {row.links.map((link, j) => (
                            <button
                              key={j}
                              onClick={() => {
                                const imgPath = getImagePath(link);
                                setImageLoaded(false);
                                setImageError(false);
                                setActiveImage(imgPath);
                              }}
                              className="group inline-flex items-center gap-2 px-3 sm:px-5 py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-blue-600 shadow-sm hover:border-blue-500 hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                            >
                              <Eye size={14} className="group-hover:scale-110 transition-transform" />
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
          </RevealOnScroll>
        </div>

        {/* Lightbox - Scrollable for tall images */}
        {activeImage && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 overflow-y-auto"
            onClick={() => setActiveImage(null)}
          >
            {/* Close button - fixed position so it stays while scrolling */}
            <button
              className="fixed top-4 right-4 z-[110] text-white bg-black/60 hover:bg-black/80 p-2 rounded-full transition-all focus:outline-none hover:scale-105 active:scale-95"
              onClick={() => setActiveImage(null)}
              aria-label="Close"
            >
              <X size={8} className="sm:size-12" />
            </button>

            {/* Scrollable content - centers the image but allows vertical scroll */}
            <div
              className="min-h-screen flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {!imageLoaded && !imageError && (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  <p className="text-white/70 text-sm">Loading syllabus...</p>
                </div>
              )}

              {imageError && (
                <div className="flex flex-col items-center gap-3 text-center max-w-xs bg-black/50 p-6 rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                    <X size={12} className="text-red-400" />
                  </div>
                  <p className="text-white/80 text-sm">
                    Syllabus image not found.<br />
                    Please add file at: <code className="bg-black/30 px-1 rounded">public/assets/images/syllabus/{activeImage.split('/').pop()}</code>
                  </p>
                  <button
                    onClick={() => setActiveImage(null)}
                    className="mt-2 px-4 py-2 bg-blue-600 rounded-full text-sm"
                  >
                    Close
                  </button>
                </div>
              )}

              <img
                src={activeImage}
                alt="Syllabus document"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`max-w-[95vw] w-auto h-auto rounded-lg shadow-2xl transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                style={{ width: "auto", height: "auto" }}
              />
            </div>

            {/* Bottom close button - optional */}
            {imageLoaded && !imageError && (
              <button
                onClick={() => setActiveImage(null)}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-2 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-colors text-sm z-[110]"
              >
                Close
              </button>
            )}
          </div>
        )}
      </section>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}