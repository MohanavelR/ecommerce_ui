import React from 'react'

const SearchBar = ({handleSearch,onSearch,isWantSearchBtn}) => {
  return (
    <div>
       <div
                    className="flex items-center w-full max-w-5xl mx-auto mb-10 p-1.5 bg-white border border-gray-300 rounded-lg shadow-md focus-within:border-primary focus-within:shadow-indigo-200/50 transition-all duration-300"
                >
                    <div className="relative flex-1">
                        <svg className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                            fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="search" 
                            onChange={(e) =>handleSearch(e.target.value)}
                            placeholder="Search products, brands, or categories..."
                            className="w-full text-lg py-3 pl-12 pr-4 outline-none focus:ring-0 border-none bg-transparent placeholder:text-gray-400 text-gray-800"
                        />
                    </div>
                    {
                        isWantSearchBtn &&
                    <button
                        type="submit"
                        onClick={onSearch}
                        className="flex-shrink-0 btn-hero  text-white text-base font- py-3 px-6 rounded-md ml-2 
                                    transition-colors duration-200 active:scale-95"
                        aria-label="Execute Search"
                    >
                        Search
                    </button>
                    }
                    {/* Search Button (Solid, but not pill-shaped anymore) */}
                </div>
    </div>
  )
}

export default SearchBar
