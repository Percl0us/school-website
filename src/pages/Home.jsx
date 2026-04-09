import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  ChevronRight,
  Award,
  BookOpen,
  Star,
  Building2,
  Camera,
} from "lucide-react";

import announcements from "../data/announcements";
import usp from "../data/usp";
import academicsSnapshot from "../data/academicsSnapshot";
import facilities from "../data/facilities";

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
      className={`transform transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

function HeroLoader() {
  return (
    <div className="absolute inset-0 z-20">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900" />
      <div className="animate-shimmer absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.12),transparent)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/40 to-transparent" />

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                <Star size={14} className="text-yellow-300" />
              </div>
              <div className="h-3 w-32 rounded-full bg-white/10" />
            </div>

            <div className="space-y-3">
              <div className="h-14 w-full max-w-xl rounded-2xl bg-white/10 md:h-16" />
              <div className="h-14 w-3/4 rounded-2xl bg-white/10 md:h-16" />
            </div>

            <div className="space-y-3">
              <div className="h-4 w-full max-w-lg rounded-full bg-white/10" />
              <div className="h-4 w-5/6 rounded-full bg-white/10" />
            </div>

            <div className="pt-4">
              <div className="flex h-14 w-60 items-center gap-3 rounded-xl bg-white/10 px-5">
                <div className="h-5 w-5 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
                <div className="h-4 w-32 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    setHeroVisible(true);

    const img = new Image();
    img.src = "/images/hero.jpg";
    img.onload = () => setHeroLoaded(true);
    img.onerror = () => setHeroLoaded(true);
  }, []);

  const handleNav = (path, key) => {
    setLoading(key);
    setTimeout(() => navigate(path), 600);
  };

  return (
    <div className="overflow-x-hidden scroll-smooth bg-white">
      {/* Hero Section */}
      <section className="relative flex h-[90vh] items-center justify-center overflow-hidden bg-blue-950 text-white">
        {!heroLoaded && <HeroLoader />}

        <div
          className={`absolute inset-0 bg-center bg-no-repeat transition-all duration-[1400ms] ease-out ${
            heroLoaded ? "opacity-100" : "opacity-0"
          } ${heroVisible ? "scale-105" : "scale-100"}`}
          style={{
            backgroundImage: "url('/images/hero.jpg')",
            backgroundSize: "cover",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/40 to-transparent" />

        <div className="relative z-30 mx-auto w-full max-w-7xl px-6">
          <div className="max-w-2xl space-y-6">
            <div
              className={`inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 backdrop-blur-md transition-all duration-700 delay-300 ${
                heroVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-bold uppercase tracking-widest text-blue-100">
                Affiliated to HBSE
              </span>
            </div>

            <h1
              className={`text-5xl font-extrabold leading-tight tracking-tight transition-all duration-1000 delay-500 md:text-7xl ${
                heroVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Tagore Public <span className="text-blue-400">School</span>
            </h1>

            <p
              className={`max-w-lg text-xl leading-relaxed text-blue-50/90 transition-all duration-1000 delay-700 ${
                heroVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Empowering students with conceptual clarity and holistic growth
              since inception.
            </p>

            <div
              className={`flex flex-wrap gap-4 pt-4 transition-all duration-1000 delay-[900ms] ${
                heroVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
            >
              <button
                onClick={() => handleNav("/admissions", "admissions")}
                className="group flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-bold shadow-lg transition-all hover:bg-blue-700 active:scale-95"
              >
                {loading === "admissions" ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Award size={20} />
                )}
                Apply for Admission
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Bar */}
      <section className="relative z-20 -mt-16 mx-auto max-w-6xl px-6">
        <RevealOnScroll>
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-2 animate-pulse rounded-full bg-red-600" />
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Notice Board
                </h2>
              </div>

              <Link
                to="/events"
                className="group flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800"
              >
                View All <ChevronRight size={18} />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {announcements.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-gray-100 bg-gray-50 p-5 transition-all hover:border-blue-200 hover:shadow-lg"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                    {item.date}
                  </span>
                  <p className="mt-2 line-clamp-2 font-bold text-gray-800">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-7xl px-6">
          <RevealOnScroll>
            <div className="mx-auto mb-20 max-w-3xl text-center">
              <h2 className="mb-6 text-4xl font-bold text-gray-900 tracking-tight">
                Why Choose Tagore Public?
              </h2>
              <div className="mx-auto h-1.5 w-24 rounded-full bg-blue-600" />
            </div>
          </RevealOnScroll>

          <div className="grid gap-10 md:grid-cols-2">
            {usp.map((item, index) => (
              <RevealOnScroll key={item.id} delay={`${index * 200}ms`}>
                <div className="group rounded-[2.5rem] border border-transparent bg-gray-50 p-10 transition-all duration-500 hover:border-blue-100 hover:bg-white hover:shadow-2xl">
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 transition-all group-hover:rotate-6 group-hover:bg-blue-600">
                    <BookOpen
                      className="text-blue-600 group-hover:text-white"
                      size={28}
                    />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative overflow-hidden bg-blue-900 py-24 text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-12 lg:grid-cols-4">
            {academicsSnapshot.map((item, index) => (
              <RevealOnScroll key={item.id} delay={`${index * 150}ms`}>
                <div className="text-center">
                  <p className="mb-2 text-5xl font-black text-blue-400 md:text-6xl">
                    {item.value}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200/60">
                    {item.title}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="bg-gray-50 py-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <RevealOnScroll>
            <h2 className="mb-20 text-3xl font-bold text-gray-900">
              Campus Facilities
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {facilities.map((item, index) => (
              <RevealOnScroll key={index} delay={`${(index % 4) * 100}ms`}>
                <div className="flex flex-col items-center gap-4 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
                  <div className="rounded-2xl bg-blue-50 p-4 text-blue-600">
                    <Building2 size={24} />
                  </div>
                  <span className="text-sm font-extrabold text-gray-800">
                    {item}
                  </span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}