import React, { useContext, useEffect, useState } from 'react'
// import AddProductForm from '../../components/layout/admin/forms/AddProductFrom'
import { deepcopyObj } from '../../utils/deepCopyObj'
import { productFormData } from '../../utils/formDataObj'
import { useDispatch, useSelector } from 'react-redux'
import { setSubCategory, useGetAllCategory } from '../../store/categorySlice'
import AddProductForm from '../../components/layout/admin/forms/AddProductFrom'
import ProductCard from '../../components/layout/admin/ProductCard'
import Loader from '../../components/common/Loader'
import NotAvailable from '../../components/common/NotAvailable'
import { useCreateProduct, useGetAllProducts, useUpdateProduct } from '../../store/productSlice'
import { productError } from '../../utils/errorObj'
import { MessageContext } from '../../context/context'

const AdminProducts = () => {

  const {productList,productDetails}=useSelector(state=>state.adminProducts)
  const [openAddProductForm,setOpenAddProductForm]=useState(false)
  const [isEditMode,setIsEditMode]=useState(false)
  const [fieldErrors, setFieldErrors] = useState(deepcopyObj(productError));
    const {messageContextState,setMessageContextState}=useContext(MessageContext)
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
async function handleCreateProduct(e){
  e.preventDefault()
const errors = deepcopyObj(productError);
    let hasError = false;
    // 1. Basic Information Validation
    if (productData.productName.trim() === "") {
      errors.productName.isRequired = true;
      hasError = true;
    }
    if (productData.brand.trim() === "") {
      errors.brand.isRequired = true;
      hasError = true;
    }
    if (productData.category.trim() === "") {
      errors.category.isRequired = true;
      hasError = true;
    }
    if (productData.subCategory.trim() === "") {
      errors.subCategory.isRequired = true;
      hasError = true;
    }
    // Brand is optional, no check needed.

    // 2. Product Details Validation
    if (!productData.description || productData.description.length === 0) {
      errors.description.isRequired = true;
      hasError = true;
    }

    // 3. Images Validation
    if (!productData.images || productData.images.length === 0) {
      errors.images.isRequired = true;
      hasError = true;
    }

    // 4. Variations Validation
    if (!productData.variations || productData.variations.length === 0) {
      errors.variations.missingType = true; 
      hasError = true;
    }
    console.log(errors)
    setFieldErrors(deepcopyObj(errors));
    if (!hasError) {
      handleCreateProduct(); 
    } else {
      
    }

// Proceed if no errors
if (!hasError) {
  (isEditMode?dispatch(useUpdateProduct({id,data:productData})):
  dispatch(useCreateProduct(productData))).then(res=>{
   if(res.payload?.success){
        console.log(res.payload)
        closeProductForm()
        dispatch(useGetAllProducts())
        setProductData(deepcopyObj(productFormData));
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
      }
      else{
       
        setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
      }
  })
   // reset form
}
else{
  setTimeout(()=>{
    setFieldErrors(deepcopyObj(productError))
  },3000)
}
}

  
  return (
    <>

      {
        openAddProductForm &&
           <div className="fixed inset-0 bg-amber-50 z-[900] overflow-y-auto">
          <div className="flex justify-end p-4">
          </div>
          <AddProductForm fieldErrors={fieldErrors} setFieldErrors={setFieldErrors} handleCreateProduct={handleCreateProduct} isEditMode={isEditMode} id={id} setId={setId} setIsEditMode={setIsEditMode} productData={productData} setProductData={setProductData} closeProductForm={closeProductForm} />
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
  productList && (
    productList.length > 0 ? (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {productList.map((product) => (
          <ProductCard
            key={product._id || product.id}   // ✅ key is required
            openProductForm={openProductForm}
            id={id}
            setId={setId}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            product={product}
          />
        ))}
      </div>
    ) : (
      <NotAvailable />
    )
  )
}



    </>
  )
}

export default AdminProducts
