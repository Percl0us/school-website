import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { RevealOnScroll } from "./RevealOnScroll";

const shapeClasses = {
  rounded: "aspect-[4/5] rounded-[1.75rem]",
  portrait: "aspect-[3/4] rounded-[1.9rem]",
  landscape: "aspect-[5/4] rounded-[1.6rem]",
  circle: "aspect-square rounded-full",
  polaroid: "aspect-[4/5] rounded-[1.4rem]",
};

const frameClasses = {
  soft: "border-white/80 bg-white/80 p-2 shadow-[0_20px_45px_rgba(15,23,42,0.16)] backdrop-blur-sm",
  polaroid:
    "border-white bg-white p-3 shadow-[0_24px_50px_rgba(15,23,42,0.18)]",
};

export function FloatingImageField({ items = [], className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 hidden md:block ${className}`}>
      {items.map((item, index) => (
        <RevealOnScroll
          key={`${item.alt}-${index}`}
          delay={item.delay || "0ms"}
          className={`absolute ${item.position} ${item.z || (item.layer === "back" ? "z-0" : "z-20")}`}
        >
          <DecorativeImageWindow item={item} />
        </RevealOnScroll>
      ))}
    </div>
  );
}

function DecorativeImageWindow({ item }) {
  const [loaded, setLoaded] = useState(false);

  const shape = shapeClasses[item.shape || "rounded"];
  const frame =
    item.frame === "polaroid" || item.shape === "polaroid"
      ? frameClasses.polaroid
      : frameClasses.soft;
  const layerClass = item.layer === "back" ? "opacity-65 saturate-90" : "opacity-100";

  return (
    <div
      className={`group overflow-hidden border transition duration-500 hover:-translate-y-1 hover:rotate-0 hover:shadow-[0_28px_60px_rgba(15,23,42,0.22)] ${shape} ${frame} ${layerClass} ${item.className || ""}`}
    >
      {/* Loader - shows while image is loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center z-10 animate-pulse">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin">
              <ImageIcon size={20} className="text-gray-400" />
            </div>
            <div className="w-6 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-purple-400 animate-shimmer" />
            </div>
          </div>
        </div>
      )}

      {/* Image */}
      <img
        src={item.image}
        alt={item.alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
