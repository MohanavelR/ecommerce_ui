import React, { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "../../common/Logo";
import { LogoutContext } from "../../../context/context";
import CloseBtn from "../../common/CloseBtn";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { setLogoutContextState } = useContext(LogoutContext);
  const navigate = useNavigate();

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <i className="fas fa-chart-line"></i>,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: <i className="fas fa-box"></i>,
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: <i className="fas fa-tags"></i>,
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: <i className="fas fa-shopping-cart"></i>,
    },
    {
      name: "Users",
      href: "/admin/customers",
      icon: <i className="fas fa-users"></i>,
    },
    {
      name: "Ad/Banners",
      href: "/admin/ad-banner",
      icon: <i className="fas fa-chart-bar"></i>,
    },
    {
      name: "Slider",
      href: "/admin/slider",
      icon: <i className="fas fa-image"></i>,
    },
    {
      name: "Coming soon",
      href: "/admin/coming-soon",
      icon: <i className="fas fa-clock"></i>,
    },
  ];

  const handleLogout = () => {
    setLogoutContextState(true);
  };

  return (
    <>
      <aside
        className={`
          fixed inset-y-0 px-4 lg:w-64 lg:static left-0 z-[200] w-72 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:inset-0 flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close Button for Mobile */}
        <div
          onClick={() => setSidebarOpen(false)}
          className="absolute lg:hidden cursor-pointer right-2 top-2 z-10"
        >
          <CloseBtn />
        </div>

        {/* Brand/Logo Section (Visible on both mobile and desktop) */}
        <div className="flex flex-col md:hidden items-center pt-5 pb-4 lg:border-b lg:border-accent">
          {/* The Logo component is used here */}
          <Logo />
        </div>
        <div className="lg:hidden border-b border-accent mb-4"></div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 
                ${
                  // === ACTIVE LINK STYLE (Using bg-primary as requested) ===
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-700 hover:bg-primary/15 hover:text-primary"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="w-5 text-center">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center justify-start w-full space-x-3 px-3 py-2 text-sm font-medium rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors duration-200"
          >
            <span className="w-5 text-center">
              <i className="fas fa-sign-out-alt"></i>
            </span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
