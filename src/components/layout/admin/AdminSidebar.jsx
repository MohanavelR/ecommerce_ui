import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate ,NavLink} from 'react-router-dom';
import Logo from '../../common/Logo';
import { LogoutContext, MessageContext } from '../../../context/context';
import CloseBtn from '../../common/CloseBtn';

const AdminSidebar = ({sidebarOpen,setSidebarOpen}) => {
  const {logoutContextState,setLogoutContextState} =useContext(LogoutContext)
  const navigate=useNavigate()
    const navigation = [
      { name: "Dashboard", href: "/admin/dashboard", icon: <i className="fas fa-chart-line text-indigo-600 "></i>},
      { name: "Products", href: "/admin/products", icon: <i className="fas fa-box text-indigo-600"></i>},
      { name: "Categories", href: "/admin/categories", icon: <i className="fas fa-tags text-indigo-600"></i> },
      { name: "Orders", href: "/admin/orders", icon: <i className="fas fa-shopping-cart text-indigo-600"></i> },
      { name: "Users", href: "/admin/Customers", icon:  <i className="fas fa-users text-indigo-600"></i> },
      { name: "Ad/Banners", href: "/admin/ad-banner", icon: <i className="fas fa-chart-bar text-indigo-600"></i> },
      { name: "Slider", href: "/admin/slider", icon:<i className="fas fa-bullhorn text-indigo-600"></i> },
      { name: "Coming soon", href: "/admin/coming-soon", icon: <i className="fas fa-bullhorn text-indigo-600"></i>},
    ];
return (
  <>

      <aside className={`
              fixed inset-y-0 px-4 lg:w-64 lg:static  left-0 z-[200]  w-72  bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0  lg:inset-0
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
              <div onClick={()=>setSidebarOpen(!sidebarOpen)} className='absolute lg:hidden cursor-pointer right-2 top-2'>
      <CloseBtn/>
    </div> 
                <div className='flex lg:hidden justify-center mt-5 border-b border-accent'>
                <Logo/>
                </div>
              <div className="flex flex-col h-full pt-5 lg:pt-0">
                <nav className="flex-1 px-4 py-6 space-y-4">
                  {navigation.map((item) => (
                    <NavLink
                      
                      key={item.name}
                      to={item.href}
                      end={item.href === "/admin"}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2 font-medium rounded-lg transition-colors duration-200 ${
                          isActive
                            ? 'bg-primary text-accent '
                            : 'text-primary bg-primary/10  hover:bg-accent hover:text-primary'
                        }`
                      }
                      onClick={() => setSidebarOpen(false)}
                    >
                    <span className=''>{item.icon}</span>
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
