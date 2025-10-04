import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../components/common/Loader';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
   
    // Redux Selectors for loading states and counts
    const { isLoading: categoryLoader, count: categoryCount } = useSelector((state) => state.category);
    const { isLoading: adminProductsLoader, count: adminProductsCount } = useSelector((state) => state.adminProducts);
    const { isLoading: bannerLoader, count: bannerCount } = useSelector((state) => state.banner);
    const { isLoading: comingSoonLoader, count: comingSoonCount } = useSelector((state) => state.comingsoon);
    const { isLoading: sliderLoader, count: sliderCount } = useSelector((state) => state.slider);
    const { isLoading: usersLoader, count: usersCount } = useSelector((state) => state.users);
     const { isLoading: ordersLoader, count: ordersCount } = useSelector((state) => state.order);



    const loaders = [
        categoryLoader,
        adminProductsLoader,
        bannerLoader,
        comingSoonLoader,
        sliderLoader,
        usersLoader,
        ordersLoader,
    ];

    const navigate = useNavigate();

    const quickAction = (path) => {
        return navigate(path);
    };

    // Data Structure for Stat Cards - NEW DESIGN: Gradients and White Text
    const statCards = [
        {
            title: "Total Products",
            count: adminProductsCount,
            icon: "fas fa-box",
            // EcoShop's green theme
            gradient: "bg-gradient-to-r from-green-500 to-green-600", 
        },
        {
            title: "Total Categories",
            count: categoryCount,
            icon: "fas fa-tags",
            gradient: "bg-gradient-to-r from-teal-500 to-teal-600",
        },
        {
            title: "Total Users",
            count: usersCount,
            icon: "fas fa-users",
            gradient: "bg-gradient-to-r from-indigo-500 to-indigo-600",
        },
        {
            title: "Total Orders",
            count: ordersCount,
            icon: "fas fa-shopping-cart",
            gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
        },
        {
            title: "Active Slides",
            count: sliderCount,
            icon: "fas fa-image",
            gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
        },
        {
            title: "Active Ads",
            count: bannerCount,
            icon: "fas fa-ad",
            gradient: "bg-gradient-to-r from-yellow-500 to-orange-500",
        },
        {
            title: "Coming Soon Products",
            count: comingSoonCount,
            icon: "fas fa-clock",
            gradient: "bg-gradient-to-r from-red-500 to-red-600",
        },
    ];

    // Data Structure for Quick Actions - Consistent, bolder colors
    const quickActionLinks = [
        { name: "Go to Products", path: "/admin/products", icon: "fas fa-plus-square", color: "bg-green-500 hover:bg-green-600 focus:ring-green-400" },
        { name: "Go to Orders", path: "/admin/orders", icon: "fas fa-shopping-cart", color: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400" },
        { name: "Go to Categories", path: "/admin/categories", icon: "fas fa-folder-plus", color: "bg-teal-500 hover:bg-teal-600 focus:ring-teal-400" },
        { name: "Go to Users", path: "/admin/customers", icon: "fas fa-users", color: "bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-400" },
        { name: "Go to Slides", path: "/admin/slider", icon: "fas fa-image", color: "bg-purple-500 hover:bg-purple-600 focus:ring-purple-400" },
        { name: "Go to Ad/Banner", path: "/admin/ad-banner", icon: "fas fa-ad", color: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400" },
    ];


    if (loaders.some(Boolean)) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Header */}
            <div className="mb-8 border-b border-accent pb-4">
                <h1 className="text-4xl font-extrabold text-gray-900">EcoShop Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back! Here's a quick overview of your store's performance and inventory.</p>
            </div>


            {/* Stat Cards Grid - NEW GRADIENT DESIGN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                {statCards.map((card, index) => (
                    <div 
                        key={index} 
                        // Updated card style: Gradient background, white text, enhanced hover effect
                        className={`rounded-xl shadow-xl p-6 text-white ${card.gradient} 
                                   transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer`}
                        onClick={() => quickAction(card.path)} // Add quick navigation on click
                    >
                        <div className="flex items-start justify-between">
                            {/* Icon moved to the top right for a cleaner look */}
                            <i className={`${card.icon} text-4xl opacity-80`}></i>
                            <div className="text-right">
                                <p className="text-sm font-medium uppercase tracking-wider opacity-90">{card.title}</p>
                                <p className="text-5xl font-extrabold mt-1">{card.count}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-accent border-b pb-3">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"> {/* Changed to 6 columns for dense layout */}
                    {quickActionLinks.map((action, index) => (
                        <button 
                            key={index}
                            onClick={() => quickAction(action.path)} 
                            className={`flex flex-col items-center justify-center p-4 h-24 text-sm font-medium rounded-xl text-white ${action.color} 
                                        focus:outline-none focus:ring-4 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.05]`}
                        >
                            <i className={`${action.icon} text-2xl mb-1`}></i>
                            <span>{action.name.replace('Go to ', '')}</span> {/* Shorter label for clean buttons */}
                        </button>
                    ))}
                </div>
            </div>


            {/* System Status - Subtle design update */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
                    <div className="space-y-3">
                        {/* Status items updated with subtle shadow/border */}
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                            <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full bg-green-500 mr-3 animate-pulse"></div>
                                <span className="text-sm font-medium text-gray-900">Server Status</span>
                            </div>
                            <span className="text-sm font-semibold text-green-600">Operational</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                            <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full bg-green-500 mr-3"></div>
                                <span className="text-sm font-medium text-gray-900">Database</span>
                            </div>
                            <span className="text-sm text-gray-600">Connected</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                            <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full bg-yellow-500 mr-3"></div>
                                <span className="text-sm font-medium text-gray-900">Storage</span>
                            </div>
                            <span className="text-sm text-yellow-600 font-semibold">75% Used</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                            <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full bg-green-500 mr-3"></div>
                                <span className="text-sm font-medium text-gray-900">API</span>
                            </div>
                            <span className="text-sm text-gray-600">Normal</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
