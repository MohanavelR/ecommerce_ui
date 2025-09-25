import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate ,NavLink} from 'react-router-dom';
import Logo from '../../common/Logo';
import { LogoutContext, MessageContext } from '../../../context/context';

const AdminSidebar = ({sidebarOpen,setSidebarOpen}) => {
  const {logoutContextState,setLogoutContextState} =useContext(LogoutContext)
  const navigate=useNavigate()
    const navigation = [
      { name: "Dashboard", href: "/admin/dashboard", icon: ""},
      { name: "Products", href: "/admin/products", icon: ""},
      { name: "Categories", href: "/admin/categories", icon: "" },
      { name: "Orders", href: "/admin/orders", icon: "" },
      { name: "Users", href: "/admin/users", icon: "" },
      { name: "Reports", href: "/admin/reports", icon: "" },
    ];
return (
  <>
      <aside className={`
              fixed inset-y-0 min-h-screen left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
              <div className="flex flex-col h-full pt-16 lg:pt-0">
                <nav className="flex-1 px-4 py-6 space-y-2">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      end={item.href === "/admin"}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-foreground hover:bg-accent hover:text-primary'
                        }`
                      }
                      onClick={() => setSidebarOpen(false)}
                    >
                    <span className='text-accent-foreground'>{item.icon}</span>
                      <span>{item.name}</span>
                    </NavLink>
                  ))}
                </nav>
              </div>
            </aside>
    
  </>

  );
};

export default AdminSidebar;
