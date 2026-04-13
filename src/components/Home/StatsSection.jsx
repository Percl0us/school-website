import { memo } from "react";
import { useCountUp } from "../shared/useCountUp";
import { RevealOnScroll } from "../shared/RevealOnScroll";
import academicsSnapshot from "../../data/academicsSnapshot";

const StatsCounter = memo(({ value, label }) => {
  const numericValue = parseInt(String(value).replace(/\D/g, "")) || 0;
  const { count, ref } = useCountUp(numericValue, 2000);
  if (numericValue === 0) return null;

  return (
    <div ref={ref} className="text-center group">
      <p className="font-dyna mb-1 text-3xl font-black text-transparent bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text sm:mb-2 sm:text-4xl md:text-5xl lg:text-6xl group-hover:scale-105 transition-transform pb-2">
        {count}+
      </p>
      <p className="font-glory text-xs font-bold uppercase tracking-wide text-blue-200/80 sm:text-sm md:text-base">
        {label}
      </p>
    </div>
  );
});

export const StatsSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 py-16 text-white sm:py-20 md:py-24">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-yellow-400 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-pink-500 blur-3xl animate-bounce" style={{ animationDuration: "10s" }} />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 sm:gap-10 md:grid-cols-4">
          {academicsSnapshot.map((item) => {
            const numericValue = parseInt(String(item.value).replace(/\D/g, "")) || 0;
            if (numericValue === 0) return null;
            return <StatsCounter key={item.id} value={numericValue} label={item.title} />;
          })}
        </div>
      </div>
    </section>
  );
};