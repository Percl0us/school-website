import { useState, useEffect, useRef } from "react";
import subjects from "../data/subjects";
import {
  BookOpen,
  GraduationCap,
  ClipboardCheck,
  ArrowRight,
  Eye,
  X,
  CheckCircle,
} from "lucide-react";

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
      { threshold: 0.1 },
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

export default function Academics() {
  const [activeImage, setActiveImage] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeImage]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 space-y-32 bg-white">
      {/* 1. Hero Header */}
      <RevealOnScroll>
        <div className="relative p-12 md:p-20 rounded-[3rem] bg-blue-900 text-white overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_var(--tw-gradient-stops))] from-blue-400 to-transparent" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md mb-6">
              <CheckCircle size={16} className="text-blue-400" />
              <span className="text-xs font-bold tracking-widest uppercase">
                HBSE Affiliated
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              Academic <span className="text-blue-400">Excellence</span>
            </h1>
            <p className="text-blue-100 text-xl leading-relaxed font-medium">
              A meticulously structured academic roadmap designed to foster
              critical thinking, conceptual clarity, and holistic growth for
              every student.
            </p>
          </div>

          <div className="absolute bottom-[-10%] right-[-5%] opacity-10 text-white rotate-12 hidden lg:block">
            <GraduationCap size={450} />
          </div>
        </div>
      </RevealOnScroll>

      {/* 2. Curriculum & Levels */}
      <div className="grid md:grid-cols-2 gap-10">
        <RevealOnScroll delay="200ms">
          <div className="group p-10 rounded-[2.5rem] border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-2xl hover:border-blue-100 transition-all duration-500 h-full">
            <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform">
              <BookOpen size={28} />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Our Curriculum
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We follow the Haryana Board of School Education (HBSE) guidelines,
              enhanced with modern pedagogy to ensure our students remain
              competitive and creative.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay="400ms">
          <div className="group p-10 rounded-[2.5rem] border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-2xl hover:border-blue-100 transition-all duration-500 h-full">
            <div className="w-14 h-14 bg-gray-800 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform">
              <GraduationCap size={28} />
            </div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Levels of Education
            </h2>
            <div className="flex flex-wrap gap-3">
              {Object.values(categoryTitles).map((title, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white text-gray-700 rounded-xl text-sm font-bold border border-gray-200 shadow-sm"
                >
                  {title}
                </span>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* 3. Subjects Grid */}
      <div>
        <RevealOnScroll>
          <div className="flex flex-col items-center text-center mb-16">
            <div className="w-12 h-1.5 bg-blue-600 rounded-full mb-6" />
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">
              Comprehensive Learning
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              Diverse subject offerings across all educational tiers.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(subjects).map(([key, list], index) => (
            <RevealOnScroll key={key} delay={`${index * 100}ms`}>
              <div className="group p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all duration-500">
                <h3 className="text-xl font-black mb-8 text-blue-700 uppercase tracking-tight">
                  {categoryTitles[key] || key}
                </h3>
                <ul className="space-y-4">
                  {list.map((sub, i) => (
                    <li
                      key={i}
                      className="text-gray-600 font-medium flex items-center gap-3 group-hover:translate-x-1 transition-transform"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* 4. Assessment Section */}
      <RevealOnScroll>
        <div className="bg-gray-950 text-white p-12 md:p-20 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-blue-400 mb-6 px-4 py-1.5 bg-blue-400/10 rounded-full border border-blue-400/20">
                <ClipboardCheck size={18} />
                <span className="text-xs font-black uppercase tracking-[0.2em]">
                  Assessment Strategy
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">
                Evaluation & <span className="text-blue-500">Growth</span>
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
                    className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="font-bold text-gray-200 tracking-wide">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <div className="p-12 border-2 border-dashed border-white/10 rounded-[3rem] text-center rotate-2">
                <p className="text-3xl font-serif italic text-blue-200/80 leading-relaxed">
                  "Education is not the learning of facts, but the training of
                  the mind to think."
                </p>
                <p className="mt-6 text-blue-500 font-bold uppercase tracking-widest text-sm">
                  — Albert Einstein
                </p>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* 5. Syllabus Table */}
      <div className="space-y-12 pb-12">
        <RevealOnScroll>
          <div className="flex items-center gap-4">
            <div className="w-10 h-1.5 bg-blue-600 rounded-full" />
            <h2 className="text-3xl font-black text-gray-900">
              Syllabus Resources
            </h2>
          </div>
        </RevealOnScroll>

        <div className="overflow-x-auto rounded-[2.5rem] border border-gray-100 shadow-xl bg-white">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-10 py-6 text-gray-900 font-black uppercase text-xs tracking-[0.2em]">
                  Level
                </th>
                <th className="px-10 py-6 text-gray-900 font-black uppercase text-xs tracking-[0.2em] text-right">
                  View Documents
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {syllabusData.map((row, i) => (
                <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                  <td className="px-10 py-8 font-black text-gray-800 text-lg">
                    {row.label}
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex flex-wrap justify-end gap-3">
                      {row.links.map((link, j) => (
                        <button
                          key={j}
                          onClick={() => {
                            const slug = link.toLowerCase().replace(" ", "-");
                            setImageLoaded(false);
                            setActiveImage(
                              `/assets/images/syllabus/${slug}.jpg`,
                            );
                          }}
                          className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-blue-600 shadow-sm hover:border-blue-500 hover:bg-blue-600 hover:text-white transition-all active:scale-95"
                        >
                          <Eye
                            size={16}
                            className="group-hover:scale-110 transition-transform"
                          />
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

      {/* 6. Lightbox */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center bg-white/95 backdrop-blur-md transition-all duration-300 overflow-y-auto"
          onClick={() => setActiveImage(null)}
        >
          {/* Close Button */}
          <button
            className="fixed top-8 right-8 z-[110] text-black hover:rotate-90 transition-transform duration-300 bg-gray-100 p-2 rounded-full shadow-md"
            onClick={() => setActiveImage(null)}
          >
            <X size={32} />
          </button>

          {/* Content Container */}
          <div
            className="max-w-4xl w-full py-20 px-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loader */}
            {!imageLoaded && (
              <div className="flex flex-col items-center justify-center py-32 gap-4">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-gray-400 text-sm font-medium">Loading document...</p>
              </div>
            )}

            {/* Image */}
            <img
              src={activeImage}
              alt="Syllabus Document"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-auto shadow-2xl rounded-xl border border-gray-100 transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0 absolute"
              }`}
            />

            {/* Bottom Close Button */}
            {imageLoaded && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setActiveImage(null)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition-colors"
                >
                  Close Document
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}