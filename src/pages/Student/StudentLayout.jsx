import { Outlet, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useStudent } from "../../context/StudentContext";
import { useState } from "react";
import ConfirmModal from "../../components/modal/ConfirModal";
import Spinner from "../../components/ui/Spinner";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

export default function StudentLayout() {
  const navigate = useNavigate();
  const { studentSession, bootstrapping, logoutStudent } = useStudent();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // ⏳ Wait for session rehydration
  if (bootstrapping) {
    return <div className="p-6">Restoring session...</div>;
  }

  // 🔒 No session after bootstrapping → login
  if (!studentSession) {
    return <Navigate to="/student" replace />;
  }

  const { student, academic } = studentSession;

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    setLoggingOut(true);

    // Give a calm 1s transition
    setTimeout(() => {
      logoutStudent();
      navigate("/student", { replace: true });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-4 mb-4 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 text-xl font-bold text-blue-700 shadow-sm">
              {student.profileImageUrl ? (
                <img
                  src={student.profileImageUrl}
                  alt={student.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                getInitials(student.name)
              )}
            </div>

            <div>
              <h1 className="text-lg font-semibold">Student Portal</h1>

            <div className="text-sm text-gray-600 mt-1">
              {student.name} · Class {academic.class}
              {academic.section ? `-${academic.section}` : ""} · Academic Year{" "}
              {academic.academicYear}
            </div>

            <div className="text-xs text-gray-500 mt-1">
              Admission No: {student.admissionNo}
            </div>

            {(student.fatherName || student.motherName) && (
              <div className="text-xs text-gray-500 mt-2">
                {student.fatherName ? `Father: ${student.fatherName}` : ""}
                {student.fatherName && student.motherName ? " · " : ""}
                {student.motherName ? `Mother: ${student.motherName}` : ""}
              </div>
            )}
          </div>
          </div>

          {/* Logout button */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-4">
          <div className="flex border-b">
            <NavLink
              to="/student/fees"
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium ${
                  isActive
                    ? "border-b-2 border-blue-700 text-blue-700"
                    : "text-gray-600"
                }`
              }
            >
              Fees
            </NavLink>

            <NavLink
              to="/student/results"
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium ${
                  isActive
                    ? "border-b-2 border-blue-700 text-blue-700"
                    : "text-gray-600"
                }`
              }
            >
              Results
            </NavLink>
          </div>
        </div>

        {/* Page Content */}
        <Outlet />
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <ConfirmModal
          title="Logout"
          message="You will be signed out of the student portal. You can log in again anytime using your admission number and date of birth."
          confirmText="Logout"
          cancelText="Cancel"
          onCancel={() => setShowLogoutConfirm(false)}
          onConfirm={handleConfirmLogout}
        />
      )}

      {/* ⏳ Logout Loader */}
      {loggingOut && (
        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl px-8 py-6 shadow-lg">
            <Spinner label="Signing out…" />
          </div>
        </div>
      )}
    </div>
  );
}
