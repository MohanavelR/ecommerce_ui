import React from 'react'
import { Link } from 'react-router-dom';

// Placeholder Data for Mega Menu (Using the same data, but structured as columns)
const MEGA_MENU_COLUMNS = [
    {
        title: "Electronics",
        path: "/shop/electronics",
        items: [
            { name: "Smartphones", path: "/shop/electronics/phones" },
            { name: "Laptops & PCs", path: "/shop/electronics/laptops" },
            { name: "Cameras & Drones", path: "/shop/electronics/cameras" },
            { name: "Audio & Speakers", path: "/shop/electronics/audio" },
        ]
    },
    {
        title: "Apparel & Fashion",
        path: "/shop/apparel",
        items: [
            { name: "Men's Clothing", path: "/shop/apparel/men" },
            { name: "Women's Clothing", path: "/shop/apparel/women" },
            { name: "Footwear", path: "/shop/apparel/shoes" },
            { name: "Accessories & Bags", path: "/shop/apparel/accessories" },
        ]
    },
    {
        title: "Home & Outdoors",
        path: "/shop/home-goods",
        items: [
            { name: "Kitchenware", path: "/shop/home-goods/kitchen" },
            { name: "Furniture", path: "/shop/home-goods/furniture" },
            { name: "Garden & Patio", path: "/shop/home-goods/garden" },
            { name: "Lighting & Decor", path: "/shop/home-goods/lighting" },
        ]
    },
];

const MediumDeviceHeader = () => {
  return (
    <>
        <nav className="hidden lg:flex items-center z-[9999] space-x-6 xl:space-x-8 font-medium">
            {/* Home Link */}
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 relative group">
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </Link>

            {/* Shop Dropdown (Kept Simple) */}
            <div className="relative group">
                <button className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 flex items-center space-x-1 relative">
                    <span>Shop</span>
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50">
                    <div className="py-2">
                        <Link to="/shop" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200">
                            All Products
                        </Link>
                        <hr className='my-1 border-gray-100'/>
                        <Link to="/shop?filter=new" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200">
                            New Arrivals
                        </Link>
                        <Link to="/shop?filter=sale" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200">
                            On Sale
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- MEGA MENU CATEGORIES --- */}
            <div className="relative group">
                <button className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 flex items-center space-x-1 relative">
                    <span>Categories</span>
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                </button>

                {/* Mega Menu Container */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-50">
                    
                    {/* Grid Layout for Columns */}
                    <div className="grid grid-cols-3 divide-x divide-gray-100 p-4">
                        
                        {MEGA_MENU_COLUMNS.map((column) => (
                            <div key={column.title} className="px-4">
                                {/* Column Header (Main Category Link) */}
                                <Link to={column.path} className="block text-md font-bold text-indigo-700 hover:text-indigo-900 mb-3 border-b border-indigo-100 pb-1">
                                    {column.title}
                                </Link>

                                {/* Subcategory Links */}
                                <div className="space-y-1">
                                    {column.items.map((item) => (
                                        <Link 
                                            key={item.name} 
                                            to={item.path} 
                                            className="block px-2 py-1 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded transition-colors duration-200"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Optional: Footer or Promotional Banner */}
                    <div className='bg-gray-50 p-3 text-center border-t border-gray-100'>
                         <Link to="/shop/all" className='text-sm text-indigo-600 hover:underline'>View All Categories</Link>
                    </div>
                </div>
            </div>

            {/* Services Dropdown (Unchanged) */}
            <div className="relative group">
                <button className="text-gray-700 hover:text-indigo-600 transition-colors duration-300 flex items-center space-x-1 relative">
                    <span>Services</span>
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-52 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50">
                    <div className="py-2">
                        <Link to="/contact" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200">
                            Customer Support
                        </Link>
                        <Link to="/faq#shipping" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200">
                            Shipping Info
                        </Link>
                        <Link to="/faq#returns" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200">
                            Returns
                        </Link>
                        <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200">
                            Track Order
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}

export default MediumDeviceHeader