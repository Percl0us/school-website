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
import AdminFinanceDashboard from "../pages/Admin/AdminFinanceDashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminLayout from "../pages/Admin/AdminLayout";
import ProtectedAdminLayout from "../pages/Admin/ProtectedAdminLayout";
import AdminLogin from "../pages/Admin/AdminLogin";
import StudentList from "../pages/Admin/Students/StudentList";
import CreateStudent from "../pages/Admin/Students/CreateStudent";
import PromoteStudents from "../pages/Admin/Students/PromoteStudents";
import FinanceDashboard from "../pages/Admin/Finance/FinanceDashboard";
import AdminNotices from "../pages/Admin/pages/AdminNotices";

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
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin" element={<ProtectedAdminLayout />}>
        <Route element={<AdminLayout />}>
          <Route path="notices" element={<AdminNotices />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<StudentList />} />
          <Route path="students/create" element={<CreateStudent />} />
          <Route path="students/promote" element={<PromoteStudents />} />
          <Route path="finance" element={<FinanceDashboard />} />
          <Route path="finance" element={<AdminFinanceDashboard />} />
        </Route>
      </Route>
      <Route path="/student" element={<StudentLayout />}>
        <Route path="fees" element={<StudentFees />} />
      </Route>
    </Routes>
  );
}
