import { useSelector } from "react-redux"
import FilteOption from "./FilteOption";
import ShopBannerCarousel from "../ShopBannerCarousel";
import { useSearchParams } from "react-router-dom";

const ProductFilterSidebar = ({ fillterOpen, sort, handleFilter, handlesort, setSort, filters, setFilters, setFilterOpen }) => {
    const { categoryList, isLoading } = useSelector(state => state.category)
    const [searchparams, setSearchParams] = useSearchParams()
    const { banners } = useSelector(state => state.banner)
    const activeBanners = (banners && banners.length > 0) ? banners.filter(banner => banner.isActive) : []

    // --- Mock Data (Replace with your actual data source) ---
    const sortOptions = [
        { label: "Lower Price", value: "price-lower" },
        // ... (other sort options)
        { label: "Higher Price", value: "price-higher" },
        { label: "A to Z", value: "atoz" },
        { label: "Z to A", value: "ztoa" },
    ]
    function clearFilter() {
        sessionStorage.removeItem("filters")
        sessionStorage.removeItem("sortItem")
        setSearchParams(new URLSearchParams(``))
    }

    return (
        // Main Container: ADDED flex-col AND h-full/min-h-screen
        <div
            className={`w-74 bg-white shadow-lg transform ${fillterOpen ? " translate-x-0" : " -translate-x-full"} md:translate-x-0 transition-transform duration-300 
                       fixed left-0 top-0 md:left-0 md:mt-10 z-[3000] md:z-10 md:sticky 
                       flex flex-col h-full min-h-screen`} // <--- KEY CHANGES HERE: flex-col and h-full/min-h-screen
        >
            {/* Filter Content: ADDED flex-grow to take up available vertical space */}
            <div className="p-5 flex-grow overflow-y-auto">
                <div className='border-b border-gray-300 w-full mb-4 flex justify-between items-center'>
                    <h3 className="text-lg font-bold text-gray-800 pb-2">Filters</h3>
                    {/* Close Button (only visible on mobile) */}
                    <button
                        onClick={() => setFilterOpen(!fillterOpen)}
                        className='text-white md:hidden transition-colors duration-200 hover:bg-cyan-700 h-7 bg-black text-xs px-3 py-0.5 rounded-lg font-bold'
                    >
                        Close
                    </button>
                </div>

                {/* --- Sort Options (Radio Buttons for Price/Name) --- */}
                <div className="mb-6">
                    <h4 className="text-xs font-semibold text-gray-700 mb-2">Sort By</h4>
                    {/* ... (Sort options content remains the same) ... */}
                    <div className="space-y-2">
                        {sortOptions.map((value) => (
                            <label key={value.value} className="flex as  items-center text-sm text-gray-600 cursor-pointer">
                                <input
                                    type="radio"
                                    checked={sort === value.value}
                                    onChange={() => handlesort(value.value)}
                                    name="sort"
                                    className="mr-2  text-blue-600 border-gray-300 focus:ring-blue-500 h-4 w-4"
                                />
                                {value.label}
                            </label>
                        ))}
                    </div>
                </div>
                <hr className="mb-6 border-gray-100" />
                {
                    (categoryList && categoryList.length > 0) ? <FilteOption handleFilter={handleFilter} filters={filters} catogoryOptions={categoryList} /> : <p>Not Available</p>
                }
                <hr className="mb-1 border-gray-100" />

                <button onClick={clearFilter} className="w-full mt-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100 transition duration-200">
                    Reset Filters
                </button>
            </div>

            {/* --- Banner Section: ADDED mt-auto to stick to the bottom and flex-shrink-0 */}
            {
                activeBanners && activeBanners.length > 0 &&
                <div className="mt-auto hidden overflow-hidden md:block max-h-[700px]"> {/* <--- KEY CHANGES HERE: mt-auto and flex-shrink-0 */}
                    <div className="flex flex-col">
                        {
                            activeBanners.map((banner, index) => (
                                <ShopBannerCarousel banner={banner} index={index} key={index} />
                            ))
                        }
                        
                    </div>
                </div>
            }

        </div>
    );
};

export default ProductFilterSidebar;