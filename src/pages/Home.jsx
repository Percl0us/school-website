import React, { useState, useEffect, useRef, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Award,
  BookOpen,
  Star,
  Building2,
  Sparkles,
  Rocket,
  Zap,
  Library,
  Computer,
  FlaskConical,
  Calculator,
  Trophy,
  MonitorSmartphone,
  Bus,
  Quote,
  Heart,
  Smile,
} from "lucide-react";

import announcements from "../data/announcements";
import usp from "../data/usp";
import academicsSnapshot from "../data/academicsSnapshot";
import facilities from "../data/facilities";

// Counter animation hook
const useCountUp = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
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
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return { count, ref };
};

// Scroll Reveal Wrapper
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

// Hero Loader
function HeroLoader() {
  return (
    <div className="absolute inset-0 z-20">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-blue-950 via-purple-900 to-pink-900" />
      <div className="animate-shimmer absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.2),transparent)] bg-[length:200%_100%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Sparkles size={14} className="text-yellow-300 animate-pulse" />
              <div className="h-3 w-28 rounded-full bg-white/20" />
            </div>
            <div className="space-y-2">
              <div className="h-10 w-full max-w-sm rounded-xl bg-white/20 sm:h-12 md:h-14" />
              <div className="h-10 w-3/4 rounded-xl bg-white/20 sm:h-12 md:h-14" />
            </div>
            <div className="pt-2">
              <div className="flex h-12 w-48 items-center gap-3 rounded-xl bg-white/20 px-5">
                <div className="h-5 w-5 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Testimonials data (moved outside to avoid recreation)
const testimonials = [
  {
    name: "Rakesh Sharma",
    role: "Parent of Class X Student",
    text: "The holistic development approach at Tagore Public School is remarkable. My child has grown both academically and personally.",
    rating: 5,
  },
  {
    name: "Dr. Meena Gupta",
    role: "Alumni Parent",
    text: "Excellent faculty and state-of-the-art facilities. The school truly cares about each student's future.",
    rating: 5,
  },
  {
    name: "Col. Rajiv Singh",
    role: "Parent of Class XII Student",
    text: "Discipline, values, and academic excellence – Tagore Public School delivers on all fronts.",
    rating: 5,
  },
];

// Isolated Testimonial Carousel Component
const TestimonialCarousel = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
        >
          {testimonials.map((t, idx) => (
            <div key={idx} className="w-full flex-shrink-0 px-4">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <Quote className="w-10 h-10 text-blue-300 mx-auto mb-4" />
                {/* FIX: added pb-2 and leading-relaxed to prevent descender clipping */}
                <p className="font-indie text-gray-600 text-xl sm:text-2xl italic mb-6 leading-relaxed pb-2">
                  "{t.text}"
                </p>
                <div className="flex justify-center mb-2">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                {/* FIX: pb-1 on font-dyna bold text to prevent bottom clipping */}
                <p className="font-dyna font-bold text-gray-900 text-lg sm:text-xl pb-1">
                  {t.name}
                </p>
                <p className="font-glory text-sm sm:text-base text-blue-600">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTestimonial(idx)}
            className={`h-2 rounded-full transition-all ${
              activeTestimonial === idx ? "w-6 bg-blue-600" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Stats Counter Component – memoized to prevent re-renders
const StatsCounter = memo(({ value, label }) => {
  const numericValue = parseInt(String(value).replace(/\D/g, "")) || 0;
  const { count, ref } = useCountUp(numericValue, 2000);
  if (numericValue === 0) return null;

  return (
    <div ref={ref} className="text-center group">
      {/* FIX: pb-2 on bg-clip-text element to prevent gradient mask clipping descenders */}
      <p className="font-dyna mb-1 text-3xl font-black text-transparent bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text sm:mb-2 sm:text-4xl md:text-5xl lg:text-6xl group-hover:scale-105 transition-transform pb-2">
        {count}+
      </p>
      <p className="font-glory text-xs font-bold uppercase tracking-wide text-blue-200/80 sm:text-sm md:text-base">
        {label}
      </p>
    </div>
  );
});

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
    <div className="overflow-x-hidden scroll-smooth bg-white font-indie">
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 text-white sm:min-h-[90vh]">
        {!heroLoaded && <HeroLoader />}

        <div
          className={`absolute inset-0 bg-center bg-no-repeat transition-all duration-[1400ms] ease-out ${
            heroLoaded ? "opacity-100" : "opacity-0"
          } ${heroVisible ? "scale-105" : "scale-100"}`}
          style={{
            backgroundImage: "url('/images/hero.jpg')",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl animate-pulse" />
          <div
            className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl animate-bounce"
            style={{ animationDuration: "8s" }}
          />
          <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-yellow-400/5 blur-2xl animate-spin-slow" />
        </div>

        <div className="relative z-30 mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl space-y-5 sm:space-y-6">
            <div
              className={`inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-500/20 px-4 py-2 backdrop-blur-md transition-all duration-700 delay-300 hover:scale-105 ${
                heroVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <Sparkles
                size={14}
                className="fill-yellow-400 text-yellow-300 animate-pulse"
              />
              {/* FIX: py-2 on badge pill (was py-1.5) to give font room vertically */}
              <span className="font-dyna text-xs font-bold uppercase tracking-widest text-yellow-100 sm:text-sm">
                Affiliated to HBSE
              </span>
            </div>

            {/* FIX: leading-[1.3] and pb-3 on hero h1 to prevent tall-cap clipping */}
            <h1
              className={`font-henny text-4xl font-extrabold leading-[1.3] tracking-tight pb-3 transition-all duration-1000 delay-500 sm:text-5xl md:text-7xl ${
                heroVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              Tagore Public{" "}
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                School
              </span>
            </h1>

            {/* FIX: leading-relaxed and pb-1 to prevent body text descender clipping */}
            <p
              className={`font-indie max-w-lg text-base leading-relaxed pb-1 text-white/90 transition-all duration-1000 delay-700 sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl ${
                heroVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              Empowering students with conceptual clarity and holistic growth
              since inception.
            </p>

            <div
              className={`flex flex-wrap gap-4 pt-3 transition-all duration-1000 delay-[900ms] ${
                heroVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
            >
              <button
                onClick={() => handleNav("/admissions", "admissions")}
                className="font-dyna group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 font-bold shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95 sm:w-auto sm:px-8 sm:py-4"
              >
                {loading === "admissions" ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Rocket size={20} className="group-hover:animate-bounce" />
                )}
                Apply for Admission
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <Zap size={24} className="text-yellow-300" />
        </div>
      </section>

      {/* Announcements Bar */}
      <section className="relative z-20 mx-auto max-w-6xl px-4 -mt-12 sm:-mt-16 sm:px-6">
        <RevealOnScroll>
          <div className="rounded-2xl border border-blue-100 bg-white/80 backdrop-blur-sm p-5 transition-all hover:shadow-md sm:rounded-3xl sm:p-8">
            <div className="mb-6 flex items-center justify-between sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="h-6 w-1.5 animate-pulse rounded-full bg-gradient-to-b from-red-500 to-orange-500 sm:h-8 sm:w-2" />
                {/* FIX: pb-1 on bg-clip-text heading */}
                <h2 className="font-dyna text-xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent sm:text-2xl pb-1">
                  Notice Board
                </h2>
              </div>
              <Link
                to="/events"
                className="font-glory group flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-blue-600 transition hover:text-purple-600 sm:text-sm"
              >
                View All{" "}
                <ChevronRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
              {announcements.slice(0, 3).map((item, idx) => (
                <div
                  key={item.id}
                  className="group rounded-xl border border-gray-100 bg-white p-4 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-sm sm:rounded-2xl sm:p-5"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <span className="font-da inline-block rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-700">
                    {item.date}
                  </span>
                  {/* FIX: pb-1 and leading-snug on card titles using decorative font */}
                  <p className="font-indie mt-2 line-clamp-2 text-base font-bold text-gray-800 group-hover:text-blue-700 sm:text-lg md:text-xl leading-snug pb-1">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <RevealOnScroll>
            {/* FIX: added py-4 to section header wrapper so fonts have vertical room */}
            <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-20 py-4">
              {/* FIX: py-2 on badge pill so font cap/descenders aren't clipped */}
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 mb-4">
                <Smile size={14} className="text-pink-600" />
                <span className="font-dyna text-lg sm:text-xl font-bold uppercase tracking-wider text-pink-700">
                  Why We're Awesome
                </span>
              </div>
              {/* FIX: leading-[1.3] and pb-3 on the main section heading (font-henny + bg-clip-text) */}
              <h2 className="font-henny mb-4 pb-3 text-3xl font-bold tracking-tight leading-[1.3] bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent sm:text-4xl md:text-5xl">
                Why Choose Us ?
              </h2>
              <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 sm:w-24" />
              {/* FIX: pb-1 on font-dyna subheading */}
              <p className="font-dyna mt-4 text-lg sm:text-xl text-gray-600 pb-1">
                Where excellence meets compassion
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid gap-6 sm:gap-10 md:grid-cols-2">
            {usp.map((item, index) => (
              <RevealOnScroll key={item.id} delay={`${index * 200}ms`}>
                <div className="group relative rounded-2xl border border-transparent bg-white p-6 transition-all duration-500 hover:scale-[1.02] hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/50 sm:rounded-[2.5rem] sm:p-8 md:p-10">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:rounded-[2.5rem]" />
                  <div className="relative z-10">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md transition-all group-hover:rotate-6 group-hover:scale-110 sm:mb-8 sm:h-16 sm:w-16 sm:rounded-2xl">
                      <BookOpen size={24} />
                    </div>
                    {/* FIX: pb-1 on card heading with font-dyna */}
                    <h3 className="font-dyna mb-2 text-xl font-bold text-gray-900 sm:mb-4 sm:text-2xl md:text-3xl pb-1">
                      {item.title}
                    </h3>
                    {/* FIX: leading-relaxed and pb-1 on card body text */}
                    <p className="font-indie text-base leading-relaxed pb-1 text-gray-600 sm:text-lg md:text-xl lg:text-2xl">
                      {item.description}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 py-16 text-white sm:py-20 md:py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-yellow-400 blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-pink-500 blur-3xl animate-bounce"
            style={{ animationDuration: "10s" }}
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:gap-10 md:grid-cols-4">
            {academicsSnapshot.map((item) => {
              const numericValue = parseInt(String(item.value).replace(/\D/g, "")) || 0;
              if (numericValue === 0) return null;
              return (
                <StatsCounter key={item.id} value={numericValue} label={item.title} />
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <RevealOnScroll>
            <div className="text-center mb-12 py-4">
              {/* FIX: py-2 on badge pill */}
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-100 to-orange-100 px-4 py-2 mb-4">
                <Heart size={14} className="text-pink-600" />
                <span className="font-dyna text-xs font-bold uppercase tracking-wider text-pink-700 sm:text-sm">
                  Parents Speak
                </span>
              </div>
              {/* FIX: leading-[1.3] and pb-3 on font-henny + bg-clip-text heading */}
              <h2 className="font-swanky text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.3] pb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                What Our Families Say
              </h2>
            </div>
          </RevealOnScroll>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <RevealOnScroll>
            {/* FIX: py-2 on badge pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 mb-4">
              <Building2 size={14} className="text-blue-600" />
              <span className="font-dyna text-xs font-bold uppercase tracking-wider text-blue-700 sm:text-sm">
                Modern Infrastructure
              </span>
            </div>
            {/* FIX: leading-[1.3] and pb-3 on font-henny + bg-clip-text heading */}
            <h2 className="font-unifraktur mb-12 text-2xl font-bold leading-[1.3] pb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent sm:mb-20 sm:text-3xl md:text-4xl lg:text-5xl">
              Campus Facilities
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {facilities.map((item, index) => {
              const getIcon = (name) => {
                if (name.includes("Library")) return <Library size={24} />;
                if (name.includes("Computer")) return <Computer size={24} />;
                if (name.includes("Science")) return <FlaskConical size={24} />;
                if (name.includes("Mathematics")) return <Calculator size={24} />;
                if (name.includes("Playground") || name.includes("Sports"))
                  return <Trophy size={24} />;
                if (name.includes("Smart Classrooms"))
                  return <MonitorSmartphone size={24} />;
                if (name.includes("Transport")) return <Bus size={24} />;
                return <Building2 size={24} />;
              };
              const gradients = [
                "from-red-400 to-orange-400",
                "from-green-400 to-emerald-400",
                "from-blue-400 to-cyan-400",
                "from-purple-400 to-pink-400",
                "from-yellow-400 to-amber-400",
                "from-indigo-400 to-violet-400",
              ];
              const gradient = gradients[index % gradients.length];
              return (
                <RevealOnScroll key={index} delay={`${(index % 4) * 100}ms`}>
                  <div className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-3 hover:shadow-md sm:gap-4 sm:rounded-3xl sm:p-6 md:p-8">
                    <div
                      className={`rounded-xl bg-gradient-to-br ${gradient} p-3 text-white shadow-md transition-all group-hover:rotate-12 group-hover:scale-110 sm:rounded-2xl sm:p-4`}
                    >
                      {getIcon(item)}
                    </div>
                    {/* FIX: pb-1 on font-dyna facility label to prevent bottom clipping */}
                    <span className="font-dyna text-sm font-extrabold text-gray-800 group-hover:text-blue-700 sm:text-base md:text-lg pb-1">
                      {item}
                    </span>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* Floating CTA for mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button
          onClick={() => handleNav("/admissions", "admissions")}
          className="font-swanky flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles size={16} /> Apply Now
        </button>
      </div>
    </div>
  );
}