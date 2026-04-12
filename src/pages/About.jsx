import { useState, useEffect, useRef } from "react";
import { Eye, Zap, Quote, Sparkles } from "lucide-react";
import principalImg from "../assets/images/principal/principal.jpg";

// Reusable Scroll Animation Wrapper
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

export default function About() {
  return (
    <div className="overflow-x-hidden scroll-smooth bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 font-body">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-20 text-white sm:py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl animate-bounce" style={{ animationDuration: "8s" }} />
          <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-2xl animate-spin-slow" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-1.5 bg-yellow-400 rounded-full" />
              <span className="font-swanky text-yellow-300 font-bold uppercase tracking-widest text-sm flex items-center gap-2 pb-1">
                <Sparkles size={14} className="animate-pulse" /> Our Legacy
              </span>
              <div className="w-10 h-1.5 bg-yellow-400 rounded-full" />
            </div>
            <h1 className="font-henny text-4xl md:text-6xl font-black mb-8 tracking-tight leading-[1.2] pb-2">
              About <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Tagore Public School</span>
            </h1>
            <p className="font-accent text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-medium italic pb-2">
              "Nurturing academic excellence, discipline, and strong moral values since inception."
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-20 sm:space-y-32">
        
        {/* History / Intro */}
        <RevealOnScroll>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 mb-6">
              <Sparkles size={14} className="text-blue-600" />
              <span className="font-dyna text-xs font-bold uppercase tracking-wider text-blue-700 pb-0.5">Our Journey</span>
            </div>
            <p className="font-indie text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed pb-2">
              Tagore Public School was established with a clear vision: to provide quality
              education that transcends textbooks. Over the years, we have evolved into a
              trusted institution, proudly serving our community from LKG through Class XII
              with unwavering dedication. We focus on a 360-degree development model that 
              combines modern technology with traditional values.
            </p>
          </div>
        </RevealOnScroll>

        {/* Vision & Mission Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          <RevealOnScroll delay="200ms">
            <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 p-8 sm:p-12 rounded-3xl border border-blue-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full hover:-translate-y-1">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:rotate-6 transition-transform">
                  <Eye size={28} />
                </div>
                <h2 className="font-henny text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent pb-1">
                  Our Vision
                </h2>
                <p className="font-indie text-gray-700 text-base sm:text-lg leading-relaxed pb-1">
                  To develop confident, responsible, and well-rounded individuals who
                  are prepared to meet the dynamic challenges of the global future through 
                  critical thinking and emotional intelligence.
                </p>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay="400ms">
            <div className="group relative bg-gradient-to-br from-gray-50 to-slate-50 p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 h-full hover:-translate-y-1">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gray-700/5 to-slate-700/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-slate-800 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:rotate-6 transition-transform">
                  <Zap size={28} />
                </div>
                <h2 className="font-henny text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-slate-800 bg-clip-text text-transparent pb-1">
                  Our Mission
                </h2>
                <p className="font-indie text-gray-700 text-base sm:text-lg leading-relaxed pb-1">
                  To provide a safe, stimulating, and inclusive learning environment that
                  ignites academic achievement, personal growth, and social responsibility
                  across all disciplines.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {/* Principal's Message */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-3xl sm:rounded-[3rem] border border-gray-100 bg-white shadow-xl hover:shadow-2xl transition-shadow">
            <div className="grid items-stretch md:grid-cols-5">
              
              <div className="md:col-span-2">
                <PrincipalImage />
              </div>

              <div className="md:col-span-3 p-6 sm:p-10 lg:p-16 flex flex-col justify-center bg-white relative">
                <Quote className="absolute top-6 right-6 sm:top-10 sm:right-10 text-blue-50 w-20 h-20 sm:w-24 sm:h-24 -z-0" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold uppercase tracking-widest text-xs sm:text-sm">
                    <div className="w-6 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600" />
                    <span className="font-dyna pb-0.5">Leadership Voice</span>
                  </div>
                  
                  <h2 className="font-henny text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight pb-2">
                    Principal’s Message
                  </h2>

                  <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed italic">
                    <p className="font-indie pb-1">
                      "At Tagore Public School, we believe that education is not just about
                      acquiring knowledge, but about shaping character. Our dedicated
                      faculty works closely with students to help them realize their full
                      potential."
                    </p>
                    <p className="font-indie not-italic pb-1">
                      We invite you to be a part of this journey where we turn 
                      curiosity into career-readiness and dreams into reality.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="font-henny text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent pb-1">
                      Babita Rani
                    </p>
                    <p className="font-dyna text-gray-500 font-bold uppercase tracking-wider text-xs mt-1 pb-0.5">
                      Principal, Tagore Public School
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* CSS for animations (if not already global) */}
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

function PrincipalImage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-[350px] sm:h-[450px] md:h-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="mt-3 text-sm text-gray-500 font-indie">Loading image...</p>
        </div>
      )}

      <img
        src={principalImg}
        alt="Babita Rani - Principal"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-1000 ease-out ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
        }`}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
    </div>
  );
}