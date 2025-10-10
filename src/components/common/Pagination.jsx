import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  siblingCount = 1 // Number of pages shown on either side of the current page
}) => {
  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page or fewer
  }

  // Helper function to generate the visible page numbers (e.g., [1, ..., 5, 6, 7, ..., 10])
  const generatePageNumbers = () => {
    const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);
    const totalPagesToDisplay = 5 + 2 * siblingCount; // Max number of page buttons shown


    if (totalPages <= totalPagesToDisplay) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    // Case 2: No left dots, show first pages, dots, and last page
    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, 'DOTS_RIGHT', totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [1, 'DOTS_LEFT', ...rightRange];
    }


    if (showLeftDots && showRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, 'DOTS_LEFT', ...middleRange, 'DOTS_RIGHT', totalPages];
    }

    return range(1, totalPages); // Fallback
  };

  const pages = generatePageNumbers();

  const handlePageClick = (page) => {
    if (page !== currentPage && page !== 'DOTS_LEFT' && page !== 'DOTS_RIGHT') {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav aria-label="Pagination" className="flex justify-center items-center space-x-2 my-8">
      
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 text-gray-700 bg-white rounded-full transition duration-300 hover:bg-gray-100 disabled:opacity-50 disabled:text-gray-400"
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>

      {/* Page Numbers Container */}
      <div className="flex space-x-1">
        {pages.map((page, index) => {
          if (page === 'DOTS_LEFT' || page === 'DOTS_RIGHT') {
            return (
              <span key={index} className="flex items-center justify-center w-10 h-10 text-gray-500">
                ...
              </span>
            );
          }

          const isActive = page === currentPage;
          
          return (
            <a
              key={index}
              href="#"
              onClick={(e) => { e.preventDefault(); handlePageClick(page); }}
              aria-current={isActive ? 'page' : undefined}
              className={`
                flex items-center justify-center w-10 h-10 rounded-full font-medium transition duration-300
                ${isActive 
                  ? 'text-white bg-blue-600 font-bold shadow-md' 
                  : 'text-gray-700 bg-white hover:bg-gray-100'
                }
              `}
            >
              {page}
            </a>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 text-gray-700 bg-white rounded-full transition duration-300 hover:bg-gray-100 disabled:opacity-50 disabled:text-gray-400"
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </nav>
  );
};

export default Pagination;