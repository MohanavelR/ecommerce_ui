import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useSearchParams } from 'react-router-dom'
import ProductFilterSidebar from '../../components/layout/shop/products/ProductFilterSidebar'
import BreadcrumbBanner from '../../components/layout/shop/common/BreadcrumbBanner'
import HomeShopCard from '../../components/layout/shop/HomeShopCard'
import Loader from '../../components/common/Loader'
import Pagination from '../../components/common/Pagination'
import createSearchParams from '../../utils/createURLParams'
import { useGetFilterProducts } from '../../store/shop'

const ProductList = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  // Redux state
  const { filterProducts, isLoading, totalCount, totalPages } = useSelector(
    (state) => state.filterProducts
  )

  // Local state
  const [filters, setFilters] = useState(JSON.parse(sessionStorage.getItem('filters')) || {})
  const [sort, setSort] = useState(sessionStorage.getItem('sortItem') || '')
  const [currentPage, setCurrentPage] = useState(1)
  const [filterOpen, setFilterOpen] = useState(false)

  // Handle sort change
  const handleSort = (value) => {
    setSort(value)
    setFilterOpen(false)
    sessionStorage.setItem('sortItem', value)
    setCurrentPage(1)
  }

  // Handle filter toggle
  const handleFilter = (option, value) => {
    const newFilters = { ...filters }
    if (!newFilters[option]) {
      newFilters[option] = [value]
    } else {
      const index = newFilters[option].indexOf(value)
      if (index === -1) newFilters[option].push(value)
      else newFilters[option].splice(index, 1)
      if (newFilters[option].length === 0) delete newFilters[option]
    }
    setFilters(newFilters)
    sessionStorage.setItem('filters', JSON.stringify(newFilters))
    setCurrentPage(1)
  }

  // Update search params in URL
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const query = createSearchParams(filters)
      setSearchParams(new URLSearchParams(query))
    } else {
      setSearchParams(new URLSearchParams())
    }
  }, [filters])

  // Fetch products whenever filters, sort, or page changes
  useEffect(() => {
    dispatch(
      useGetFilterProducts({
        filterParams: filters,
        sortParams: sort,
        page: currentPage,
      })
    )
  }, [filters, sort, currentPage, dispatch])

  return (
    <div>
      <BreadcrumbBanner pageTitle='Products' currentPage='Products' />

      <div className='flex space-x-2'>
        <ProductFilterSidebar
          sort={sort}
          setSort={setSort}
          handleFilter={handleFilter}
          handleSort={handleSort}
          filters={filters}
          setFilters={setFilters}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
        />

        <div className='p-4 sm:p-6 mt-9 w-full bg-white relative rounded-xl shadow-2xl'>
          {/* Header */}
          <header className='mb-6 mt-3 flex justify-between items-baseline border-b border-accent pb-4'>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className='text-white md:hidden text-xs absolute right-0 -top-5 hover:bg-cyan-700 bg-cyan-800 px-4 py-3 rounded-lg font-bold'
            >
              <i className='fa-solid fa-filter'></i> Filter
            </button>
            <h1 className='text-xl font-extrabold tracking-tight text-gray-900'>
              Shopping Products
            </h1>
            <p className='text-lg font-medium text-indigo-600'>
              {totalCount > 1 ? `Products(${totalCount})` : `Product(${totalCount})`}
            </p>
          </header>

          {/* Product List */}
          {isLoading ? (
            <Loader />
          ) : filterProducts && filterProducts.length > 0 ? (
            <>
              <div className='grid grid-cols-1 sm:grid-rows-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center'>
                {filterProducts.map((product) => (
                  <HomeShopCard key={product.sku} product={product} width='w-[90%] md:w-61' />
                ))}
              </div>

              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <p className='md:text-2xl text-gray-600 text-center'>Not Available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList
