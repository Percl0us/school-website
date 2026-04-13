import { useState, useEffect } from "react";
import { Sparkles, Rocket, Zap } from "lucide-react";
import { HeroLoader } from "../shared/HeroLoader";

export const HeroSection = ({ heroLoaded, heroVisible, handleNav, loading }) => {
  return (
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
            <Sparkles size={14} className="fill-yellow-400 text-yellow-300 animate-pulse" />
            <span className="font-dyna text-xs font-bold uppercase tracking-widest text-yellow-100 sm:text-sm">
              Affiliated to HBSE
            </span>
          </div>

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
  );
};