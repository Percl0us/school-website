import { useState } from "react";
import { X, Maximize2, Camera } from "lucide-react";

const images = Object.values(
  import.meta.glob("../assets/images/gallery/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
  })
);

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-16">
        <div className="mb-4 flex items-center gap-3">
          <Camera className="text-blue-600" size={24} />
          <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Visual Journey
          </span>
        </div>

        <h1 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
          Photo <span className="text-blue-600">Gallery</span>
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
          A glimpse into the vibrant academic, cultural, and sports life at
          Tagore Public School. Capturing moments of growth and celebration.
        </p>
      </div>

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

      {selectedImg && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
          onClick={() => setSelectedImg(null)}
        >
          <button
            className="absolute right-6 top-6 z-[110] rounded-full border border-white/10 bg-white/10 p-3 text-white transition-all duration-300 hover:scale-105 hover:bg-white/20"
            onClick={() => setSelectedImg(null)}
          >
            <X size={28} />
          </button>

          <div
            className="relative flex max-h-[90vh] w-full max-w-6xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImg}
              alt="Enlarged gallery view"
              className="max-h-[90vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}

      <div className="mt-20 border-t border-gray-100 py-10 text-center">
        <p className="font-medium italic text-gray-500">
          More photos are added regularly after school events.
        </p>
      </div>
    </section>
  );
}

function GalleryImageCard({ img, index, onClick }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="group relative mb-6 cursor-zoom-in break-inside-avoid overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl"
      onClick={onClick}
    >
      {!loaded && (
        <div className="absolute inset-0 z-10 min-h-[260px]">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100" />
          <div className="animate-shimmer absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.82),transparent)]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-white/60 shadow-md backdrop-blur-md">
              <Camera size={22} className="text-blue-600" />
            </div>
          </div>
        </div>
      )}

      <div className="absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-0 z-20 flex items-center justify-center bg-blue-950/35 opacity-0 transition-all duration-500 group-hover:opacity-100">
        <div className="translate-y-4 rounded-full border border-white/20 bg-white/20 p-3 text-white backdrop-blur-md transition-transform duration-500 group-hover:translate-y-0">
          <Maximize2 size={22} />
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