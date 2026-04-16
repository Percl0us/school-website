import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Automatically attach the appropriate token based on which role is logged in
api.interceptors.request.use((config) => {
  // For admin routes, prefer admin token
  if (config.url?.startsWith("/admin")) {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
      return config;
    }
  }
  
  // For non-admin routes (or if no admin token), try student token
  const studentToken = localStorage.getItem("studentToken");
  if (studentToken) {
    config.headers.Authorization = `Bearer ${studentToken}`;
  }
  
  return config;
});

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper to attach student token manually (used after student login)
export const attachStudentToken = (token) => {
  localStorage.setItem("studentToken", token);
};

// Helper to attach admin token manually (used after admin login)
export const attachAdminToken = (token) => {
  localStorage.setItem("adminToken", token);
};

// Clear all tokens (logout)
export const clearTokens = () => {
  localStorage.removeItem("studentToken");
  localStorage.removeItem("adminToken");
  delete api.defaults.headers.common["Authorization"];
};

export default api;