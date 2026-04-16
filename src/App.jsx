import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { ToastProvider } from "./components/ui/ToastProvider";
import AppRoutes from "./routes/AppRoutes";
import { StudentProvider } from "./context/StudentContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";

// ScrollToTop component to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function LayoutWrapper({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return children; // no public navbar/footer
  }

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-md">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-grow">
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
        <ToastProvider>
          <div className="min-h-screen flex flex-col">
            <ScrollToTop />
            <LayoutWrapper>
              <AppRoutes />
            </LayoutWrapper>
          </div>
        </ToastProvider>
      </StudentProvider>
    </AdminAuthProvider>
  );
}
