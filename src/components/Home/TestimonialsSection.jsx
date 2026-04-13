import { useState, useEffect } from "react";
import { Quote, Star, Heart } from "lucide-react";
import { RevealOnScroll } from "../shared/RevealOnScroll";

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
                <p className="font-indie text-gray-600 text-xl sm:text-2xl italic mb-6 leading-relaxed pb-2">
                  "{t.text}"
                </p>
                <div className="flex justify-center mb-2">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
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

export const TestimonialsSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <RevealOnScroll>
          <div className="text-center mb-12 py-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-100 to-orange-100 px-4 py-2 mb-4">
              <Heart size={14} className="text-pink-600" />
              <span className="font-dyna text-xs font-bold uppercase tracking-wider text-pink-700 sm:text-sm">
                Parents Speak
              </span>
            </div>
            <h2 className="p-2 font-henny text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.3] pb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              What Our Families Say
            </h2>
          </div>
        </RevealOnScroll>
        <TestimonialCarousel />
      </div>
    </section>
  );
};