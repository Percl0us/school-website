import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Youtube,
  ChevronUp 
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Main Footer Grid - Responsive */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* School Info with Logo Placeholder */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-white">
                Tagore Public <span className="text-blue-400">School</span>
              </h3>
              <p className="text-sm leading-relaxed">
                Affiliated to HBSE <br />
                Classes LKG to XII <br />
                Empowering minds, shaping futures.
              </p>
            </div>

            {/* Contact Details with Icons */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <Mail size={18} className="text-blue-400" /> Contact Us
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-blue-400" />
                  <span>Tagore Public School, Kalkha, Panipat, Haryana</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="shrink-0 text-blue-400" />
                  <a href="tel:+918816000512" className="hover:text-blue-400 transition">
                    +91-8816000512
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="shrink-0 text-blue-400" />
                  <a href="mailto:tagorekalkha@gmail.com" className="hover:text-blue-400 transition">
                    tagorekalkha@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Office Hours */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                <Clock size={18} className="text-blue-400" /> Office Hours
              </h4>
              <ul className="space-y-2 text-sm">
                <li>Monday – Saturday</li>
                <li className="font-semibold text-blue-300">8:00 AM – 2:00 PM</li>
                <li className="text-gray-400 text-xs">Sunday Closed</li>
              </ul>
            </div>

            {/* Quick Links & Social */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/about" className="hover:text-blue-400 transition flex items-center gap-2">
                    → About Us
                  </Link>
                </li>
                <li>
                  <Link to="/admissions" className="hover:text-blue-400 transition flex items-center gap-2">
                    → Admissions
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="hover:text-blue-400 transition flex items-center gap-2">
                    → Notice Board
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-blue-400 transition flex items-center gap-2">
                    → Contact
                  </Link>
                </li>
              </ul>

              {/* Social Media Icons */}
              <div className="flex gap-4 pt-2">
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-all hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-all hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 my-8"></div>

          {/* Copyright & Scroll to Top */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <p>
              © {new Date().getFullYear()} Tagore Public School. All rights reserved.
            </p>
            <p className="text-gray-500">
              Designed with ❤️ for students & parents
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button - appears on mobile after scroll */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </>
  );
}