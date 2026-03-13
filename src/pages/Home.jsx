import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  ChevronRight, 
  Award, 
  BookOpen, 
  Users, 
  Trophy, 
  Star, 
  Building2 
} from "lucide-react";

import announcements from "../data/announcements";
import usp from "../data/usp";
import academicsSnapshot from "../data/academicsSnapshot";
import facilities from "../data/facilities";
import achievements from "../data/achievements";
import studentLife from "../data/studentLife";

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animations on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNav = (path, key) => {
    setLoading(key);
    setTimeout(() => navigate(path), 600);
  };

  return (
    <div className="overflow-x-hidden scroll-smooth">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center text-white overflow-hidden">
        {/* Animated Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/50 to-transparent transition-opacity duration-1000" />
        
        <div className={`relative z-10 max-w-7xl mx-auto px-6 w-full transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md animate-pulse-subtle">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-bold tracking-widest uppercase">Affiliated to HBSE</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
              Tagore Public <span className="text-blue-400">School</span>
            </h1>

            <p className="text-xl text-blue-50/90 leading-relaxed max-w-lg">
              Empowering students with conceptual clarity and holistic growth since inception.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => handleNav("/admissions", "admissions")}
                className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/40 active:scale-95"
              >
                {loading === "admissions" ? (
                  <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : <Award size={20} className="group-hover:rotate-12 transition-transform" />}
                Apply for Admission
              </button>

              <button
                onClick={() => handleNav("/about", "about")}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 px-8 py-4 rounded-xl font-bold transition-all active:scale-95"
              >
                {loading === "about" && <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                Explore Campus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Bar - Floating with Entrance Animation */}
      <section className={`relative z-20 -mt-16 max-w-6xl mx-auto px-6 transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 hover:shadow-blue-100/50 transition-shadow">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-red-600 rounded-full animate-bounce-slow" />
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Notice Board</h2>
            </div>
            <Link to="/events" className="group text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 text-sm uppercase tracking-wider">
              View All <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {announcements.slice(0, 3).map((item, idx) => (
              <div key={item.id} className="group p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{item.date}</span>
                <p className="font-bold text-gray-800 mt-2 group-hover:text-blue-700 transition-colors line-clamp-2">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Staggered Cards */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">Why Choose Tagore Public?</h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {usp.map((item) => (
              <div key={item.id} className="group p-10 rounded-[2.5rem] bg-gray-50 border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className="w-16 h-16 bg-blue-100 group-hover:bg-blue-600 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:rotate-6">
                  <BookOpen className="text-blue-600 group-hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 leading-relaxed text-lg">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Counter Feel */}
      <section className="py-24 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 to-transparent animate-pulse-slow" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {academicsSnapshot.map((item) => (
              <div key={item.id} className="text-center group cursor-default">
                <p className="text-5xl md:text-6xl font-black text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">{item.value}</p>
                <p className="text-blue-200/60 font-bold uppercase tracking-[0.2em] text-[10px]">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities - Floating Icons Grid */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-20">Campus Facilities</h2>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {facilities.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Building2 size={24} />
                </div>
                <span className="font-extrabold text-gray-800 text-sm tracking-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}