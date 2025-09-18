import React from 'react'

const AdminDashboard = () => {
  return (
    <>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p class="text-gray-600 mt-2">Welcome back! Here's what's happening with your store today.</p>
        </div>


        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">

            <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-blue-100 text-blue-600">
                        <i class="fas fa-folder text-xl"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">Total Categories</p>
                        <p class="text-2xl font-bold text-gray-900">24</p>
                    </div>
                </div>
            </div>


            <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-green-100 text-green-600">
                        <i class="fas fa-box text-xl"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">Total Products</p>
                        <p class="text-2xl font-bold text-gray-900">156</p>
                    </div>
                </div>
            </div>


            <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-purple-100 text-purple-600">
                        <i class="fas fa-images text-xl"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">Active Slides</p>
                        <p class="text-2xl font-bold text-gray-900">8</p>
                    </div>
                </div>
            </div>


            <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
                        <i class="fas fa-ad text-xl"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">Active Ads</p>
                        <p class="text-2xl font-bold text-gray-900">12</p>
                    </div>
                </div>
            </div>


            <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300">
                <div class="flex items-center">
                    <div class="p-3 rounded-full bg-red-100 text-red-600">
                        <i class="fas fa-clock text-xl"></i>
                    </div>
                    <div class="ml-4">
                        <p class="text-sm font-medium text-gray-600">Coming Soon Products</p>
                        <p class="text-2xl font-bold text-gray-900">5</p>
                    </div>
                </div>
            </div>
        </div>


        <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <button class="inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                    <i class="fas fa-folder-plus mr-2"></i>
                    Add Category
                </button>


                <button class="inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
                    <i class="fas fa-plus-square mr-2"></i>
                    Add Product
                </button>

                <button class="inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200">
                    <i class="fas fa-image mr-2"></i>
                    Add Slide
                </button>


                <button class="inline-flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200">
                    <i class="fas fa-ad mr-2"></i>
                    Add Ad/Banner
                </button>
            </div>
        </div>


        <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div class="space-y-4">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <i class="fas fa-plus text-blue-600 text-sm"></i>
                            </div>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-gray-900">New product added</p>
                            <p class="text-sm text-gray-500">iPhone 15 Pro Max - 2 hours ago</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                <i class="fas fa-edit text-green-600 text-sm"></i>
                            </div>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-gray-900">Category updated</p>
                            <p class="text-sm text-gray-500">Electronics - 5 hours ago</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <i class="fas fa-trash text-purple-600 text-sm"></i>
                            </div>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm font-medium text-gray-900">Slide deleted</p>
                            <p class="text-sm text-gray-500">Summer Sale Banner - 1 day ago</p>
                        </div>
                    </div>
                </div>
            </div>


            <div class="bg-white rounded-lg shadow p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                            <span class="text-sm font-medium text-gray-900">Server Status</span>
                        </div>
                        <span class="text-sm text-gray-500">Operational</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                            <span class="text-sm font-medium text-gray-900">Database</span>
                        </div>
                        <span class="text-sm text-gray-500">Connected</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                            <span class="text-sm font-medium text-gray-900">Storage</span>
                        </div>
                        <span class="text-sm text-gray-500">75% Used</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                            <span class="text-sm font-medium text-gray-900">API</span>
                        </div>
                        <span class="text-sm text-gray-500">Normal</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default AdminDashboard
