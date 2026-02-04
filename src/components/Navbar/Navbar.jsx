import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import { useStudent } from "../../context/StudentContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { studentSession } = useStudent();

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

  const handleStudentPortalClick = () => {
    if (studentSession) {
      navigate("/student/fees");
    } else {
      navigate("/student");
    }
    setIsOpen(false);
  };

  return (
    <nav className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
          <span className="text-xl font-bold text-red-600">
            Tagore Public School
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 text-sm font-medium rounded 
                hover:border hover:shadow-sm ${
                  link.color || "text-gray-700"
                }`}
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={handleStudentPortalClick}
            className="ml-3 px-4 py-2 rounded-md text-sm font-semibold
              bg-blue-700 text-white hover:bg-blue-800 transition"
          >
            Student Portal
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-700"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2"
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={handleStudentPortalClick}
            className="w-full mt-2 px-4 py-3 bg-blue-700 text-white rounded"
          >
            Student Portal
          </button>
        </div>
      )}
    </nav>
  );
}
