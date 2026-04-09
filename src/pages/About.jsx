import { useState, useEffect, useRef } from "react";
import { Eye, Zap, Quote } from "lucide-react"; // Using Lucide for consistency
import principalImg from "../assets/images/principal/principal.jpg";

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
      { threshold: 0.15 }
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

export default function About() {
  return (
    <div className="bg-white">
      {/* 1. Page Header Hero */}
      <section className="bg-gray-50 border-b border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <RevealOnScroll>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-1.5 bg-blue-600 rounded-full" />
              <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Our Legacy</span>
              <div className="w-10 h-1.5 bg-blue-600 rounded-full" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">
              About <span className="text-blue-600">Tagore Public School</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium italic">
              "Nurturing academic excellence, discipline, and strong moral values since inception."
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        
        {/* 2. History / Intro */}
        <RevealOnScroll>
          <div className="max-w-4xl mx-auto text-center">
             <p className="text-lg md:text-xl text-gray-600 leading-loose">
              Tagore Public School was established with a clear vision: to provide quality
              education that transcends textbooks. Over the years, we have evolved into a
              trusted institution, proudly serving our community from LKG through Class XII
              with unwavering dedication. We focus on a 360-degree development model that 
              combines modern technology with traditional values.
            </p>
          </div>
        </RevealOnScroll>

        {/* 3. Vision & Mission Cards */}
        <div className="grid gap-10 md:grid-cols-2">
          <RevealOnScroll delay="200ms">
            <div className="group bg-blue-50 p-12 rounded-[2.5rem] border border-blue-100 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500 h-full">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 text-white group-hover:rotate-6 transition-transform">
                <Eye size={30} />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-blue-900">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To develop confident, responsible, and well-rounded individuals who
                are prepared to meet the dynamic challenges of the global future through 
                critical thinking and emotional intelligence.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay="400ms">
            <div className="group bg-gray-50 p-12 rounded-[2.5rem] border border-gray-200 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500 h-full">
              <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center mb-8 text-white group-hover:rotate-6 transition-transform">
                <Zap size={30} />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To provide a safe, stimulating, and inclusive learning environment that
                ignites academic achievement, personal growth, and social responsibility
                across all disciplines.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        {/* 4. Principal's Message Section */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[3rem] border border-gray-100 bg-white shadow-2xl">
            <div className="grid items-stretch md:grid-cols-5">
              
              <div className="md:col-span-2">
                <PrincipalImage />
              </div>

              <div className="md:col-span-3 p-10 lg:p-16 flex flex-col justify-center bg-white relative">
                {/* Decorative Quote Icon */}
                <Quote className="absolute top-10 right-10 text-blue-50 w-24 h-24 -z-0" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold uppercase tracking-widest text-sm">
                    <div className="w-6 h-0.5 bg-blue-600" />
                    Leadership Voice
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 tracking-tight">
                    Principal’s Message
                  </h2>

                  <div className="space-y-6 text-lg text-gray-600 leading-loose italic">
                    <p>
                      "At Tagore Public School, we believe that education is not just about
                      acquiring knowledge, but about shaping character. Our dedicated
                      faculty works closely with students to help them realize their full
                      potential."
                    </p>
                    <p className="not-italic">
                      We invite you to be a part of this journey where we turn 
                      curiosity into career-readiness and dreams into reality.
                    </p>
                  </div>

                  <div className="mt-10 pt-10 border-t border-gray-100">
                    <p className="text-2xl font-black text-blue-700">Babita Rani</p>
                    <p className="text-gray-500 font-bold uppercase tracking-wider text-xs mt-1">
                      Principal, Tagore Public School
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}

function PrincipalImage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-[450px] md:h-full overflow-hidden bg-gray-100">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
           <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
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
      
      {/* Subtle overlay to blend image if needed */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent mix-blend-multiply" />
    </div>
  );
}