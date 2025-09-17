import React from 'react'

const MediumDeviceHeader = () => {
  return (
    <>
            <div
          id="sticky-header"
          className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300 hidden md:block"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between">
              <div className="flex space-x-1 md:space-x-4">
                 <a href="#" className="py-4 px-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
                {/* Dogs 🐶 */}
<div className="group relative">
  <button className="py-4 px-2 flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
    <span>Dogs </span>
    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </button>
  <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
    <div className="py-1">
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Dry Food</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Wet Food</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Treats</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Toys</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Grooming</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Health & Wellness</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Apparel</a>
    </div>
  </div>
</div>

{/* Cats 🐱 */}
<div className="group relative">
  <button className="py-4 px-2 flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
    <span>Cats </span>
    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </button>
  <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
    <div className="py-1">
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Dry Food</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Wet Food</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Treats</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Toys</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Litter & Accessories</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Grooming</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Health & Wellness</a>
    </div>
  </div>
</div>

{/* Fish & Aquatics 🐠 */}
<div className="group relative">
  <button className="py-4 px-2 flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
    <span>Fish & Aquatics </span>
    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </button>
  <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
    <div className="py-1">
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Fish Food</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Aquarium Supplies</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Water Treatments</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Heaters & Filters</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Decorations</a>
    </div>
  </div>
</div>

{/* Birds 🦜 */}
<div className="group relative">
  <button className="py-4 px-2 flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
    <span>Birds </span>
    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </button>
  <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
    <div className="py-1">
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Bird Food</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Cages & Stands</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Toys & Perches</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Health & Wellness</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Breeding & Nesting</a>
    </div>
  </div>
</div>

{/* Small Animals 🐹 */}
<div className="group relative">
  <button className="py-4 px-2 flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
    <span>Small Animals </span>
    <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  </button>
  <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
    <div className="py-1">
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Food</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Habitats</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Bedding & Litter</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Toys & Chews</a>
      <a href="#" className="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600">Health & Wellness</a>
    </div>
  </div>
</div>


                {/* Dropdown 2 */}
                <div className="group relative">
                  <button className="py-4 px-2 flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    <span>Fashion</span>
                    <svg
                      className="ml-1 h-4 w-4"
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
                  <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Men's Clothing</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Women's Clothing</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Shoes</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Accessories</a>
                    </div>
                  </div>
                </div>

                {/* Dropdown 3 */}
                <div className="group relative">
                  <button className="py-4 px-2 flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    <span>Home & Kitchen</span>
                    <svg
                      className="ml-1 h-4 w-4"
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
                  <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Furniture</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Kitchen Appliances</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Decor</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Bedding</a>
                    </div>
                  </div>
                </div>

                {/* Dropdown 4 */}
                <div className="group relative">
                  <button className="py-4 px-2 flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    <span>Beauty</span>
                    <svg
                      className="ml-1 h-4 w-4"
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
                  <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Skincare</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Makeup</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Hair Care</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Fragrance</a>
                    </div>
                  </div>
                </div>

                <a href="#" className="py-4 px-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">Deals</a>
                <a href="#" className="py-4 px-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">Services</a>
              </div>

              {/* Search Bar (hidden on mobile)
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="py-2 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                </div>
              </div> */}
            </div>
          </div>
        </div>
    </>
  )
}

export default MediumDeviceHeader
