import React, { useContext, useEffect, useState } from "react";
import ProductVariationForm from "./ProductVariationForm";
import { deepcopyObj } from "../../../../utils/deepCopyObj";
import { productFormData, variationFormData } from "../../../../utils/formDataObj";
import ImageField from "../../../common/ImageField";
import { productError } from "../../../../utils/errorObj";
import { useDispatch, useSelector } from "react-redux";
import { useGetSubCategory } from "../../../../store/categorySlice";
import Loader from "../../../common/Loader";
import Progress from "../../../common/Progress";
import CloseBtn from "../../../common/CloseBtn";
import { uploadImageToCloudinary } from "../../../../utils/imageUploader";
import { useCreateProduct, useGetAllProducts, useGetProductById, useUpdateProduct } from "../../../../store/productSlice";
import { MessageContext } from "../../../../context/context";

const AddProductForm = ({ productData, setProductData,id,setId, closeProductForm,isEditMode,setIsEditMode }) => {
  const [fieldErrors, setFieldErrors] = useState(deepcopyObj(productError));
  const {productdetails,isLoading:productLoading }=useSelector(state=>state.adminProducts)
  const {messageContextState,setMessageContextState}=useContext(MessageContext)
  const [isUpload,setUpload]=useState(false)  
  const dispatch = useDispatch();

  const { isLoading, categoryList, subcategories } = useSelector(
    (state) => state.category
  );
  useEffect(()=>{
    if(isEditMode){
     dispatch(useGetProductById(id)).then(res=>{
      if(res.payload.success)
        setProductData(res.payload.data)
     }) 
    }
  },[isEditMode])
  const [progressbar,setprogressbar]=useState({
    is_show:false,
    percentage:0,
    text:""
  })
  const [variationData, setVariationData] = useState(deepcopyObj(variationFormData));
  const [openVariationForm, setOpenVariationForm] = useState(false);
  const [listInformation, setListInformation] = useState({
    des: "",
    feature: "",
    addInfo: "",
  });
  function addlistDataMethod(key, value) {
    if (value !== "") {
      setProductData({ ...productData, [key]: [...productData[key], value] });
      setListInformation({ des: "", feature: "", addInfo: "" });
    }
  }
  function removeListDataMethod(e,key, index) {
    e.preventDefault()
    setProductData({
      ...productData,
      [key]: productData[key].filter((_, i) => i !== index),
    });
  }

async function handleImageChange(e){
  setUpload(true)
  setprogressbar({...progressbar,is_show:true,text:"Uploading...",percentage:0})
  const file = e.target.files[0];
  const uploadedUrl = await uploadImageToCloudinary(file, (percent) => {

      setprogressbar({...progressbar,is_show:true,percentage:(percent-1),text:"Uploading..."});
    });
  setprogressbar({...progressbar,is_show:true,percentage:100,text:"Uploaded!"})  
  setProductData({...productData,images:[...productData.images,uploadedUrl]})
  setUpload(false)
  setTimeout(()=>{
    setprogressbar({is_show:false})

  },8000)
};



  function closevariationForm() {
    setOpenVariationForm(false);
    setIsEditMode(false)
    setVariationData(deepcopyObj(variationFormData));
  }

  function openVariationFormMethod() {
    setOpenVariationForm(!openVariationForm);
  }
  useEffect(() => {
    if (productData.category) {
      dispatch(useGetSubCategory(productData.category)).then((res) => {
        console.log(res);
      });
    }
  }, [productData.category]);

async function handleCreateProduct(e){
  e.preventDefault()

  let hasError = false;
const localError = deepcopyObj(productError); // clone the error object

if (productData.productName?.trim()==="") {
  hasError = true;
  localError.productName.isRequired = true;
}

if (!productData.price?.current && productData.price?.current !== 0) {
  hasError = true;
  localError.price.current.isRequired = true;
} else if (productData.price?.current <= 0) {
  hasError = true;
  localError.price.current.invalidNumber = true;
}

if (productData.price?.original && productData.price?.original <=0 ) {
  hasError = true;
  localError.price.original.invalidNumber = true;
}
if (productData.stock && productData.stock<0 ) {
  hasError = true;
  localError.stock.invalidNumber = true;
}

if (productData.category?.trim()==="") {
  hasError = true;
  localError.category.isRequired = true;
}

if (productData.subCategory?.trim()==="") {
  hasError = true;
  localError.subCategory.isRequired = true;
}

if (productData.brand?.trim()==="") {
  hasError = true;
  localError.brand.isRequired = true;
}



if (!productData.description?.length >0) {
  hasError = true;
  localError.description.isRequired = true;
}

// if (!productData.features?.trim()) {
//   hasError = true;
//   localError.features.isRequired = true;
// }

// if (!productData.additionalInfo?.trim()) {
//   hasError = true;
//   localError.additionalInfo.isRequired = true;
// }

if (!productData.images || productData.images.length === 0) {
  hasError = true;
  localError.images.isRequired = true;
}



// Update state with errors
setFieldErrors(deepcopyObj(localError));

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



  
  const inputClasses =
    "w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-transparent transition-colors duration-200";

  return (
   <>
  {productLoading ? (
    <Loader />
  ) : (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-teal-600 mb-2">
            {isEditMode ? "Update Product" : "Add New Product"}
          </h1>
          <p className="text-gray-500">
            Fill in the details below to manage your product inventory.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-gray-50 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl">
          <form className="p-6 md:p-10">
            {/* Basic Information Section */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center">
                <i className="fas fa-info-circle text-orange-500 mr-3"></i>
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Name */}
                <div>
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    // New input style for light theme
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition"
                    value={productData.productName}
                    placeholder="e.g., Wireless Headphones"
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        productName: e.target.value,
                      })
                    }
                  />
                  {fieldErrors.productName.isRequired && (
                    <p className="mt-1 text-xs font-medium text-red-700">
                      Product Name is required.
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={productData.category}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        category: e.target.value,
                      })
                    }
                    // New select style for light theme
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition appearance-none pr-8"
                  >
                    <option value="">Select a category</option>
                    {categoryList && categoryList.length > 0 ? (
                      categoryList.map((category, index) => (
                        <option key={index} value={category.categoryName}>
                          {category.categoryName}
                        </option>
                      ))
                    ) : (
                      <option>No Categories</option>
                    )}
                  </select>
                  {fieldErrors.category.isRequired && (
                    <p className="mt-1 text-xs font-medium text-red-700">
                      Category is required.
                    </p>
                  )}
                </div>

                {/* Subcategory */}
                <div>
                  <label
                    htmlFor="subCategory"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subcategory <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition appearance-none pr-8"
                    value={productData.subCategory}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        subCategory: e.target.value,
                      })
                    }
                    name=""
                    id=""
                  >
                    <option value="">Select a subcategory</option>
                    {subcategories &&
                      (subcategories.length > 0 ? (
                        subcategories.map((subcategory, index) => (
                          <option value={subcategory} key={index}>
                            {subcategory}
                          </option>
                        ))
                      ) : (
                        <option>Select category</option>
                      ))}
                  </select>
                  {fieldErrors.subCategory.isRequired && (
                    <p className="mt-1 text-xs font-medium text-red-700">
                      Subcategory is required.
                    </p>
                  )}
                </div>

                {/* Brand */}
                <div>
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={productData.brand}
                    onChange={(e) =>
                      setProductData({ ...productData, brand: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition"
                    placeholder="e.g., Sony"
                  />
                  {fieldErrors.brand.isRequired && (
                    <p className="mt-1 text-xs font-medium text-red-700">
                      Brand is required.
                    </p>
                  )}
                </div>

                {/* Offer */}
                <div>
                  <label
                    htmlFor="offer"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Offer (%)
                  </label>
                  <input
                    type="number"
                    id="offer"
                    name="offer"
                    value={productData.offer}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition"
                    onChange={(e) =>
                      setProductData({ ...productData, offer: e.target.value })
                    }
                    placeholder="e.g., 20"
                  />
                  {fieldErrors.offer.invalidFormat && (
                    <p className="mt-1 text-xs font-medium text-red-700">
                      Offer must be a positive number.
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={productData.stock}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition"
                    onChange={(e) =>
                      setProductData({ ...productData, stock: e.target.value })
                    }
                    placeholder="e.g., 20"
                  />
                  {fieldErrors.stock.invalidNumber && (
                    <p className="mt-1 text-xs font-medium text-red-700">
                      stock must be a positive number.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center">
                <i className="fas fa-tag text-green-600 mr-3"></i>
                Pricing Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Current Price */}
                <div>
                  <label
                    htmlFor="currentPrice"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Current Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">₹</span>
                    </div>
                    <input
                      type="number"
                      id="currentPrice"
                      name="currentPrice"
                      value={productData.price.current}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition pl-8"
                      placeholder="0.00"
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          price: {
                            ...productData.price,
                            current: e.target.value,
                          },
                        })
                      }
                    />
                    {fieldErrors.price.current.isRequired && (
                      <p className="mt-1 text-xs font-medium text-red-700">
                        Price is required.
                      </p>
                    )}
                  </div>
                </div>

                {/* Original Price */}
                <div>
                  <label
                    htmlFor="originalPrice"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Original Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">₹</span>
                    </div>
                    <input
                      type="number"
                      id="originalPrice"
                      name="originalPrice"
                      min="0"
                      value={productData.price.original}
                      step="0.01"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition pl-8"
                      placeholder="0.00"
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          price: {
                            ...productData.price,
                            original: e.target.value,
                          },
                        })
                      }
                    />
                    {fieldErrors.price.original.invalidNumber && (
                      <p className="mt-1 text-xs font-medium text-red-700">
                        Price must be a positive number.
                      </p>
                    )}
                  </div>
                </div>

                {/* Currency */}
                <div>
                  <label
                    htmlFor="currency"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    value={productData.price.urrency}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        price: {
                          ...productData.price,
                          currency: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition appearance-none pr-8"
                  >
                    <option value="₹">₹ (INR)</option>
                    <option value="$">$ (USD)</option>
                    <option value="€">€ (EUR)</option>
                    <option value="£">£ (GBP)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center">
                <i className="fas fa-align-left text-purple-600 mr-3"></i>
                Product Details
              </h2>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <div id="descriptionContainer" className="space-y-4">
                  <div className="description-item flex items-start gap-4">
                    <textarea
                      name="description"
                      rows="3"
                      value={listInformation.des}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition"
                      placeholder="Enter a detailed product description."
                      onChange={(e) =>
                        setListInformation({
                          ...listInformation,
                          des: e.target.value.trim(),
                        })
                      }
                    ></textarea>
                  </div>
                  {fieldErrors.description.isRequired && (
                    <p className="text-xs font-medium text-red-700">
                      Description is required.
                    </p>
                  )}

                  {productData?.description &&
                    productData.description.length > 0 &&
                    productData?.description.map((desc, index) => (
                      <div
                        key={`desc-${index}`}
                        className="flex bg-gray-200 relative p-3 rounded-lg border border-gray-300"
                      >
                        <p className="w-[90%] truncate text-gray-700">
                          {desc}
                        </p>
                        <span className="absolute top-1 right-1 z-[100] text-red-500 flex justify-end">
                          <button
                            type="button"
                            className="p-1 rounded-full hover:bg-red-100 transition"
                            onClick={(e) =>
                              removeListDataMethod(e, "description", index)
                            }
                          >
                            <CloseBtn />
                          </button>
                        </span>
                      </div>
                    ))}
                </div>
                <button
                  type="button"
                  id="addDescription"
                  onClick={() =>
                    addlistDataMethod("description", listInformation.des)
                  }
                  className="mt-3 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition flex items-center text-sm font-medium shadow-md hover:shadow-lg"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Add description
                </button>
              </div>

              {/* Features */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features
                </label>
                <div id="featuresContainer" className="space-y-4">
                  <div className="feature-item flex items-start gap-4">
                    <input
                      type="text"
                      name="features"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition"
                      value={listInformation.feature}
                      onChange={(e) =>
                        setListInformation({
                          ...listInformation,
                          feature: e.target.value.trim(),
                        })
                      }
                      placeholder="Enter a key feature."
                    />
                  </div>

                  {productData?.features &&
                    productData.features.length > 0 &&
                    productData?.features.map((fea, index) => (
                      <div
                        key={`fea-${index}`}
                        className="flex bg-gray-200 relative p-3 rounded-lg border border-gray-300"
                      >
                        <p className="w-[90%] truncate text-gray-700">
                          {fea}
                        </p>
                        <span className="absolute top-1 right-1 z-[100] text-red-500 flex justify-end">
                          <button
                            type="button"
                            className="p-1 rounded-full hover:bg-red-100 transition"
                            onClick={(e) =>
                              removeListDataMethod(e, "features", index)
                            }
                          >
                            <CloseBtn />
                          </button>
                        </span>
                      </div>
                    ))}
                </div>
                <button
                  type="button"
                  id="addFeature"
                  onClick={() =>
                    addlistDataMethod("features", listInformation.feature)
                  }
                  className="mt-3 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition flex items-center text-sm font-medium shadow-md hover:shadow-lg"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Add Feature
                </button>
              </div>

              {/* Additional Info */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <div id="additionalInfoContainer" className="space-y-4">
                  <div className="additional-info-item flex items-start gap-4">
                    <input
                      type="text"
                      name="additionalInfo"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition"
                      value={listInformation.addInfo}
                      onChange={(e) =>
                        setListInformation({
                          ...listInformation,
                          addInfo: e.target.value.trim(),
                        })
                      }
                      placeholder="Enter any additional info."
                    />
                  </div>
                  {productData?.additionalInfo &&
                    productData.additionalInfo.length > 0 &&
                    productData?.additionalInfo.map((addinfo, index) => (
                      <div
                        key={`addinfo-${index}`}
                        className="flex bg-gray-200 relative p-3 rounded-lg border border-gray-300"
                      >
                        <p className="w-[90%] truncate text-gray-700">
                          {addinfo}
                        </p>
                        <span className="absolute top-1 right-1 z-[100] text-red-500 flex justify-end">
                          <button
                            type="button"
                            className="p-1 rounded-full hover:bg-red-100 transition"
                            onClick={(e) =>
                              removeListDataMethod(e, "additionalInfo", index)
                            }
                          >
                            <CloseBtn />
                          </button>
                        </span>
                      </div>
                    ))}
                </div>
                <button
                  type="button"
                  id="addAdditionalInfo"
                  onClick={() =>
                    addlistDataMethod("additionalInfo", listInformation.addInfo)
                  }
                  className="mt-3 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition flex items-center text-sm font-medium shadow-md hover:shadow-lg"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Add Additional
                  Information
                </button>
              </div>
            </div>

            {/* Images Section */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center">
                <i className="fas fa-images text-blue-500 mr-3"></i>
                Product Images
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (Max 4 images)
                </span>
              </h2>

              <ImageField handleImageChange={handleImageChange} />
              {progressbar.is_show && (
                <div>
                  <p className="text-end text-base font-medium text-gray-600">
                    {progressbar.text}
                  </p>
                  <Progress width={progressbar.percentage} />
                </div>
              )}

              <div className="grid mt-3 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 ">
                {productData?.images &&
                  productData.images.length > 0 &&
                  productData?.images.map((image, index) => (
                    <div
                      key={`img-${index}`}
                      className="flex relative rounded-xl overflow-hidden shadow-lg border-2 border-gray-200"
                    >
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1 right-1 z-[100] text-white flex">
                        <button
                          type="button"
                          className="p-1 bg-red-600 rounded-full hover:bg-red-700 transition"
                          onClick={(e) =>
                            removeListDataMethod(e, "images", index)
                          }
                        >
                          <CloseBtn />
                        </button>
                      </span>
                    </div>
                  ))}
              </div>
              {fieldErrors.images.isRequired && (
                <p className="mt-2 text-xs font-medium text-red-700">
                  At least one image is required.
                </p>
              )}
            </div>

            {/* Variations Section */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center">
                <i className="fas fa-layer-group text-pink-600 mr-3"></i>
                Product Variations
              </h2>
              <button
                onClick={openVariationFormMethod}
                type="button"
                className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition flex items-center border border-gray-300 font-medium"
              >
                <i className="fas fa-plus-circle mr-2 text-pink-600"></i> Add
                Variation
              </button>
              {productData?.variations && productData.variations.length > 0
                ? productData.variations.map((variation, index) => (
                    <div
                      key={`var-${index}`}
                      className="flex mt-3 bg-gray-200 relative rounded-lg border border-gray-300"
                    >
                      <div className="p-3 text-gray-700">
                        <p>
                          <span className="font-semibold text-pink-600">
                            {variation.type}
                          </span>
                          : {variation.value}
                        </p>
                      </div>

                      <span className="absolute top-1 right-1 z-[100] text-red-500 flex justify-end">
                        <button
                          type="button"
                          className="p-1 rounded-full hover:bg-red-100 transition"
                          onClick={(e) =>
                            removeListDataMethod(e, "variations", index)
                          }
                        >
                          <CloseBtn />
                        </button>
                      </span>
                    </div>
                  ))
                : ""}

              {openVariationForm && (
                <div className="mt-6">
                  <ProductVariationForm
                    isUpload={isUpload}
                    setUpload={setUpload}
                    variationData={variationData}
                    setVariationData={setVariationData}
                    closevariationForm={closevariationForm}
                    save={addlistDataMethod}
                  />
                </div>
              )}
            </div>

            {/* Options Section */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center">
                <i className="fas fa-cog text-gray-600 mr-3"></i>
                Product Options
              </h2>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isTrending"
                  name="isTrending"
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      isTrending: e.target.checked,
                    })
                  }
                  className="h-5 w-5 text-teal-600 bg-white border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                />
                <label
                  htmlFor="isTrending"
                  className="ml-3 block text-sm text-gray-700"
                >
                  Mark as trending product
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={closeProductForm}
                type="button"
                className="order-2 sm:order-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition font-medium shadow-sm"
              >
                <i className="fas fa-times mr-2"></i> Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateProduct}
                // Updated primary button style
                className="order-1 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition shadow-lg shadow-orange-500/50 disabled:cursor-progress disabled:bg-orange-400"
                disabled={isUpload}
              >
                {isUpload ? (
                  <Loader />
                ) : (
                  <div>
                    <i className="fas fa-save mr-2"></i> Save Product
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )}
</>
  );
};

export default AddProductForm;
