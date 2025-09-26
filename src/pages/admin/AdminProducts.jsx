import React, { useEffect, useState } from 'react'
// import AddProductForm from '../../components/layout/admin/forms/AddProductFrom'
import { deepcopyObj } from '../../utils/deepCopyObj'
import { productFormData } from '../../utils/formDataObj'
import { useDispatch, useSelector } from 'react-redux'
import { setSubCategory, useGetAllCategory } from '../../store/categorySlice'
import AddProductForm from '../../components/layout/admin/forms/AddProductFrom'
import ProductCard from '../../components/layout/admin/ProductCard'
import Loader from '../../components/common/Loader'
import NotAvailable from '../../components/common/NotAvailable'

const AdminProducts = () => {

  const {productList,productDetails}=useSelector(state=>state.adminProducts)
  const [openAddProductForm,setOpenAddProductForm]=useState(false)
  const [isEditMode,setIsEditMode]=useState(false)
  const [productData,setProductData]=useState(deepcopyObj(productFormData))
  const [id,setId]=useState(null)
  const dispatch=useDispatch()
  function closeProductForm(){
     setOpenAddProductForm(false)
     setProductData(deepcopyObj(productFormData))
     dispatch(setSubCategory())
     setId(null)
     setIsEditMode(null)
  }
  function openProductForm(){
    setOpenAddProductForm(true)
  }
  useEffect(()=>{
  dispatch(useGetAllCategory())
  },[])

  
  return (
    <div>

      {
        openAddProductForm &&
           <div className="fixed inset-0 bg-amber-50 z-[900] overflow-y-auto">
          <div className="flex justify-end p-4">
          </div>
          <AddProductForm isEditMode={isEditMode} id={id} setId={setId} setIsEditMode={setIsEditMode} productData={productData} setProductData={setProductData} closeProductForm={closeProductForm} />
        </div>
      }
           
    <div class="max-w-7xl mx-auto ">
        {/* <!-- Header Section --> */}
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 class="text-3xl font-bold text-gray-900">Manage Products</h1>
            
            {/* <!-- Add Category Button --> */}
            <button onClick={openProductForm} class="admin-add-btn">
                <i class="fas fa-plus mr-2"></i>
                Add Product
            </button>
        </div>
    </div>
      {
        productList && (productList.length > 0 ? productList.map(product=>(
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3'>
          <ProductCard openProductForm={openProductForm} id={id} setId={setId} isEditMode={isEditMode} setIsEditMode={setIsEditMode} product={product} />
        </div>
        ))
        
        :<NotAvailable/>)
      }


    </div>
  )
}

export default AdminProducts
