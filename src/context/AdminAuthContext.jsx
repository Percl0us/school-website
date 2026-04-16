import { createContext, useContext, useState, useEffect } from "react";
import { attachAdminToken } from "../lib/api"; // ✅ changed

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [academicYear, setAcademicYearState] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    const storedAdmin = localStorage.getItem("adminInfo");
    const storedYear = localStorage.getItem("adminAcademicYear");

    if (storedToken && storedAdmin) {
      setToken(storedToken);
      setAdmin(JSON.parse(storedAdmin));
      // ✅ use attachAdminToken to store in localStorage and (optionally) update axios defaults
      attachAdminToken(storedToken);
    }

    if (storedYear) {
      setAcademicYearState(storedYear);
    }

    setAuthReady(true);
  }, []);

  const login = (data) => {
    const { token, admin } = data;
    setAdmin(admin);
    setToken(token);

    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminInfo", JSON.stringify(admin));
    
    // ✅ use attachAdminToken to ensure the interceptor finds it
    attachAdminToken(token);
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
        authReady,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);