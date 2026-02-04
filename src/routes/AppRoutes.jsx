import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Admissions from "../pages/Admissions";
import Contact from "../pages/Contact";
import Faculty from "../pages/Faculty";
import Academics from "../pages/Academics";
import EventsNotices from "../pages/EventsNotices";
import Facilities from "../pages/Facilities";
import Gallery from "../pages/Gallery";
import Downloads from "../pages/Downloads";
import StudentLogin from "../pages/Student/StudentLogin";
import StudentLayout from "../pages/Student/StudentLayout";
import StudentFees from "../pages/Student/Fees";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/admissions" element={<Admissions />} />
      <Route path="/faculty" element={<Faculty />} />
      <Route path="/academics" element={<Academics />} />
      <Route path="/events" element={<EventsNotices />} />
      <Route path="/facilities" element={<Facilities />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/downloads" element={<Downloads />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/student" element={<StudentLogin />} />

      <Route path="/student" element={<StudentLayout />}>
        <Route path="fees" element={<StudentFees />} />
      </Route>
    </Routes>
  );
}
