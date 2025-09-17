import React from "react";
import Logo from "../../common/Logo";
import { useSelector } from "react-redux";
import { useState } from "react";
import MediumDeviceHeader from "./header/MediumDeviceHeader";
import MobileViewHeader from "./header/MobileViewHeader";

const ShopHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // State to manage which dropdown is open

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <>
      <header className="w-full bg-white shadow-md">
        {/* Top Header */}
        <div className="py-3 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Logo />
            </div>

            {/* Mobile Menu & Search Button */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                className="relative p-1 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setOpenMenu(!openMenu)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>

            {/* User Actions (visible on medium screens and up) */}
            <div className="md:flex items-center space-x-2">
                      <div className="flex justify-center">
            <div className="relative group">
                {/* <!-- User Icon Button --> */}
               <button className="relative p-1 text-gray-700 hover:text-blue-600 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">1</span> */}
              </button>

                
                {/* <!-- Dropdown Menu --> */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-1 z-[100]">
                    {/* <!-- User Info Section --> */}
                    <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                        <p className="text-sm text-gray-500">john.doe@example.com</p>
                    </div>
                    
                    {/* <!-- Menu Items --> */}
                    <div className="py-1">
                        {/* <!-- Verify Link --> */}
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Verify Account
                        </a>
                        
                        {/* <!-- Logout Link --> */}
                        <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>
        

              <button className="relative p-1 text-gray-700 hover:text-blue-600 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Header (Sticky Navigation) */}
  <MediumDeviceHeader/>

        {/* Mobile menu (hidden by default) */}
       <MobileViewHeader openDropdown={openDropdown} toggleDropdown={toggleDropdown} openMenu={openMenu} />
      </header>
    </>
  );
};

export default ShopHeader;