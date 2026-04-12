import { useState, useEffect, useRef } from "react";
import ContactEnquiryForm from "../components/ContactEnquiryForm/ContactEnquiryForm";
import { MapPin, Phone, Mail, Clock, Send, Sparkles, ChevronRight } from "lucide-react";

// Scroll Reveal Wrapper (consistent with other pages)
const RevealOnScroll = ({ children, delay = "0ms", className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`transform transition-all duration-1000 ${className} ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-12 opacity-0 scale-95"
      }`}
    >
      {children}
    </div>
  );
};

export default function Contact() {
  return (
    <div className="overflow-x-hidden scroll-smooth bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-12 sm:space-y-20">
        
        {/* Hero Section with gradient and animated blobs */}
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-3xl sm:rounded-[3rem] bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white shadow-2xl">
            {/* Animated blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
              <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl animate-bounce" style={{ animationDuration: "8s" }} />
              <div className="absolute bottom-0 right-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-2xl animate-spin-slow" />
            </div>

            <div className="relative z-10 p-6 sm:p-8 md:p-12">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 md:w-8 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                  <span className="text-blue-300 font-bold uppercase tracking-widest text-xs flex items-center gap-1">
                    <Sparkles size={12} className="text-yellow-300" /> Get In Touch
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight">
                  Contact Us
                </h1>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  Have questions about admissions or school life? Our dedicated team
                  is here to assist you. Visit us or drop a message below.
                </p>
              </div>
            </div>

            {/* Decorative send icon - hidden on mobile */}
            <div className="absolute top-[-20%] right-[-10%] opacity-10 hidden lg:block">
              <Send size={400} />
            </div>
          </div>
        </RevealOnScroll>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Left Column: Contact Details & Map */}
          <div className="space-y-10 md:space-y-12">
            <RevealOnScroll>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center gap-3">
                  School <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Details</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {/* Address Card - gradient background on hover */}
                  <div className="group p-5 md:p-6 rounded-2xl md:rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all hover:-translate-y-1">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                      <MapPin className="text-blue-600" size={20} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Tagore Public School,
                      <br />
                      Kalkha, Panipat, Haryana
                    </p>
                  </div>

                  {/* Phone/Email Card */}
                  <div className="group p-5 md:p-6 rounded-2xl md:rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all hover:-translate-y-1">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                      <Phone className="text-blue-600" size={20} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">Communication</h3>
                    <p className="text-gray-600 text-sm break-all">
                      <a href="tel:+918816000512" className="hover:text-blue-600 transition">+91-8816000512</a>
                      <br />
                      <a href="mailto:tagorekalkha@gmail.com" className="hover:text-blue-600 transition">tagorekalkha@gmail.com</a>
                    </p>
                  </div>

                  {/* Working Hours Card - full width on small screens */}
                  <div className="group p-5 md:p-6 rounded-2xl md:rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all hover:-translate-y-1 sm:col-span-2">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                        <Clock className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">Office Hours</h3>
                        <p className="text-gray-600 text-sm">
                          Monday to Saturday:{" "}
                          <span className="font-semibold text-blue-700">8:00 AM – 2:00 PM</span>
                        </p>
                        <p className="text-gray-500 text-xs mt-1">Sunday Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* Map Container with hover effect */}
            <RevealOnScroll delay="200ms">
              <div className="relative rounded-xl md:rounded-[2.5rem] overflow-hidden border-4 md:border-8 border-white shadow-xl group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.953036111588!2d76.84092749999999!3d29.342372100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ddd69cfaac1e9%3A0xd71ac98281bf4c0d!2sTagore%20Public%20School!5e0!3m2!1sen!2sin!4v1773409573655!5m2!1sen!2sin"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="School Location Map"
                  className="grayscale-[15%] group-hover:grayscale-0 transition-all duration-500 md:h-[380px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="relative">
            <div className="sticky top-24 space-y-6">
              <RevealOnScroll delay="100ms">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  Send an <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Enquiry</span>
                </h2>
              </RevealOnScroll>

              <RevealOnScroll delay="200ms">
                <div className="relative p-6 sm:p-8 lg:p-10 rounded-2xl md:rounded-[3rem] bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-shadow overflow-hidden">
                  {/* Decorative gradient blob */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50" />
                  
                  <div className="relative z-10">
                    <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-8 flex items-center gap-2">
                      <Sparkles size={16} className="text-blue-500" />
                      Fill out the form below and our admissions office will get back to you within 24 hours.
                    </p>
                    <ContactEnquiryForm />
                  </div>
                </div>
              </RevealOnScroll>

              {/* Direct Support Card with gradient background */}
              <RevealOnScroll delay="300ms">
                <div className="group p-5 md:p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl md:rounded-3xl text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="p-2 md:p-3 bg-white/20 rounded-xl md:rounded-2xl group-hover:scale-110 transition-transform">
                      <Mail size={20} className="md:w-6 md:h-6" />
                    </div>
                    <div>
                      <p className="text-blue-100 text-xs md:text-sm">Direct Support</p>
                      <a href="mailto:tagorekalkha@gmail.com" className="font-bold text-sm md:text-base hover:underline break-all">
                        tagorekalkha@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <RevealOnScroll>
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2 flex-wrap">
              <span>📞 Emergency Contact: +91-88160-00512</span>
              <span className="hidden sm:inline">•</span>
              <span>✉️ For general inquiries: info@tagorepublic.edu</span>
            </p>
          </div>
        </RevealOnScroll>
      </section>

      {/* CSS animations for spin-slow etc. (if not already global) */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce {
          animation: bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}