import React, { useEffect, useState } from 'react'
import ProductFilterSidebar from '../../components/layout/shop/products/ProductFilterSidebar'
import BreadcrumbBanner from '../../components/layout/shop/common/BreadcrumbBanner'
import ShopCard from '../../components/layout/shop/products/ShopCard'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useSearchParams } from 'react-router-dom'
import createSearchParams from '../../utils/createURLParams'
import Loader from '../../components/common/Loader'
import { useGetFilterProducts } from '../../store/shop'
import NotAvailable from '../../components/common/NotAvailable'
import HomeShopCard from '../../components/layout/shop/HomeShopCard'
import { current } from '@reduxjs/toolkit'
import Pagination from '../../components/common/Pagination'


const ProductList = () => {
const {filterProducts,isLoading,totalCount,page,currentCount,totalPages}=useSelector(state=>state.filterProducts)

const [filters, setFilters] = useState({})
const [sort, setSort] = useState(null)
const location=useLocation()
const dispatch=useDispatch()
const [currentPage,setCurrentPage]=useState(page)
  const [searchparams, setSearchParams] = useSearchParams()
  function handlesort(value) {
    setSort(value)
    setFilterOpen(false)
    sessionStorage.setItem('sortItem', value)
  }
  function handleFilter(options, category) {
    let filterobjects = { ...filters }
    const indexofObject = Object.keys(filterobjects).indexOf(options)
    if (indexofObject === -1) {
      filterobjects = {
        ...filterobjects, [options]: [category]
      }
    }
    else {
      const indexOfArray = filterobjects[options].indexOf(category)
      if (indexOfArray === -1) {
        filterobjects[options].push(category)
      }
      else {
        filterobjects[options].splice(indexOfArray, 1)
      }
    }
    setFilters(filterobjects)
    setCurrentPage(1)
    sessionStorage.setItem('filters', JSON.stringify(filterobjects))
  }
  useEffect(() => {
    setSort(sessionStorage.getItem('sortItem') || "")
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  },[location.search])

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(useGetFilterProducts({ filterParams: filters, sortParams: sort,page:currentPage }))
    }
    dispatch(useGetFilterProducts())
  }, [sort, filters,currentPage])

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQuery = createSearchParams(filters)
      setSearchParams(new URLSearchParams(createQuery))
    }
  }, [filters])  
   const [fillterOpen, setFilterOpen] = useState(false)
  return (
    <>
      <div>
        <BreadcrumbBanner pageTitle='Products' currentPage='Products' />
        <div className='flex space-x-2'>
        <ProductFilterSidebar sort={sort} setSort={setSort} handleFilter={handleFilter} handlesort={handlesort} filters={filters} setFilters={setFilters} fillterOpen={fillterOpen} setFilterOpen={setFilterOpen} />
         <div className="p-4 sm:p-6 mt-9  w-full bg-white relative  rounded-xl shadow-2xl"> {/* Main container is a clean, lifted card */}
      
      {/* Header Section: Clear separation and highlighted text */}
      <header className="mb-6 mt-3 flex justify-between border-accent  items-baseline border-b pb-4">
       <button onClick={() => setFilterOpen(!fillterOpen)} className='text-white md:hidden text-xs  absolute right-[0%] -top-5 hover-duration hover:bg-cyan-700  bg-cyan-800 px-4 py-3 rounded-lg font-bold'>
            <i className="fa-solid fa-filter"></i> Filter
          </button>        <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
          Shopping Products
        </h1>
        <p className="text-lg font-medium text-indigo-600">
         {
         totalCount > 1?`Products(${totalCount})`:`product(${totalCount})`
         }
          
        </p>
      </header>
      
  {
  isLoading ? (
    // 1. Show Loader if data is still loading
    <Loader />
  ) : (

    (filterProducts && filterProducts.length > 0) ? (
<>
  
      <div className='relative'>
        <div className="grid grid-cols-1 justify-items-center sm:grid-rows-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8">
          {/* Using optional chaining `?.` is a good practice here too */}
          {filterProducts.map((product) => (
            <HomeShopCard width={"w-[80%] md:w-61"} key={product.sku} product={product} />
          ))}
        </div>
      </div>
       <Pagination totalPages={totalPages} onPageChange={setCurrentPage} currentPage={currentPage}   />
       
</>
    ) : (
      // 4. If data is loaded but no products are available
      <p className='md:text-2xl text-gray-600 text-center'>Not Available</p>
    )
  )
}
      
       </div>

        </div>
      </div>
    </>
  )
}

export default ProductList
