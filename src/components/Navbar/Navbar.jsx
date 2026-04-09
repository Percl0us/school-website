import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User, ChevronRight } from "lucide-react";
import logo from "../../assets/images/logo.jpg";
import { useStudent } from "../../context/StudentContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(80); // default h-20 = 80px
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { studentSession } = useStudent();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track navbar height for mobile overlay positioning
  useEffect(() => {
    if (!navRef.current) return;
    const updateHeight = () => setNavbarHeight(navRef.current.offsetHeight);
    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(navRef.current);
    return () => resizeObserver.disconnect();
  }, []);

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

  return (
    <nav
      ref={navRef}
      className={`w-full sticky top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-lg h-16"
          : "bg-white h-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative">
            <img
              src={logo}
              alt="Logo"
              className="h-10 md:h-12 w-auto rounded-lg transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-lg shadow-inner pointer-events-none" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black text-gray-900 leading-none group-hover:text-blue-700 transition-colors">
              TAGORE <span className="text-red-600">PUBLIC</span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
              School • Kalkha
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - now shows from lg (1024px) */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-bold transition-all duration-200 rounded-xl relative group ${
                  isActive
                    ? "text-blue-700 bg-blue-50"
                    : link.highlight
                    ? "text-blue-600 hover:text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-blue-600 rounded-full" />
                )}
              </Link>
            );
          })}

          <div className="h-6 w-[1px] bg-gray-200 mx-4" />

          <button
            onClick={handleStudentPortalClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-700 text-white text-sm font-bold rounded-xl hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
          >
            <User size={16} />
            {studentSession ? "My Dashboard" : "Student Portal"}
          </button>
        </div>

        {/* Mobile Toggle - visible only below lg */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-gray-50 text-gray-900 hover:bg-gray-100 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay - dynamic top position */}
      <div
        className={`fixed left-0 right-0 bg-white z-[90] lg:hidden transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: `${navbarHeight}px` }}
      >
        <div className="p-6 flex flex-col h-[calc(100vh-var(--navbar-height,80px))] overflow-y-auto">
          <div className="space-y-2 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 hover:text-blue-700 transition-all group"
              >
                <span className="font-bold text-lg text-gray-800 group-hover:text-blue-700">
                  {link.name}
                </span>
                <ChevronRight
                  size={20}
                  className="text-gray-400 group-hover:translate-x-1 transition-transform"
                />
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-100">
            <button
              onClick={handleStudentPortalClick}
              className="w-full flex items-center justify-center gap-3 p-5 bg-blue-700 text-white rounded-2xl font-black shadow-xl shadow-blue-100"
            >
              <User size={20} />
              {studentSession ? "Go to Dashboard" : "Student Portal Login"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}