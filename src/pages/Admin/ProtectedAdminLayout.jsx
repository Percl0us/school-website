import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function ProtectedAdminLayout() {
  const { token, authReady } = useAdminAuth();

  // Wait until auth restoration completes
  if (!authReady) {
    return <div className="p-6">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}