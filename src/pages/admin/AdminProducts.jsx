import React, { useContext, useEffect, useState } from "react";
// import AddProductForm from '../../components/layout/admin/forms/AddProductFrom'
import { deepcopyObj } from "../../utils/deepCopyObj";
import { productFormData } from "../../utils/formDataObj";
import { useDispatch, useSelector } from "react-redux";
import { setSubCategory, useGetAllCategory } from "../../store/categorySlice";
import AddProductForm from "../../components/layout/admin/forms/AddProductFrom";
import ProductCard from "../../components/layout/admin/ProductCard";
import Loader from "../../components/common/Loader";
import NotAvailable from "../../components/common/NotAvailable";
import {
  useCreateProduct,
  useGetAllProducts,
  useUpdateProduct,
} from "../../store/productSlice";
import { productError } from "../../utils/errorObj";
import { MessageContext } from "../../context/context";
import Pagination from "../../components/common/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../../components/common/SearchBar";


const AdminProducts = () => {
  const { productList, productDetails,totalCount,page,currentCount,totalPages ,isLoading} = useSelector(
    (state) => state.adminProducts
  );
  const [openAddProductForm, setOpenAddProductForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldErrors, setFieldErrors] = useState(deepcopyObj(productError));
  const { messageContextState, setMessageContextState } =
    useContext(MessageContext);
  const [productData, setProductData] = useState(deepcopyObj(productFormData));
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const [currentPage,setCurrentPage]=useState(page)
  const navigate = useNavigate();
  const location = useLocation();
  const limit = 9; // items per page

  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalCount);

  function closeProductForm() {
    setOpenAddProductForm(false);
    setProductData(deepcopyObj(productFormData));
    dispatch(setSubCategory());
    setId(null);
    setIsEditMode(null);
  }
  function openProductForm() {
    setOpenAddProductForm(true);
  }
  useEffect(() => {
    dispatch(useGetAllCategory());
  }, []);
  async function handleCreateProduct(e) {
    e.preventDefault();
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

    setFieldErrors(deepcopyObj(errors));
    if (!hasError) {
      handleCreateProduct();
    } else {
    }

    // Proceed if no errors
    if (!hasError) {
      (isEditMode
        ? dispatch(useUpdateProduct({ id, data: productData }))
        : dispatch(useCreateProduct(productData))
      ).then((res) => {
        if (res.payload?.success) {
          closeProductForm();
          dispatch(useGetAllProducts({limit,page:currentPage}));
          setProductData(deepcopyObj(productFormData));
          setMessageContextState({
            ...messageContextState,
            is_show: true,
            text: res.payload?.message,
            success: true,
          });
        } else {
          setMessageContextState({
            ...messageContextState,
            is_show: true,
            text: res.payload?.message,
            success: false,
          });
        }
      });
      // reset form
    } else {
      setTimeout(() => {
        setFieldErrors(deepcopyObj(productError));
      }, 3000);
    }
  }
useEffect(() => {

    dispatch(useGetAllProducts({ page: currentPage, limit })).then(res=>{
      
    });

    const searchParams = new URLSearchParams(location.search);
    if(currentPage > 1){
      searchParams.set("page", currentPage); // set current page
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }
    else{
    searchParams.delete("page")
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    }

  }, [currentPage]); 

async function onChangeSearch(keyword){

if(keyword.length>= 3){  
 dispatch(useGetAllProducts({keyword,page:1,limit})).then(res=>{
 setCurrentPage(1)
 const searchParams = new URLSearchParams(location.search);
      searchParams.delete("page"); // set current page
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
 })
}
else{
  dispatch(useGetAllProducts({page:1,limit})).then(res=>{

  })
}   
}



  return (
    <>
      {openAddProductForm && (
        <div className="fixed inset-0 bg-amber-50 z-[900] overflow-y-auto">
          <div className="flex justify-end p-4"></div>
          <AddProductForm
            fieldErrors={fieldErrors}
            setFieldErrors={setFieldErrors}
            handleCreateProduct={handleCreateProduct}
            isEditMode={isEditMode}
            id={id}
            setId={setId}
            setIsEditMode={setIsEditMode}
            productData={productData}
            setProductData={setProductData}
            closeProductForm={closeProductForm}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto ">
        {/* <!-- Header Section --> */}
        <div className="admin-header-box">
          <h1 className="admin-heading">Manage Products</h1>

          {/* <!-- Add Category Button --> */}
          <button onClick={openProductForm} className="admin-add-btn">
            <i className="fas fa-plus mr-2"></i>
            Add Product
          </button>
        </div>
      </div>
      <SearchBar isWantSearchBtn={false} handleSearch={onChangeSearch}  />
       {
        isLoading ?<Loader/>:
       <div >
      {productList &&
        (productList.length > 0 ? (
          <>
              <div className="max-w-7xl mx-auto my-4 text-gray-700">
            Showing  {totalCount} products
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {productList.map((product) => (
              <ProductCard
                key={product._id || product.id} // ✅ key is required
                openProductForm={openProductForm}
                id={id}
                page={currentPage}
                
                setId={setId}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                product={product}
              />
            ))}
          </div>
          </>
        ) : (
          <NotAvailable />
        ))}
        <Pagination totalPages={totalPages} onPageChange={setCurrentPage} currentPage={currentPage}   />
       </div>
       }
    </>
  );
};

export default AdminProducts;
