import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import { StudentProvider } from "./context/StudentContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { useLocation } from "react-router-dom";

function LayoutWrapper({ children }) {
  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return children; // no public navbar/footer
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <StudentProvider>
        <div className="min-h-screen flex flex-col">
          <LayoutWrapper>
            <AppRoutes />
          </LayoutWrapper>
        </div>
      </StudentProvider>
    </AdminAuthProvider>
  );
}