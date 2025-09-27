// NOTE: This component is for design structure only.
// It uses mock data arrays (sortOptions and catogoryOptions) for demonstration.

const  ProductFilterSidebar= () => {
    // --- Mock Data (Replace with your actual data source) ---
    const sortOptions = [
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'name-asc', label: 'Name: A-Z' },
        { value: 'name-desc', label: 'Name: Z-A' },
    ];
    
    const catogoryOptions = [
        { value: 'electronics', label: 'Electronics' },
        { value: 'fashion', label: 'Fashion' },
        { value: 'home', label: 'Home Goods' },
        { value: 'sports', label: 'Sports' },
    ];
    
    // Mock states for styling reference only
    const mockSort = 'price-asc';
    const mockSelectedCategories = ['electronics', 'sports']; 


    return (
        // Main Container: Fixed width, sticky on MD+, responsive slide-in on mobile
        <div 
            className={`w-64  bg-white shadow-lg p-5 transform md:translate-x-0 transition-transform duration-300 min-h-screen  md:h-screen overflow-y-auto
                       fixed left-0 top-0 md:left-0 z-[2000] md:z-20 md:sticky `}
        >
            
            {/* */}
            <div className='border-b border-gray-300 w-full mb-4 flex justify-between items-center'>
                <h3 className="text-lg font-bold text-gray-800 pb-2">Filters</h3>
                {/* Close Button (only visible on mobile) */}
                <button 
                    className='text-white md:hidden transition-colors duration-200 hover:bg-cyan-700 h-7 bg-black text-xs px-3 py-0.5 rounded-lg font-bold'
                >
                    Close
                </button>
            </div>
            
            {/* --- Sort Options (Radio Buttons for Price/Name) --- */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Sort By</h4>
                <div className="space-y-2">
                    {sortOptions.map((value) => (
                        <label key={value.value} className="flex items-center text-sm text-gray-600 cursor-pointer">
                            <input
                                type="radio"
                                defaultChecked={value.value === mockSort} 
                                name="sort"
                                className="mr-2 text-blue-600 border-gray-300 focus:ring-blue-500 h-4 w-4"
                            />
                            {value.label}
                        </label>
                    ))}
                </div>
            </div>

            <hr className="mb-6 border-gray-100" />

            {/* --- Category Options (Checkboxes) --- */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Category</h4>
                <div className="space-y-2">
                    {catogoryOptions.map((value, index) => (
                        <label 
                            key={index} 
                            className="flex items-center text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
                        >
                            <input 
                                type="checkbox" 
                                defaultChecked={mockSelectedCategories.includes(value.value)} 
                                name="category"
                                className="mr-2 text-blue-600 rounded border-gray-300 focus:ring-blue-500 h-4 w-4" 
                            />
                            {value.label}
                        </label>
                    ))}
                </div>
            </div>

            <hr className="mb-6 border-gray-100" />
            
            {/* */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200">
                Apply Filters
            </button>
            <button className="w-full mt-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100 transition duration-200">
                Reset Filters
            </button>
        </div>
    );
};

// export default FilterSidebarDesignSimplified;

export default ProductFilterSidebar;