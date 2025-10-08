import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Badge from "../../../common/Badge";
const THREE_DAYS_AGO = Date.now() - 3 * 24 * 60 * 60 * 1000;

const MediumDeviceHeader = () => {
  const { categoryList, isLoading, count } = useSelector(
    (state) => state.category
  );

  return (
    <>
      <nav className="hidden lg:flex items-center z-[9998] space-x-6 xl:space-x-8 font-medium">
        {/* Home Link */}
        <Link
          to="/"
          className="text-gray-700 hover:text-primary transition-colors duration-300 relative group"
        >
          Home
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
        </Link>

        {/* Shop Dropdown (Kept Simple) */}
        <Link
          to="/shop/products"
          className="text-gray-700 hover:text-primary transition-colors duration-300 relative group"
        >
          Shop
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
        </Link>

        {/* --- MEGA MENU CATEGORIES --- */}
        <div className="relative group">
          <button className="text-gray-700 hover:text-primary transition-colors duration-300 flex items-center space-x-1 relative">
            <span className="relative">
              Categories
              {categoryList &&
                categoryList.length > 0 &&
                categoryList.some(
                  (category) =>
                    // Check if category itself is new
                    new Date(category.createdAt).getTime() > THREE_DAYS_AGO ||
                    // Check if any subcategory is new
                    (category.subcategories &&
                      category.subcategories.some(
                        (sub) =>
                          new Date(sub.createdAt).getTime() > THREE_DAYS_AGO
                      ))
                ) && <Badge text={"New"} className={"-top-2"} />}
            </span>
            <svg
              className="w-4 h-4 transition-transform group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
          </button>
          {/* Mega Menu Container - REMOVED overflow-y-auto */}
          <div className="absolute rounded top-full left-1/2 -translate-x-1/2 mt-4 w-[90vw] max-w-7xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 bg-white border border-gray-300 z-50">
            {/* Grid Layout for Columns */}
            {/* Max height applied to ensure content stays within the viewport, if content is too large, you might need to reconsider the number of categories per column. */}
            {!isLoading && (
              <div
                className={`grid w-full grid-cols-5 divide-x divide-gray-200 p-5 `}
              >
                {categoryList && categoryList.length > 0 ? (
                  categoryList.map((category) => (
                    <div key={category.categoryName} className="px-4 mt-2">
                      {/* Column Header (Main Category Link) - STYLING CHANGE: text-primary */}
                      <Link
                        to={`/shop/category/${category.categorySKU}`}
                        className="block text-[11px] relative uppercase tracking-wider text-primary hover:text-primary mb-1 border-b border-gray-100"
                      >
                        <span className="relative inline-block">
                          {category.categoryName}

                          {/* New badge */}
                          {(new Date(category.createdAt).getTime() >
                            THREE_DAYS_AGO ||
                            (category.subcategories &&
                              category.subcategories.some(
                                (sub) =>
                                  new Date(sub.createdAt).getTime() >
                                  THREE_DAYS_AGO
                              ))) && <Badge />}
                        </span>
                      </Link>

                      {/* Subcategory Links */}
                      {category.subcategories &&
                        category.subcategories.length > 0 && (
                          <div className="space-y-1">
                            {category.subcategories.map(
                              (subcategory, index) => (
                                <Link
                                  key={index}
                                  to={`/shop/sub-category/${category.categorySKU}/${subcategory.sku}`}
                                  className="block text-xs text-gray-600 hover:text-primary transition-all duration-200 border-l-0 hover:border-l-2 border-transparent hover:border-primary pl-2 -ml-2"
                                >
                                 <span className="relative inline-block">{subcategory.name}
                                    {
                                    (new Date(subcategory.createdAt).getTime() >
                            THREE_DAYS_AGO) && <Badge/> }
                                    </span> 
                                </Link>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm font-medium text-gray-400">
                    No Categories!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Services Dropdown (Unchanged) */}

        <Link
          to="/shop/about-us"
          className="text-gray-700 hover:text-primary transition-colors duration-300 relative group"
        >
          About Us
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
        </Link>

        <Link
          to="/shop/contact-us"
          className="text-gray-700 hover:text-primary transition-colors duration-300 relative group"
        >
          Contact Us
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
        </Link>

        <Link
          to="/"
          className="text-gray-700 hover:text-primary transition-colors duration-300 relative group"
        >
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
        </Link>
      </nav>
    </>
  );
};

export default MediumDeviceHeader;
