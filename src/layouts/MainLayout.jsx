import { Navigate, Outlet, useLocation } from "react-router-dom";
// Note: Removed 'children' from props, added 'Outlet'

const MainLayout = ({ isAuthenticated, user ,children}) => {
  const location = useLocation();
  const path = location.pathname;

  // --- 🔑 Authentication/Redirection Logic ---

  // Handle root "/"
  if (path === "/") {
    if (!isAuthenticated) return <Navigate to="/auth/login" />;
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" />;
    if (user?.role === "user") return <Navigate to="/shop/home" />;
    // If authenticated and no role defined, allow it to continue to root component (if one exists)
  }

  // Protect admin routes
  if (path.includes("/admin")) {
    if (!isAuthenticated) return <Navigate to="/auth/login" />;
    if (user?.role === "user") return <Navigate to="/shop/home" />;
    // Allow admin access to continue
  }

  // Protect shop routes (Allow access if NOT admin)
  if (path.includes("/shop")) {
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" />;
    // Allow users and unauthenticated users to see shop if policies permit.
    // If shop requires auth, you would add: if (!isAuthenticated) return <Navigate to="/auth/login" />;
  }

  // Protect auth routes (only allow when not authenticated)
  if (path.includes("/auth")) {
    if (isAuthenticated && user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }
    if (isAuthenticated && user?.role === "user") {
      return <Navigate to="/shop/home" />;
    }
    // Allow unauthenticated access to auth pages to continue
  }

  // --- 🔑 Render Child Routes ---
  // If no redirection occurred, render the child route content via Outlet.
  // This is where the next element in the route hierarchy (e.g., ShopLayout) will be rendered.
  return (
    <div className="main-layout-wrapper"> 
        {/* You can add global headers/footers here if needed */}
        {children}
    </div>
  );
};

export default MainLayout;