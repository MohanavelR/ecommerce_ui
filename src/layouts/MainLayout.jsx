import { Navigate, useLocation } from "react-router-dom";

const MainLayout = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const path = location.pathname;

  // --- Root "/" ---
  if (path === "/") {
    if (!isAuthenticated) return <Navigate to="/auth/login" />;
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" />;
    if (user?.role === "user") return <Navigate to="/shop/home" />;
  }

  // --- Admin Routes ---
  if (path.includes("/admin")) {
    if (!isAuthenticated) return <Navigate to="/auth/login" />;
    if (user?.role !== "admin") return <Navigate to="/shop/home" />;
    // Admin can continue
  }

  // --- Shop Routes ---
  if (path.includes("/shop")) {
    // Redirect admins to dashboard
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" />;

    // Protected shop pages for authenticated users only
    const protectedShopRoutes = [
      "/shop/checkout",
      "/shop/profile",
      "/shop/orders",
      "/shop/cart"
    ];
    if (!isAuthenticated && protectedShopRoutes.includes(path)) {
      return <Navigate to="/auth/login" />;
    }

    // Redirect /shop to /shop/home
    if (path === "/shop") return <Navigate to="/shop/home" />;

    // All other shop pages (like /shop/home, /shop/products) render children
  }

  // --- Auth Routes ---
  if (path.includes("/auth")) {
    if (isAuthenticated && user?.role === "admin") return <Navigate to="/admin/dashboard" />;
    if (isAuthenticated && user?.role === "user") return <Navigate to="/shop/home" />;
     if (!isAuthenticated && path==="/auth") return <Navigate to="/auth/login" />;
   
  }

  // --- Render child routes if no redirect triggered ---
  return <div className="main-layout-wrapper">{children}</div>;
};

export default MainLayout;
