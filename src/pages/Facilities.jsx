import { useState, useEffect, useRef } from "react";
import { BookOpen, Computer, FlaskConical, Calculator, Trophy, Bus, Sparkles, ArrowRight } from "lucide-react";
import libraryImg from "../assets/images/facilities/library.jpg";
import computerLabImg from "../assets/images/facilities/computer-lab.jpg";
import scienceLabImg from "../assets/images/facilities/science-lab.jpg";
import mathLabImg from "../assets/images/facilities/math-lab.jpg";
import playgroundImg from "../assets/images/facilities/playground.jpg";
import transportImg from "../assets/images/facilities/transport.jpg";
import { FloatingImageField } from "../components/shared/FloatingImageField";
import { pageImageMosaics } from "../data/pageImageMosaics";

// Scroll Reveal Wrapper (consistent with other pages)
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

// Map facility title to appropriate icon
const getFacilityIcon = (title) => {
  if (title.includes("Library")) return <BookOpen size={28} />;
  if (title.includes("Computer")) return <Computer size={28} />;
  if (title.includes("Science")) return <FlaskConical size={28} />;
  if (title.includes("Mathematics")) return <Calculator size={28} />;
  if (title.includes("Playground") || title.includes("Sports")) return <Trophy size={28} />;
  if (title.includes("Transport")) return <Bus size={28} />;
  return <Sparkles size={28} />;
};

const facilities = [
  {
    title: "Library",
    description: "A well-stocked library that encourages reading habits and academic enrichment.",
    image: libraryImg,
  },
  {
    title: "Computer Laboratory",
    description: "Modern computer lab with internet access to support digital learning.",
    image: computerLabImg,
  },
  {
    title: "Science Laboratories",
    description: "Separate laboratories for Physics, Chemistry, and Biology with practical exposure.",
    image: scienceLabImg,
  },
  {
    title: "Mathematics Lab",
    description: "Hands-on learning environment to strengthen mathematical concepts.",
    image: mathLabImg,
  },
  {
    title: "Playground & Sports",
    description: "Spacious playground and sports facilities for physical development.",
    image: playgroundImg,
  },
  {
    title: "Transport Facility",
    description: "Safe and reliable transport facility covering nearby areas.",
    image: transportImg,
  },
];

export default function Facilities() {
  return (
    <div className="overflow-x-hidden scroll-smooth bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <div className="relative isolate">
        <FloatingImageField {...pageImageMosaics.facilities} />
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        
        {/* Header with gradient and animated blobs */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-8 sm:p-12 mb-16 shadow-2xl">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
              <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl animate-bounce" style={{ animationDuration: "8s" }} />
              <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-2xl animate-spin-slow" />
            </div>
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-500/20 px-4 py-1.5 backdrop-blur-md mb-6">
                <Sparkles size={14} className="text-yellow-300 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-yellow-100">
                  Campus Facilities
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                Our <span className="text-blue-300">Facilities</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mt-6" />
              <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-base sm:text-lg">
                State-of-the-art infrastructure designed to nurture young minds and support holistic development.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Facilities list - alternating layout with animations */}
        <div className="space-y-16 sm:space-y-24">
          {facilities.map((item, index) => (
            <RevealOnScroll key={index} delay={`${index * 150}ms`}>
              <div 
                className={`flex flex-col gap-8 lg:gap-16 ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center group`}
              >
                {/* Image Container with hover effects */}
                <div className="w-full lg:w-1/2">
                  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-64 sm:h-80 lg:h-96 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Icon overlay (small badge) */}
                    <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {getFacilityIcon(item.title)}
                    </div>
                  </div>
                </div>

                {/* Text Content with gradient accents */}
                <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                      {getFacilityIcon(item.title)}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                      {item.title}
                    </h2>
                  </div>
                  
                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center gap-2 pt-2">
                    <span className="inline-block h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
                    <span className="text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 flex items-center gap-1">
                      Learn more <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Footer note */}
        <RevealOnScroll delay="300ms">
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full shadow-sm">
              <Sparkles size={18} className="text-blue-600" />
              <span className="text-gray-700 font-medium text-sm">More facilities coming soon to enhance student experience</span>
            </div>
          </div>
        </RevealOnScroll>
        </section>
      </div>

      {/* CSS animations (add if not already global) */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
