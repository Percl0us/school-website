import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About Us", path: "/about" },
    { name: "Admissions", path: "/admissions", color: "text-blue-700" },
    { name: "Faculty", path: "/faculty" },
    { name: "Academics", path: "/academics" },
    { name: "Events & Notices", path: "/events" },
    { name: "Facilities", path: "/facilities" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
    { name: "Downloads", path: "/downloads" },
  ];

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
          <span className="text-xl font-bold text-red-600 leading-tight">
            Tagore Public School
          </span>
        </Link>

        {/* Desktop Links (Hidden on Mobile) */}
        <div className="hidden lg:flex gap-1 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded text-sm font-medium border border-transparent 
                hover:border-gray-300 hover:shadow-sm transition duration-300 ${link.color || "text-gray-700"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 outline-none p-2"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar/Menu */}
      <div className={`${isOpen ? "block" : "hidden"} lg:hidden bg-white border-t`}>
        <div className="flex flex-col p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}