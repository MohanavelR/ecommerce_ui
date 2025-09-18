import React, { useState } from 'react'
import AddProductForm from '../../components/layout/admin/forms/AddProductFrom'
import { deepcopyObj } from '../../utils/deepCopyObj'
import { productFormData } from '../../utils/formDataObj'

const AdminProducts = () => {
  const [openAddProductForm,setOpenAddProductForm]=useState(false)
  const [productData,setProductData]=useState(deepcopyObj(productFormData))
  function closeProductForm(){
     setOpenAddProductForm(false)
     setProductData(deepcopyObj(productFormData))
  }
  function openProductForm(){
    setOpenAddProductForm(true)
  }
  return (
    <div>
      {
        openAddProductForm &&
           <div className="fixed inset-0 bg-amber-50 z-[900] overflow-y-auto">
          <div className="flex justify-end p-4">
          </div>
          <AddProductForm productData={productData} setProductData={setProductData} closeProductForm={closeProductForm} />
        </div>
      }
           
    <div class="max-w-7xl mx-auto ">
        {/* <!-- Header Section --> */}
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900">Product Management</h1>
            
            {/* <!-- Add Product Button --> */}
            <button onClick={openProductForm} id="addProductBtn" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-101">
                <i class="fas fa-plus mr-2"></i>
                Add Product
            </button>
        </div>
    </div>
    </div>
  )
}

export default AdminProducts
