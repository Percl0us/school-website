import { useState, useEffect, useRef } from "react";
import { Calendar, Bell, Info, Megaphone, Sparkles, ChevronRight } from "lucide-react";
import getNotices from "../data/notices";
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

export default function EventsNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getNotices();
      setNotices(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    return {
      day: d.toLocaleDateString("en-IN", { day: "2-digit" }),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
    };
  };

  // Enhanced Skeleton Loader with gradient
  if (loading) {
    return (
      <div className="overflow-x-hidden scroll-smooth bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 min-h-screen">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="space-y-4 sm:space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse flex gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border bg-white/80 backdrop-blur-sm"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl" />
                <div className="flex-1 space-y-3">
                  <div className="w-20 h-4 bg-gray-200 rounded-full" />
                  <div className="w-3/4 h-6 bg-gray-300 rounded" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden scroll-smooth bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <div className="relative isolate">
        <FloatingImageField {...pageImageMosaics.events} />
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        
        {/* Header with gradient accent and animated blobs */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-8 sm:p-12 mb-12 shadow-2xl">
            {/* Animated blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
              <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl animate-bounce" style={{ animationDuration: "8s" }} />
              <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-2xl animate-spin-slow" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <span className="text-red-300 font-bold uppercase tracking-widest text-xs flex items-center gap-1">
                    <Sparkles size={12} className="text-yellow-300" /> Live Updates
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  Events & <span className="text-blue-300">Notices</span>
                </h1>
              </div>
              <p className="text-blue-100 font-medium italic border-l-2 border-blue-400 pl-4 text-sm md:text-base max-w-xs">
                Stay updated with the latest happenings at Tagore Public School.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Notices list with staggered animations */}
        <div className="space-y-4 sm:space-y-6">
          {notices.map((item, idx) => {
            const isEvent = item.type === "Event";
            const { day, month } = formatDate(item.date);
            const gradients = isEvent 
              ? "from-blue-50 to-indigo-50 border-blue-100 hover:border-blue-300" 
              : "from-orange-50 to-amber-50 border-orange-100 hover:border-orange-300";

            return (
              <RevealOnScroll key={item.id} delay={`${idx * 100}ms`}>
                <div
                  className={`group relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] bg-gradient-to-br ${gradients} border transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}
                >
                  {/* Date block - animated badge */}
                  <div
                    className={`flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px] h-16 sm:h-20 rounded-2xl shadow-md transition-all group-hover:scale-105 ${
                      isEvent
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
                        : "bg-gradient-to-br from-orange-500 to-amber-500 text-white"
                    }`}
                  >
                    <span className="text-[10px] sm:text-xs font-bold uppercase opacity-90">
                      {month}
                    </span>
                    <span className="text-xl sm:text-2xl font-black leading-none">
                      {day}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-1.5 sm:space-y-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-sm ${
                          isEvent
                            ? "bg-blue-200 text-blue-800"
                            : "bg-orange-200 text-orange-800"
                        }`}
                      >
                        {isEvent ? <Megaphone size={10} /> : <Bell size={10} />}
                        {item.type}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors break-words">
                      {item.title}
                    </h3>
                    
                    {/* Optional description if available */}
                    {item.description && (
                      <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Info icon - appears on hover for desktop */}
                  <div className="hidden sm:block">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/60 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-purple-600 flex items-center justify-center transition-all duration-500 shadow-sm group-hover:shadow-lg">
                      <Info
                        className="text-gray-500 group-hover:text-white transition-colors"
                        size={18}
                      />
                    </div>
                  </div>

                  {/* Accent bar on left edge */}
                  <div
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 rounded-r-full transition-all duration-500 ${
                      isEvent
                        ? "bg-blue-600 opacity-0 group-hover:opacity-100"
                        : "bg-orange-500 opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Footer with gradient badge */}
        <RevealOnScroll delay="200ms">
          <div className="mt-12 md:mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-gray-100 to-blue-50 rounded-full text-gray-600 text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all">
              <Calendar size={14} className="text-blue-600" />
              End of recent notices — check back often for updates
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
