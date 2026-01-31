import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* School Name / Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="ABC Public School Logo"
            className="h-10 w-auto"
          />
          <span className="text-lg font-semibold text-red-600">
            Tagore Public School
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-1 items-center">
          <Link
            to="/about"
            className="px-3 py-2 rounded border border-transparent 
             hover:border-gray-300 hover:shadow-sm 
             transition duration-300"
          >
            About Us
          </Link>

          <Link
            to="/admissions"
            className="px-3 py-2 text-blue-700 rounded border border-transparent 
             hover:border-gray-300 hover:shadow-sm 
             transition duration-300"
          >
            Admissions
          </Link>
          <Link
            to="/faculty"
            className="px-3 py-2 rounded border border-transparent 
             hover:border-gray-300 hover:shadow-sm 
             transition duration-300"
          >
            Faculty
          </Link>
          <Link
            to="/academics"
            className="px-3 py-2 rounded border border-transparent 
             hover:border-gray-300 hover:shadow-sm 
             transition duration-300"
          >
            Academics
          </Link>
          <Link
            to="/events"
            className="px-3 py-2 rounded border border-transparent 
             hover:border-gray-300 hover:shadow-sm 
             transition duration-300"
          >
            Events & Notices
          </Link>
          <Link
            to="/facilities"
            className="px-3 py-2 rounded border border-transparent 
             hover:border-gray-300 hover:shadow-sm 
             transition duration-300"
          >
            Facilities
          </Link>
          <Link
            to="/gallery"
            className="px-3 py-2 rounded border border-transparent 
             hover:border-gray-300 hover:shadow-sm 
             transition duration-300"
          >
            Gallery
          </Link>

          <Link
            to="/contact"
            className="px-3 py-2 rounded border border-transparent 
             hover:border-gray-300 hover:shadow-sm 
             transition duration-300"
          >
            Contact
          </Link>
          <Link
            to="/downloads"
            className="px-3 py-2 rounded border border-transparent 
             hover:border-gray-300 hover:shadow-sm 
             transition duration-300"
          >
            Downloads
          </Link>
        </div>
      </div>
    </nav>
  );
}
