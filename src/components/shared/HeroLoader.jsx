import { Sparkles } from "lucide-react";

export const HeroLoader = () => {
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
};