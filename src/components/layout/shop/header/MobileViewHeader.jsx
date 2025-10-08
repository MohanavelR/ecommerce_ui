import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '../../../common/Badge';

const THREE_DAYS_AGO = Date.now() - 3 * 24 * 60 * 60 * 1000;

// Component for a single collapsible category block
const MobileCategoryBlock = ({ category, navigatePath }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if category itself or any subcategory is new
  const isCategoryNew =
    new Date(category.createdAt).getTime() > THREE_DAYS_AGO ||
    (category.subcategories &&
      category.subcategories.some(
        (sub) => new Date(sub.createdAt).getTime() > THREE_DAYS_AGO
      ));

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      {/* Category Header */}
      <div className="flex justify-between items-center py-3 px-1">
        <button
          onClick={() => navigatePath(`/shop/category/${category.categorySKU}`)}
          className="flex items-center font-medium hover:text-primary transition-all duration-500"
        >
          <span className="relative inline-block">
            {category.categoryName}
            {isCategoryNew && (
              <Badge className="ml-2" text="New" />
            )}
          </span>
        </button>

        {/* Expand/Collapse Arrow */}
        {category.subcategories && category.subcategories.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1"
          >
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : 'rotate-0'
              }`}
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
          </button>
        )}
      </div>

      {/* Subcategories */}
      {category.subcategories && category.subcategories.length > 0 && (
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <div className="pl-5 pb-3 space-y-2">
            {category.subcategories.map((sub, index) => {
              const isSubNew =
                new Date(sub.createdAt).getTime() > THREE_DAYS_AGO;
              return (
                <button
                  key={index}
                  onClick={() =>
                    navigatePath(
                      `/shop/sub-category/${category.categorySKU}/${sub.sku}`
                    )
                  }
                  className="block text-sm text-gray-600 hover:text-primary transition-all duration-500"
                >
                  <span className="relative inline-block">
                    {sub.name}
                    {isSubNew && <Badge className="ml-2" text="New" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const MobileViewHeader = ({ isOpen, setOpenMenu }) => {
  const { categoryList } = useSelector((state) => state.category);
  const navigate = useNavigate();

  function navigatePath(path) {
    navigate(path);
    setOpenMenu(false);
  }

  return (
    <>
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg z-40 overflow-y-auto max-h-[85vh]">
          <nav className="p-4 divide-y divide-gray-100">
            {/* Static Links */}
            <Link
              to="/"
              className="block py-2 hover:text-primary font-medium transition-all duration-500"
            >
              Home
            </Link>
            <Link
              to="/shop/products"
              className="block py-2 hover:text-primary font-medium transition-all duration-500"
            >
              Shop
            </Link>

            {/* Dynamic Categories */}
            {categoryList && categoryList.length > 0 ? (
              categoryList.map((category, index) => (
                <MobileCategoryBlock
                  key={index}
                  category={category}
                  navigatePath={navigatePath}
                />
              ))
            ) : (
              <p className="py-3 px-1 text-sm text-gray-400">
                No Categories Found.
              </p>
            )}

            {/* Other Static Links */}
            <Link
              to="/shop/about-us"
              className="block py-2 hover:text-primary font-medium transition-all duration-500"
            >
              About Us
            </Link>
            <Link
              to="/shop/contact-us"
              className="block py-2 hover:text-primary font-medium transition-all duration-500"
            >
              Contact Us
            </Link>
            <Link
              to="/orders"
              className="block py-2 hover:text-primary font-medium transition-all duration-500"
            >
              Track Order
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileViewHeader;
