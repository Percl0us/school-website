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
      <img
        src={item.image}
        alt={item.alt}
        loading="lazy"
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
    </div>
  );
}
