import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Menu, X, User, ChevronRight, 
  Home, School, BookOpen, Users, 
  Bell, Camera, Phone, LogIn 
} from "lucide-react";
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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track navbar height for drawer positioning
  useEffect(() => {
    if (!navRef.current) return;
    const updateHeight = () => setNavbarHeight(navRef.current.offsetHeight);
    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(navRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when drawer is open
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

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: School },
    { name: "Admissions", path: "/admissions", icon: LogIn, highlight: true },
    { name: "Academics", path: "/academics", icon: BookOpen },
    { name: "Faculty", path: "/faculty", icon: Users },
    { name: "Notices", path: "/events", icon: Bell },
    { name: "Gallery", path: "/gallery", icon: Camera },
    { name: "Contact", path: "/contact", icon: Phone },
  ];

  const handleStudentPortalClick = () => {
    studentSession ? navigate("/student/fees") : navigate("/student");
    setIsOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`w-full sticky top-0 z-[100] transition-all duration-300 font-body ${
          scrolled
            ? "bg-white/80 backdrop-blur-lg shadow-lg h-16"
            : "bg-white shadow-sm h-20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
            <img
              src={logo}
              alt="Tagore Public School Logo"
              className="h-9 w-auto rounded-lg transition-transform group-hover:scale-105 sm:h-10 md:h-12"
            />
            <div className="flex flex-col">
              <span className="font-henny text-base font-black text-gray-900 leading-tight group-hover:text-blue-700 transition-colors sm:text-lg md:text-xl pb-0.5">
                TAGORE <span className="text-red-600">PUBLIC</span>
              </span>
              <span className="font-dyna text-[8px] font-bold tracking-[0.2em] text-gray-500 uppercase sm:text-[10px] pb-0.5">
                School • Kalkha
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-dyna px-3 py-2 text-sm font-bold transition-all duration-200 rounded-xl relative group ${
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
              className="font-dyna flex items-center gap-2 px-4 py-2 bg-blue-700 text-white text-sm font-bold rounded-xl hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
            >
              <User size={16} />
              {studentSession ? "My Dashboard" : "Student Portal"}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl bg-gray-50 text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed right-0 bottom-0 w-full max-w-sm bg-white/95 backdrop-blur-md shadow-2xl z-[95] lg:hidden transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: `${navbarHeight}px` }}
      >
        {/* Drawer Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-dyna text-white/80 text-xs font-medium pb-0.5">Menu</p>
              <p className="font-henny text-white text-lg font-bold pb-0.5">Navigate to</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 -mr-1"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 shadow-sm"
                    : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                }`}
              >
                <Icon size={20} className={isActive ? "text-blue-600" : "text-gray-500"} />
                <span className={`font-dyna font-semibold text-base flex-1 ${isActive ? "text-blue-700" : ""} pb-0.5`}>
                  {link.name}
                </span>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Student Portal Button */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/80">
          <button
            onClick={handleStudentPortalClick}
            className="font-dyna w-full flex items-center justify-center gap-3 py-3.5 px-5 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-xl font-bold shadow-md active:scale-95 transition-all hover:shadow-lg"
          >
            <User size={18} />
            {studentSession ? "Dashboard" : "Student Portal"}
          </button>
          <p className="font-indie text-center text-[10px] text-gray-400 mt-2 pb-0.5">
            Access fees, results & more
          </p>
        </div>
      </div>
    </>
  );
}