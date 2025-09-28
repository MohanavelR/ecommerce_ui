import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Component for a single collapsible category block
const MobileCategoryBlock = ({ category }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Placeholder class mapping (adjust these to your actual Tailwind configuration)
    const primaryTextColor = "text-primary";
    const subTextColor = "text-gray-600";
    const subTextHoverColor = "hover:text-primary";

    return (
        <div className="border-b border-gray-100 last:border-b-0">
            {/* Category Header (Clickable Toggle) */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`w-full flex justify-between text-primary hover:text-green-900 items-center py-3 px-1 font-medium transition-all duration-500`}
            >
                <Link to={`/shop/${category.categoryName}`} className='text-primary hover:text-green-900'>{category.categoryName}</Link>
                <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            
            {/* Subcategories (Collapsible Content) */}
            <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'}`}
                // style={{ maxHeight: isExpanded ? '400px' : '0px' }} // Tailwind can be tricky with dynamic height, so use inline style for robust transition
            >
                <div className="pl-5 pb-3 space-y-2 transition-all duration-500">
                    {category.subcategories && category.subcategories.map((subcategory, index) => (
                        <Link 
                            key={index} 
                            to={`/shop/${category.categoryName}/${subcategory}`} 
                            className={`block text-sm text-gray-600 hover:text-primary transition-all duration-500`}
                        >
                            {subcategory}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};


const MobileViewHeader = ({isOpen}) => {
    const {categoryList} = useSelector(state => state.category);
  return (
    <>
{
    isOpen &&
// 2. RESPONSIVE CONTAINER & STYLING CHANGES
<div id="mobile-nav-menu" className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg z-40 overflow-y-auto max-h-[85vh]">
    <nav className="p-4 divide-y divide-gray-100">
        
        {/* Static Links - Converted to Link components */}

            <Link to="/" className="block py-2 text-primary hover:text-green-900 font-medium transition-all duration-500">
                Home
            </Link>
            <Link to="/about" className="block py-2 text-primary hover:text-green-900 font-medium transition-all duration-500">
                Shop
            </Link>
       


        {/* Dynamic Categories (Using Accordion Blocks) */}
       
            {/* <h3 className="px-1 pt-2 pb-1 text-sm font-semibold uppercase text-gray-500">Shop by Category</h3> */}
            {
                (categoryList && categoryList.length > 0) ?
                categoryList.map((category, index) => (
                    // 3. USE ACCORDION COMPONENT
                    <MobileCategoryBlock key={index} category={category} />
                ))
                : <p className='py-3 px-1 text-sm text-gray-400'>No Categories Found.</p>
            }
      
        
     
                 
                <Link to="/contact" className="block py-2 text-primary hover:text-green-900 font-medium transition-all duration-500">
                    About Us
                </Link>
                <Link to="/faq" className="block py-2 text-primary hover:text-green-900 font-medium transition-all duration-500">
                    Contact Us
                </Link>
                <Link to="/orders" className="block py-2 text-primary hover:text-green-900 font-medium transition-all duration-500">
                    Track Order
                </Link>
         
        
        
    </nav>
</div>
}
    </>
  )
}

export default MobileViewHeader