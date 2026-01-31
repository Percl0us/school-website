import { Link } from "react-router-dom";
import announcements from "../data/announcements";
import usp from "../data/usp";
import academicsSnapshot from "../data/academicsSnapshot";
import facilities from "../data/facilities";
import achievements from "../data/achievements";
import studentLife from "../data/studentLife";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null); // "admissions" | "about" | null

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative isolate bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
          {/* School Name */}
          <h1 className="text-4xl font-bold mb-4">
            <span className="inline-block px-6 py-3 rounded bg-red-50/50 text-red-600 backdrop-blur-sm shadow-sm">
              Tagore Public School
            </span>
          </h1>

          {/* Affiliation line */}
          <p className="text-lg mb-2">
            <span className="inline-block px-4 py-2 rounded bg-red-50/50 text-red-600 backdrop-blur-sm">
              Affiliated to HBSE | Classes LKG to XII
            </span>
          </p>

          {/* Description */}
          <p className="max-w-2xl mx-auto mb-8">
            <span className="inline-block px-6 py-4 rounded bg-white/55 text-gray-900 backdrop-blur-sm shadow-sm">
              A nurturing environment focused on academic excellence, character
              building, and holistic development of every student.
            </span>
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <Link
              to="/admissions"
              onClick={(e) => {
                e.preventDefault();
                setLoading("admissions");
                setTimeout(() => {
                  navigate("/admissions");
                }, 700);
              }}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded font-medium"
            >
              {loading === "admissions" && (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Apply for Admission
            </Link>

            <Link
              to="/about"
              onClick={(e) => {
                e.preventDefault();
                setLoading("about");
                setTimeout(() => {
                  navigate("/about");
                }, 700);
              }}
              className="text-white flex items-center gap-2 border border-white/70 px-6 py-3 rounded font-medium"
            >
              {loading === "about" && (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold mb-6">Latest Announcements</h2>

        <div className="space-y-4">
          {announcements.map((item) => (
            <div
              key={item.id}
              className="border rounded p-4 flex justify-between items-center"
            >
              <span>{item.title}</span>
              <span className="text-sm text-gray-500">{item.date}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link to="/events" className="text-blue-600 font-medium">
            View all notices →
          </Link>
        </div>
      </section>
      {/* Why Choose Our School */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-10">
            Why Choose Our School
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {usp.map((item) => (
              <div key={item.id} className="bg-white border rounded p-6">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Academics Snapshot */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-10">
            Academics at a Glance
          </h2>

          <div className="grid gap-6 md:grid-cols-4">
            {academicsSnapshot.map((item) => (
              <div key={item.id} className="border rounded p-6 text-center">
                <h3 className="text-sm text-gray-500 mb-2">{item.title}</h3>
                <p className="text-lg font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Facilities Highlights */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-10">
            Our Facilities
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {facilities.map((item, index) => (
              <div
                key={index}
                className="bg-white border rounded p-4 text-center"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Achievements Highlights */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-10">
            Our Achievements
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {achievements.map((item) => (
              <div key={item.id} className="border rounded p-6">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Student Life Preview */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-10">
            Student Life at Our School
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {studentLife.map((item) => (
              <div key={item.id} className="bg-white border rounded p-6">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
