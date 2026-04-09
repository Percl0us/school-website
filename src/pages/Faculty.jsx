import { useState, useEffect, useRef } from "react";
import { Mail, Award } from "lucide-react";
import facultyMembers from "../data/faculty";

// 1. Scroll Reveal Wrapper for Staggered Animation
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
      className={`transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

export default function Faculty() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-white">
      {/* Section Header */}
      <RevealOnScroll>
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-1.5 bg-blue-600 rounded-full" />
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
              Mentors
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Meet Our Expert <span className="text-blue-600">Faculty</span>
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl text-lg leading-relaxed">
            Our educators are dedicated professionals committed to shaping the
            leaders of tomorrow through innovative teaching and personal mentorship.
          </p>
        </div>
      </RevealOnScroll>

      {/* Faculty Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {facultyMembers.map((member, index) => (
          <RevealOnScroll key={index} delay={`${(index % 4) * 150}ms`}>
            <div className="group relative bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              
              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 mb-6">
                <FacultyImage member={member} />
              </div>

              <div className="relative z-10 text-center space-y-2">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {member.name}
                </h3>

                <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg uppercase tracking-wide">
                  {member.role}
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <BookOpen size={14} className="text-blue-500" />
                    <span className="text-sm font-medium italic">
                      {member.subject}
                    </span>
                  </div>
                </div>

                {/* Social Buttons */}
                <div className="pt-6 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <button title="Email" className="p-2 bg-gray-50 hover:bg-blue-600 hover:text-white rounded-full transition-colors shadow-sm">
                    <Mail size={16} />
                  </button>
                  <button title="Awards" className="p-2 bg-gray-50 hover:bg-blue-600 hover:text-white rounded-full transition-colors shadow-sm">
                    <Award size={16} />
                  </button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>

      {/* 2. Added Required CSS for Shimmer Animation */}
      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}

function FacultyImage({ member }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-32 h-32 mx-auto relative">
      {/* Ring Decoration */}
      <div className="absolute inset-0 rounded-full border-2 border-blue-600/10 group-hover:border-blue-600 transition-colors duration-500 scale-110" />

      {/* Advanced Shimmer Loader */}
      {!loaded && (
        <div className="absolute inset-0 rounded-full overflow-hidden bg-gray-100">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer" />
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen size={20} className="text-blue-200" />
          </div>
        </div>
      )}

      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover rounded-full shadow-md grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 ease-out ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      />
    </div>
  );
}

function BookOpen({ size, className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}