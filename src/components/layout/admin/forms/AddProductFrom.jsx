import React, { useContext, useEffect, useState } from "react";
import ProductVariationForm from "./ProductVariationForm";
import { deepcopyObj } from "../../../../utils/deepCopyObj";
import { productFormData, variationFormData } from "../../../../utils/formDataObj";
import ImageField from "../../../common/ImageField";
import { useDispatch, useSelector } from "react-redux";
import { useGetSubCategory } from "../../../../store/categorySlice";
import Loader from "../../../common/Loader";
import Progress from "../../../common/Progress";
import CloseBtn from "../../../common/CloseBtn";
import { uploadImageToCloudinary } from "../../../../utils/imageUploader";
import { useGetProductById } from "../../../../store/productSlice";
import { productError } from "../../../../utils/errorObj"; 

const AddProductForm = ({
  productData,
  setProductData,
  fieldErrors,
  setFieldErrors,
  id,
  handleCreateProduct, // This prop now needs to be wrapped or executed after validation
  closeProductForm,
  isEditMode,
  setIsEditMode,
}) => {
  const { isLoading: productLoading } = useSelector(
    (state) => state.adminProducts
  );
  const [isVariationEditMode,setIsVariationEditMode]=useState(false)


  const [isUpload, setUpload] = useState(false);
  const dispatch = useDispatch();
  const { categoryList, subcategories } = useSelector((state) => state.category);

   const [editIndex,setEditIndex]=useState(null)
  const [progressbar, setprogressbar] = useState({
    is_show: false,
    percentage: 0,
    text: "",
  });
  function setVariationEditModeMethod(e,index){
    e.preventDefault()
    setEditIndex(index)
    setIsVariationEditMode(true)
    openVariationFormMethod()
    setVariationData(productData.variations[index])
  } 
  const [variationData, setVariationData] = useState(
    deepcopyObj(variationFormData)
  );
  const [openVariationForm, setOpenVariationForm] = useState(false);
  const [listInformation, setListInformation] = useState({
    des: "",
    feature: "",
    addInfo: "",
  });
  
  // --- useEffect to Fetch Product Data for Edit Mode ---
  useEffect(() => {
    if (isEditMode && id) {
      dispatch(useGetProductById(id)).then((res) => {
        if (res.payload?.success) {
          setProductData(res.payload.data);
        }
      });
    }
  }, [isEditMode, id, dispatch, setProductData]);

  // --- List Data Handlers (No change needed) ---
  function addlistDataMethod(key, value) {
    if (value !== "") {
      setProductData({ ...productData, [key]: [...productData[key], value] });
      const fieldKey = key === "description" ? "des" : key === "features" ? "feature" : "addInfo";
      setListInformation({ ...listInformation, [fieldKey]: "" });
      if (key === "description" && fieldErrors.description?.isRequired) {
          setFieldErrors(prev => ({ ...prev, description: { ...prev.description, isRequired: false } }));
      }
    }
  }

  function removeListDataMethod(e, key, index) {
    e.preventDefault();
    setProductData({
      ...productData,
      [key]: productData[key].filter((_, i) => i !== index),
    });
  }
  async function handleImageChange(e) {
    setUpload(true);
    setprogressbar({ ...progressbar, is_show: true, text: "Uploading...", percentage: 0 });
    const file = e.target.files[0];
    
    if (!file) {
        setUpload(false);
        setprogressbar({ is_show: false });
        return;
    }

    const uploadedUrl = await uploadImageToCloudinary(file, (percent) => {
      setprogressbar((prev) => ({
        ...prev,
        is_show: true,
        percentage: percent < 100 ? percent : 99,
        text: "Uploading...",
      }));
    });

    setprogressbar({ ...progressbar, is_show: true, percentage: 100, text: "Uploaded!" });
    setProductData({ ...productData, images: [...productData.images, uploadedUrl] });
    setUpload(false);
    
    setTimeout(() => {
      setprogressbar({ is_show: false, percentage: 0, text: "" });
      // Clear error for images if it was required
      setFieldErrors(prev => ({ ...prev, images: { ...prev.images, isRequired: false } }));
    }, 3000);
  }
  

  function closevariationForm() {
    setOpenVariationForm(false);
    setVariationData(deepcopyObj(variationFormData));
    setIsVariationEditMode(false)
    setEditIndex(null)
  }

  function openVariationFormMethod() {
    setOpenVariationForm(!openVariationForm);
  }

 
  useEffect(() => {
    if (productData.category) {
      dispatch(useGetSubCategory(productData.category));
    }

    if (productData.subCategory && !productData.category) {
        setProductData(prev => ({ ...prev, subCategory: "" }));
    }
  }, [productData.category, dispatch, productData.subCategory, setProductData]);

  return (
    <>
      {productLoading ? (
        <Loader />
      ) : (
        <div className="bg-white min-h-screen relative py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8 text-center "> {/* Added relative for CloseBtn positioning */}
              <h1 className="text-3xl md:text-4xl font-extrabold text-teal-600 mb-2">
                {isEditMode ? "Update Product" : "Add New Product"}
              </h1>
              <p className="text-gray-500">
                Fill in the details below to manage your product inventory.
              </p>
              <button className="absolute  top-0 right-0 text-gray-500 hover:text-gray-700 transition" onClick={closeProductForm} >
                <CloseBtn  className="" />

              </button>
            </div>
            {/* Form Container */}
            <div className="bg-gray-50 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl">
              <form className="p-6 md:p-10">

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
                      {fieldErrors.productName?.isRequired && (
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
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition appearance-none pr-8"
                      >
                        <option value="">Select a category</option>
                        {categoryList && categoryList.length > 0 ? (
                          categoryList.map((category, index) => (
                            <option key={index} value={category.categorySKU}>
                              {category.categoryName}
                            </option>
                          ))
                        ) : (
                          <option disabled>No Categories Available</option>
                        )}
                      </select>
                      {fieldErrors.category?.isRequired && (
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
                        name="subCategory"
                        id="subCategory"
                      >
                        <option value="">Select a subcategory</option>
                        {subcategories && subcategories.length > 0 ? (
                          subcategories.map((subcategory, index) => (
                            <option value={subcategory.sku} key={index}>
                              {subcategory.name}
                            </option>
                          ))
                        ) : (
                          <option disabled>Select category first</option>
                        )}
                      </select>
                      {fieldErrors.subCategory?.isRequired && (
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
                          setProductData({
                            ...productData,
                            brand: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 shadow-sm focus:ring-teal-500 focus:border-teal-500 transition"
                        placeholder="e.g., Sony"
                      />
                    {fieldErrors.brand?.isRequired && (
                        <p className="text-xs font-medium text-red-700 mt-1">
                         Brand is Required
                        </p>
                      )}
                    </div>
                  </div>
                </div>
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
                              des: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      <button
                        type="button"
                        id="addDescription"
                        onClick={() =>
                          addlistDataMethod("description", listInformation.des.trim())
                        }
                        disabled={listInformation.des.trim() === ""}
                        className="mt-3 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition flex items-center text-sm font-medium shadow-md hover:shadow-lg disabled:bg-teal-400"
                      >
                        <i className="fas fa-plus-circle mr-2"></i> Add Description
                      </button>
                      {fieldErrors.description?.isRequired && (
                        <p className="text-xs font-medium text-red-700 mt-1">
                          At least one description item is required.
                        </p>
                      )}
                      
                      {productData?.description &&
                        productData.description.length > 0 &&
                        productData?.description.map((desc, index) => (
                          <div
                            key={`desc-${index}`}
                            className="flex bg-gray-200 relative p-3 rounded-lg border border-gray-300"
                          >
                            <p className="w-[90%] text-gray-700">
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
                              feature: e.target.value,
                            })
                          }
                          placeholder="Enter a key feature."
                        />
                      </div>
                      <button
                        type="button"
                        id="addFeature"
                        onClick={() =>
                          addlistDataMethod("features", listInformation.feature.trim())
                        }
                        disabled={listInformation.feature.trim() === ""}
                        className="mt-3 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition flex items-center text-sm font-medium shadow-md hover:shadow-lg disabled:bg-teal-400"
                      >
                        <i className="fas fa-plus-circle mr-2"></i> Add Feature
                      </button>
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
                              addInfo: e.target.value,
                            })
                          }
                          placeholder="Enter any additional info."
                        />
                      </div>
                      <button
                        type="button"
                        id="addAdditionalInfo"
                        onClick={() =>
                          addlistDataMethod("additionalInfo", listInformation.addInfo.trim())
                        }
                        disabled={listInformation.addInfo.trim() === ""}
                        className="mt-3 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition flex items-center text-sm font-medium shadow-md hover:shadow-lg disabled:bg-teal-400"
                      >
                        <i className="fas fa-plus-circle mr-2"></i> Add Additional
                        Information
                      </button>
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
                  </div>
                </div>
                {/* Images Section */}
                <div className="mb-10">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center">
                    <i className="fas fa-images text-blue-500 mr-3"></i>
                    Product Images
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      (Max 4 images - as per typical e-commerce platforms)
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
                          className="flex relative rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 aspect-square"
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
                  {fieldErrors.images?.isRequired && (
                    <p className="mt-2 text-xs font-medium text-red-700">
                      At least one image is required.
                    </p>
                  )}
                </div>
                {/* Variations Section */}
                <div className="mb-10">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200 flex items-center">
                    <i className="fas fa-layer-group text-pink-600 mr-3"></i>
                    Product Variations <span className="text-red-500 text-sm ml-1">*</span>
                  </h2>
                  <button
                    onClick={openVariationFormMethod}
                    type="button"
                    className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition flex items-center border border-gray-300 font-medium"
                  >
                    <i className="fas fa-plus-circle mr-2 text-pink-600"></i>{" "}
                    {openVariationForm ? "Close Variation Form" : "Add Variation"}
                  </button>
                  {/* Variation List */}
                  {productData?.variations && productData.variations.length > 0 ? (
                    productData.variations.map((variation, index) => (
                      <div
                        key={`var-${index}`}
                        className="flex mt-3 bg-gray-200 relative p-3 rounded-lg border border-gray-300 justify-between items-center"
                      >
                        <div className="text-gray-700 flex flex-wrap gap-x-4">
                          <p className="font-semibold text-pink-600">
                            {variation.type}:{" "}
                            <span className="font-normal text-gray-700">
                              {variation.value}
                            </span>
                          </p>
                          <p className="text-sm">
                            Price: {variation.price.currency}
                            {variation.price.current}
                          </p>
                          <p className="text-sm">Stock: {variation.stock}</p>
                          {variation.offer > 0 && (
                            <p className="text-sm text-red-600">
                              Offer: {variation.offer}%
                            </p>
                          )}
                        </div>

                        <span className="flex justify-end ml-4">
                          <button
                            type="button"
                            className="p-1 rounded-full hover:bg-red-100 transition text-blue-500"
                            onClick={(e) =>
                              setVariationEditModeMethod(e, index)
                            }
                          >
                                               <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>
                          </button>
                          <button
                            type="button"
                            className="p-1 rounded-full hover:bg-red-100 transition text-red-500"
                            onClick={(e) =>
                              removeListDataMethod(e, "variations", index)
                            }
                          >
                            <CloseBtn />
                          </button>
                          
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="mt-4 text-gray-500 text-sm">No variations added yet.</p>
                  )}
                  {fieldErrors.variations?.missingType && (
                    <p className="mt-2 text-xs font-medium text-red-700">
                      At least one product variation is required.
                    </p>
                  )}
                  {/* Variation Form */}
                  {openVariationForm && (
                    <div className="mt-6 p-4 border border-pink-300 rounded-lg bg-white shadow-md">
                      <ProductVariationForm
                        isVariationEditMode={isVariationEditMode}
                        isUpload={isUpload}
                        editIndex={editIndex}
                        productData={productData}
                        setProductData={setProductData}
                        setUpload={setUpload}
                        variationData={variationData}
                        setVariationData={setVariationData}
                        closevariationForm={closevariationForm}
                        // The 'save' function for variation needs to update productData.variations
                        save={(key, value) => { 
                            setProductData(prev => ({
                                ...prev,
                                variations: [...prev.variations, value]
                            }))
                            // After adding a variation, clear the required error for variations
                            setFieldErrors(prev => ({ ...prev, variations: deepcopyObj(productError.variations) }));
                            closevariationForm(); // Close form after saving
                        }}
                      />
                    </div>
                  )}
                </div>
                {/* Options Section */}
                {/* ... (Options JSX) ... */}
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
                      checked={productData.isTrending}
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
                    onClick={handleCreateProduct} // Use the new wrapped handler
                    className="order-1 px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition shadow-lg shadow-teal-500/50 disabled:cursor-progress disabled:bg-teal-400"
                    disabled={isUpload || productLoading}
                  >
                    {isUpload || productLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader small={true} />
                        <span className="ml-2">{isEditMode ? "Updating..." : "Saving..."}</span>
                      </div>
                    ) : (
                      <div>
                        <i className="fas fa-save mr-2"></i>{" "}
                        {isEditMode ? "Update Product" : "Save Product"}
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