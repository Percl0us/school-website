import { useState, useEffect, useRef } from "react";
import { Mail, Award, BookOpen, Sparkles, GraduationCap, Users } from "lucide-react";
import facultyMembers from "../data/faculty";

// Scroll Reveal Wrapper (local, but you can also import from shared component)
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

export default function Faculty() {
  return (
    <div className="overflow-x-hidden scroll-smooth bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Section Header with gradient accent */}
        <RevealOnScroll>
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs sm:text-sm flex items-center gap-2">
                <Sparkles size={14} className="text-blue-500" /> Mentors
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Meet Our Expert{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Faculty
              </span>
            </h1>

            <p className="text-gray-600 mt-4 max-w-2xl text-base sm:text-lg leading-relaxed">
              Our educators are dedicated professionals committed to shaping the
              leaders of tomorrow through innovative teaching and personal mentorship.
            </p>
          </div>
        </RevealOnScroll>

        {/* Faculty Grid - fully responsive */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {facultyMembers.map((member, index) => (
            <RevealOnScroll key={index} delay={`${(index % 4) * 100}ms`}>
              <div className="group relative bg-white rounded-2xl sm:rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                
                {/* Animated gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl" />
                
                {/* Decorative floating icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <GraduationCap size={20} className="text-blue-300" />
                </div>

                <div className="relative z-10">
                  <FacultyImage member={member} />

                  <div className="text-center space-y-2 mt-5">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {member.name}
                    </h3>

                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wide">
                      {member.role}
                    </div>

                    <div className="pt-2 flex items-center justify-center gap-2 text-gray-600">
                      <BookOpen size={14} className="text-blue-500" />
                      <span className="text-xs sm:text-sm font-medium italic">
                        {member.subject}
                      </span>
                    </div>

                    {/* Action buttons - appear on hover */}
                    <div className="pt-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <button 
                        title="Email" 
                        className="p-2 bg-gray-50 hover:bg-blue-600 hover:text-white rounded-full transition-all shadow-sm hover:shadow-md"
                        onClick={() => window.location.href = `mailto:${member.email || 'info@tagorepublic.edu'}`}
                      >
                        <Mail size={16} />
                      </button>
                      <button 
                        title="Achievements" 
                        className="p-2 bg-gray-50 hover:bg-purple-600 hover:text-white rounded-full transition-all shadow-sm hover:shadow-md"
                      >
                        <Award size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Motivational Quote Section - fun addition */}
        <RevealOnScroll delay="300ms">
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 shadow-sm">
              <Users size={18} className="text-blue-600" />
              <span className="text-sm font-bold text-gray-700">Dedicated to Excellence</span>
            </div>
            <p className="text-gray-500 mt-4 text-sm italic">
              Our faculty members undergo continuous professional development to bring the best learning experience.
            </p>
          </div>
        </RevealOnScroll>
      </section>

      {/* CSS for shimmer animation (if still used) */}
      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
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

// Faculty Image Component with enhanced loader and hover effects
function FacultyImage({ member }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Outer ring that animates on hover */}
      <div className="absolute inset-0 rounded-full border-2 border-blue-200 group-hover:border-blue-500 transition-all duration-500 scale-110 group-hover:scale-125 opacity-70 group-hover:opacity-100" />
      
      {/* Shimmer placeholder */}
      {!loaded && (
        <div className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer" />
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen size={24} className="text-blue-300" />
          </div>
        </div>
      )}

      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover rounded-full shadow-md grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 ease-out ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-90"
        } group-hover:scale-105`}
      />
    </div>
  );
}