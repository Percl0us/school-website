import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User, ChevronRight } from "lucide-react";
import logo from "../../assets/images/logo.jpg";
import { useStudent } from "../../context/StudentContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(80);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { studentSession } = useStudent();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const updateHeight = () => setNavbarHeight(navRef.current.offsetHeight);
    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(navRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Admissions", path: "/admissions", highlight: true },
    { name: "Academics", path: "/academics" },
    { name: "Faculty", path: "/faculty" },
    { name: "Notices", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const handleStudentPortalClick = () => {
    studentSession ? navigate("/student/fees") : navigate("/student");
    setIsOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`w-full sticky top-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-lg shadow-lg h-16"
            : "bg-white shadow-sm h-20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-full">
          {/* Logo Section - improved tap area */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
            <div className="relative">
              <img
                src={logo}
                alt="Tagore Public School Logo"
                className="h-9 w-auto rounded-lg transition-transform group-hover:scale-105 sm:h-10 md:h-12"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black text-gray-900 leading-tight group-hover:text-blue-700 transition-colors sm:text-lg md:text-xl">
                TAGORE <span className="text-red-600">PUBLIC</span>
              </span>
              <span className="text-[8px] font-bold tracking-[0.2em] text-gray-500 uppercase sm:text-[10px]">
                School • Kalkha
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - hidden on tablet/mobile */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-bold transition-all duration-200 rounded-xl relative group ${
                    isActive
                      ? "text-blue-700 bg-blue-50"
                      : link.highlight
                      ? "text-blue-600 hover:text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </Link>
              );
            })}

            <div className="h-6 w-[1px] bg-gray-200 mx-2" />

            <button
              onClick={handleStudentPortalClick}
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white text-sm font-bold rounded-xl hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
            >
              <User size={16} />
              {studentSession ? "My Dashboard" : "Student Portal"}
            </button>
          </div>

          {/* Mobile Menu Toggle - larger tap area */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl bg-gray-50 text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay (dark backdrop) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer - slides from right, dynamic top offset */}
      <div
        className={`fixed right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-[95] lg:hidden transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: `${navbarHeight}px` }}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Menu Items */}
          <div className="flex-1 px-4 py-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 active:bg-blue-100 transition-all group"
              >
                <span className="font-bold text-base text-gray-800 group-hover:text-blue-700">
                  {link.name}
                </span>
                <ChevronRight
                  size={20}
                  className="text-gray-400 group-hover:translate-x-1 group-hover:text-blue-500 transition-all"
                />
              </Link>
            ))}
          </div>

          {/* Student Portal Button */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <button
              onClick={handleStudentPortalClick}
              className="w-full flex items-center justify-center gap-3 py-4 px-5 bg-blue-700 text-white rounded-xl font-bold shadow-md active:scale-95 transition-all hover:bg-blue-800"
            >
              <User size={20} />
              {studentSession ? "Go to Dashboard" : "Student Portal Login"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}