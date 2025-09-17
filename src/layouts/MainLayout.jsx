import { Navigate, useLocation } from "react-router-dom";

const MainLayout = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const path = location.pathname;

  // Handle root "/"
  if (path === "/") {
    if (!isAuthenticated) return <Navigate to="/auth/login" />;
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" />;
    if (user?.role === "user") return <Navigate to="/shop"/>;
  }

  // Protect admin routes
  if (path.includes("/admin")) {
    if (!isAuthenticated) return <Navigate to="/auth/login" />;
    if (user?.role === "user") return <Navigate to="/shop" />;
  }

  // Protect shop routes
  if (path.includes("/shop")) {
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" />;
  }

  // Protect auth routes (only allow when not authenticated)
  if (path.includes("/auth")) {
    if (isAuthenticated && user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }
    if (isAuthenticated && user?.role === "user") {
      return <Navigate to="/shop" />;
    }
  }

  return <>{children}</>;
};

export default MainLayout;
