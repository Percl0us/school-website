import { useState } from "react";
import { X, Maximize2, Camera, Sparkles, Image as ImageIcon } from "lucide-react";

const images = Object.values(
  import.meta.glob("../assets/images/gallery/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
  })
);

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="overflow-x-hidden scroll-smooth bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
        {/* Header with sparkle and gradient */}
        <div className="mb-12 sm:mb-16">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-full bg-gradient-to-r from-blue-100 to-purple-100 p-2">
              <Camera className="text-blue-600" size={20} />
            </div>
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600 flex items-center gap-1">
              <Sparkles size={14} className="text-yellow-500" /> Visual Journey
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
            Photo <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Gallery</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-600">
            A glimpse into the vibrant academic, cultural, and sports life at
            Tagore Public School. Capturing moments of growth and celebration.
          </p>
        </div>

        {/* Masonry Grid with enhanced cards */}
        <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3 xl:columns-4">
          {images.map((img, index) => (
            <GalleryImageCard
              key={index}
              img={img}
              index={index}
              onClick={() => setSelectedImg(img)}
            />
          ))}
        </div>

        {/* Lightbox - improved with animations and better mobile UX */}
        {selectedImg && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedImg(null)}
          >
            <button
              className="absolute right-4 top-4 z-[110] rounded-full border border-white/20 bg-black/50 p-2 text-white transition-all duration-300 hover:scale-110 hover:bg-white/20 sm:right-6 sm:top-6 sm:p-3"
              onClick={() => setSelectedImg(null)}
              aria-label="Close"
            >
              <X size={8} className="sm:size-12" />
            </button>

            <div
              className="relative flex max-h-[90vh] w-full max-w-6xl items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg}
                alt="Enlarged gallery view"
                className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl animate-in zoom-in duration-300"
              />
            </div>

            {/* Optional caption / hint */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white/60 text-xs sm:text-sm bg-black/30 rounded-full px-4 py-1.5 backdrop-blur-sm">
              Tap outside to close
            </div>
          </div>
        )}

        {/* Footer note */}
        <div className="mt-16 sm:mt-20 border-t border-gray-200 py-8 text-center">
          <p className="font-medium italic text-gray-500 text-sm sm:text-base flex items-center justify-center gap-2">
            <ImageIcon size={16} /> More photos are added regularly after school events.
          </p>
        </div>
      </section>

      {/* CSS animations */}
      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes zoom-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-in {
          animation-duration: 0.3s;
          animation-fill-mode: both;
        }
        .fade-in {
          animation-name: fade-in;
        }
        .zoom-in {
          animation-name: zoom-in;
        }
      `}</style>
    </div>
  );
}

// Enhanced Gallery Image Card with better loader and hover effects
function GalleryImageCard({ img, index, onClick }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="group relative mb-6 cursor-zoom-in break-inside-avoid overflow-hidden rounded-2xl sm:rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
      onClick={onClick}
    >
      {/* Shimmer loader with gradient */}
      {!loaded && (
        <div className="absolute inset-0 z-10 min-h-[260px]">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100" />
          <div className="animate-shimmer absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.8),transparent)] bg-[length:200%_100%]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/60 shadow-md backdrop-blur-md sm:h-14 sm:w-14">
              <Camera size={20} className="text-blue-600 sm:size-22" />
            </div>
          </div>
        </div>
      )}

      {/* Top gradient overlay (dark-to-transparent) */}
      <div className="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Hover overlay with zoom icon */}
      <div className="absolute inset-0 z-20 flex items-center justify-center bg-blue-950/40 opacity-0 transition-all duration-500 group-hover:opacity-100">
        <div className="translate-y-4 rounded-full border border-white/30 bg-white/20 p-3 text-white backdrop-blur-md transition-transform duration-500 group-hover:translate-y-0 group-hover:scale-110">
          <Maximize2 size={20} className="sm:size-22" />
        </div>
      </div>

      <img
        src={img}
        alt={`School activity ${index + 1}`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`relative z-0 h-auto w-full object-cover transition-all duration-700 group-hover:scale-105 ${
          loaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
        }`}
      />
    </div>
  );
}