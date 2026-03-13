import { useState } from "react";
import { X, Maximize2, Camera } from "lucide-react";

const images = Object.values(
  import.meta.glob("../assets/images/gallery/*.{jpg,jpeg,png}", {
    eager: true,
    import: "default",
  })
);

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Camera className="text-blue-600" size={24} />
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Visual Journey</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
          Photo <span className="text-blue-600">Gallery</span>
        </h1>
        <p className="text-gray-600 mt-4 max-w-2xl text-lg leading-relaxed">
          A glimpse into the vibrant academic, cultural, and sports life at 
          Tagore Public School. Capturing moments of growth and celebration.
        </p>
      </div>

      {/* Masonry Layout */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {images.map((img, index) => (
          <div 
            key={index} 
            className="relative group overflow-hidden rounded-3xl cursor-zoom-in border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-blue-200 break-inside-avoid"
            onClick={() => setSelectedImg(img)}
          >
            {/* Overlay Icon */}
            <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <Maximize2 size={24} />
              </div>
            </div>

            <img
              src={img}
              alt={`School activity ${index + 1}`}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-8 right-8 text-white p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-[110]"
            onClick={() => setSelectedImg(null)}
          >
            <X size={32} />
          </button>

          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImg} 
              alt="Enlarged gallery view" 
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-300"
            />
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-20 py-10 border-t border-gray-100 text-center">
        <p className="text-gray-500 font-medium italic">
          More photos are added regularly after school events.
        </p>
      </div>
    </section>
  );
}