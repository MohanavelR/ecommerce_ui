import React from 'react'

const MobileViewHeader = ({openDropdown,toggleDropdown, openMenu}) => {
  return (
    <>
       <div
          className={`md:hidden bg-gray-100 transition-all duration-300 ease-in-out overflow-hidden ${
            openMenu ? "max-h-screen py-3" : "max-h-0"
          }`}
        >
          <div className="px-4">
            {/* Search Bar */}
            {/* <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div> */}

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-2">
              {/* Dropdown 1 - Mobile */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("Electronics")}
                  className="w-full py-2 px-4 flex items-center justify-between text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                >
                  <span>Electronics</span>
                  <svg
                    className={`h-4 w-4 transform transition-transform duration-200 ${
                      openDropdown === "Electronics" ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  className={`pl-4 transition-all duration-300 ease-in-out overflow-hidden ${
                    openDropdown === "Electronics" ? "max-h-96 py-1" : "max-h-0"
                  }`}
                >
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Smartphones</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Laptops</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Cameras</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Audio</a>
                </div>
              </div>

              {/* Dropdown 2 - Mobile */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("Fashion")}
                  className="w-full py-2 px-4 flex items-center justify-between text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                >
                  <span>Fashion</span>
                  <svg
                    className={`h-4 w-4 transform transition-transform duration-200 ${
                      openDropdown === "Fashion" ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div
                  className={`pl-4 transition-all duration-300 ease-in-out overflow-hidden ${
                    openDropdown === "Fashion" ? "max-h-96 py-1" : "max-h-0"
                  }`}
                >
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Men's Clothing</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Women's Clothing</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Shoes</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Accessories</a>
                </div>
              </div>
              {/* Add more mobile dropdowns here */}
              <a href="#" className="py-2 px-4 block text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">Deals</a>
              <a href="#" className="py-2 px-4 block text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">Services</a>
            </nav>
            
          </div>
        </div>
    </>
  )
}

export default MobileViewHeader
