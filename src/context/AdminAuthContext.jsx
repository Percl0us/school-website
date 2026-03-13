import { createContext, useContext, useState, useEffect } from "react";
import { attachToken } from "../lib/api";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [academicYear, setAcademicYearState] = useState(null);
  const [authReady, setAuthReady] = useState(false); // 👈 NEW

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    const storedAdmin = localStorage.getItem("adminInfo");
    const storedYear = localStorage.getItem("adminAcademicYear");

    if (storedToken && storedAdmin) {
      setToken(storedToken);
      setAdmin(JSON.parse(storedAdmin));
      attachToken(storedToken);
    }

    if (storedYear) {
      setAcademicYearState(storedYear);
    }

    setAuthReady(true); // 👈 IMPORTANT
  }, []);

  const login = (data) => {
    setAdmin(data.admin);
    setToken(data.token);

    localStorage.setItem("adminToken", data.token);
    localStorage.setItem(
      "adminInfo",
      JSON.stringify(data.admin)
    );

    attachToken(data.token);
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    setAcademicYearState(null);

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    localStorage.removeItem("adminAcademicYear");
  };

  const setAcademicYear = (year) => {
    setAcademicYearState(year);
    localStorage.setItem("adminAcademicYear", year);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        token,
        academicYear,
        setAcademicYear,
        login,
        logout,
        authReady, // 👈 expose
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () =>
  useContext(AdminAuthContext);