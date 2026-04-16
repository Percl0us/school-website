import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";

const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  const [studentSession, setStudentSession] = useState(null);
  const [bootstrapping, setBootstrapping] = useState(true);

  // On app load, restore token and session from localStorage
  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    const sessionData = localStorage.getItem("studentSession");

    if (token && sessionData) {
      // Attach token to API defaults
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setStudentSession(JSON.parse(sessionData));
    }
    setBootstrapping(false);
  }, []);

  const loginStudent = async ({ admissionNo, dob, academicYear }) => {
    const res = await api.post("/student/login", {
      admissionNo,
      dob,
      academicYear,
    });
    const { token, student, academic, feeAccount, discounts, payments } =
      res.data;

    // Store token in localStorage (interceptor will pick it up automatically)
    localStorage.setItem("studentToken", token);

    const session = { student, academic, feeAccount, discounts, payments };
    localStorage.setItem("studentSession", JSON.stringify(session));
    setStudentSession(session);
  };

  const logoutStudent = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentSession");
    delete api.defaults.headers.common["Authorization"];
    setStudentSession(null);
  };

  const refreshStudentSession = async () => {
    if (!studentSession) return;

    const res = await api.post("/student/login", {
      admissionNo: studentSession.student.admissionNo,
      dob: studentSession.student.dob,
      academicYear: studentSession.academic.academicYear,
    });

    const { token, student, academic, feeAccount, discounts, payments } =
      res.data;

    localStorage.setItem("studentToken", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const session = { student, academic, feeAccount, discounts, payments };
    localStorage.setItem("studentSession", JSON.stringify(session));
    setStudentSession(session);
  };

  return (
    <StudentContext.Provider
      value={{
        studentSession,
        loginStudent,
        logoutStudent,
        refreshStudentSession,
        bootstrapping,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => useContext(StudentContext);
