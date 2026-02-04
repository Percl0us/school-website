import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";
import {
  saveStudentLogin,
  getSavedStudentLogin,
  clearStudentLogin,
} from "./studentSessionStorage";

const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  const [studentSession, setStudentSession] = useState(null);
  const [bootstrapping, setBootstrapping] = useState(true);

  // 🔁 Rehydrate on reload
  useEffect(() => {
    const restoreSession = async () => {
      const saved = getSavedStudentLogin();
      if (!saved) {
        setBootstrapping(false);
        return;
      }

      try {
        const res = await api.post("/student/login", saved);
        setStudentSession(res.data);
      } catch {
        clearStudentLogin();
      } finally {
        setBootstrapping(false);
      }
    };

    restoreSession();
  }, []);

  const loginStudent = async ({ admissionNo, dob, academicYear }) => {
    const res = await api.post("/student/login", {
      admissionNo,
      dob,
      academicYear,
    });

    setStudentSession(res.data);
    saveStudentLogin({ admissionNo, dob, academicYear });
  };

  const logoutStudent = () => {
    setStudentSession(null);
    clearStudentLogin();
  };

  const refreshStudentSession = async () => {
    if (!studentSession) return;

    const res = await api.post("/student/login", {
      admissionNo: studentSession.student.admissionNo,
      dob: studentSession.student.dob,
      academicYear: studentSession.academic.academicYear,
    });

    setStudentSession(res.data);
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
