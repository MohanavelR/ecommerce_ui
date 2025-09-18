import React, { useEffect, useState } from "react";
import ProductVariationForm from "./ProductVariationForm";
import { deepcopyObj } from "../../../../utils/deepCopyObj";
import { productFormData, variationFormData } from "../../../../utils/formDataObj";
import ImageField from "../../../common/ImageField";
import { productError } from "../../../../utils/errorObj";
import { useDispatch, useSelector } from "react-redux";
import { useGetSubCategory } from "../../../../store/categorySlice";
import Loader from "../../../common/Loader";
import CloseBtn from "../../../common/CloseBtn";

const AddProductForm = ({ productData, setProductData, closeProductForm }) => {
  const [fieldErrors, setFieldErrors] = useState(deepcopyObj(productError));
  const [variationData, setVariationData] = useState(
    deepcopyObj(variationFormData)
  );
  const [openVariationForm, setOpenVariationForm] = useState(false);
  console.log(productData);
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
const handleImageChange = (e) => {
  const files = Array.from(e.target.files);

  setProductData((prev) => {
    // Combine old images and new files
    const combined = [...(prev.images || []), ...files];

    // Only keep first 4
    const limited = combined.slice(0, 4);

    return {
      ...prev,
      images: limited
    };
  });
};


  const dispatch = useDispatch();
  const { isLoading, categoryList, subcategories } = useSelector(
    (state) => state.category
  );
  console.log();
  function closevariationForm() {
    setOpenVariationForm(false);
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





  
  const inputClasses =
    "w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-transparent transition-colors duration-200";

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Add New Product
          </h1>
          <p className="text-gray-600">
            Fill in the details below to add a new product to your inventory.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <form className="p-6 md:p-10">
            {/* Basic Information Section */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200 flex items-center">
                <i className="fas fa-info-circle text-blue-600 mr-3"></i>
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
                    className={inputClasses}
                    placeholder="productName"
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
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        category: e.target.value,
                      })
                    }
                    className={inputClasses}
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
                    className={inputClasses}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        subCategory: e.target.value,
                      })
                    }
                    name=""
                    id=""
                  >
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
                    onChange={(e) =>
                      setProductData({ ...productData, brand: e.target.value })
                    }
                    className={inputClasses}
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
                    className={inputClasses}
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
              </div>
            </div>

            {/* Pricing Section */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200 flex items-center">
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
                      required
                      min="0"
                      step="0.01"
                      className={`${inputClasses} pl-8`}
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
                      step="0.01"
                      className={`${inputClasses} pl-8`}
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
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        price: {
                          ...productData.price,
                          currency: e.target.value,
                        },
                      })
                    }
                    className={inputClasses}
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
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200 flex items-center">
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
                      className={inputClasses}
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
                        <div className="flex bg-gray-300 relative">
                          <p className="w-[90%] truncate p-3 ">
                            {desc}
                          </p>
                          <span className="absolute p-3 w-full z-[100] text-amber-800 flex justify-end">
                            <button
                              onClick={(e) =>
                                removeListDataMethod(e,"description", index)
                              }
                            >
                              <CloseBtn/>
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
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center text-sm"
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
                      className={inputClasses}
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
                        <div className="flex bg-gray-300 relative">
                          <p className="w-[90%] truncate p-3 ">
                            {fea}
                          </p>
                          <span className="absolute p-3 w-full z-[100] text-amber-800 flex justify-end">
                            <button
                              onClick={(e) =>
                                removeListDataMethod(e,"features", index)
                              }
                            >
                              <CloseBtn/>
                            </button>
                          </span>
                        </div>
                      ))}
                </div>
                <button
                  type="button"
                  id="addFeature"
                   onClick={() =>
                    addlistDataMethod("features", listInformation.feature

                    )
                  }
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center text-sm"
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
                      className={inputClasses}
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
                        <div className="flex bg-gray-300 relative">
                          <p className="w-[90%] truncate p-3 ">
                            {addinfo}
                          </p>
                          <span className="absolute p-3 w-full z-[100] text-amber-800 flex justify-end">
                            <button
                              onClick={(e) =>
                                removeListDataMethod(e,"additionalInfo", index)
                              }
                            >
                              <CloseBtn/>
                            </button>
                          </span>
                        </div>
                      ))}
                </div>
                <button
                  type="button"
                  id="addAdditionalInfo"
                   onClick={() =>
                    addlistDataMethod("additionalInfo", listInformation.addInfo

                    )
                  }
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center text-sm"
                >
                  <i className="fas fa-plus-circle mr-2"></i> Add Additional
                  Information
                </button>
              </div>
            </div>

            {/* Images Section */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200 flex items-center">
                <i className="fas fa-images text-yellow-600 mr-3"></i>
                Product Images
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (Max 4 images)
                </span>
              </h2>

              <ImageField handleImageChange={handleImageChange} />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 ">
                   {productData?.images &&
                      productData.images.length > 0 &&
                      productData?.images.map((image, index) => (
                        <div className="flex bg-gray-300 relative">
                          <img src={URL.createObjectURL(image)} alt="" />
                          <span className="absolute p-3 w-full z-[100] text-white flex justify-end">
                            <button
                              onClick={(e) =>
                                removeListDataMethod(e,"images", index)
                              }
                            >
                              <CloseBtn/>
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
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200 flex items-center">
                <i className="fas fa-layer-group text-indigo-600 mr-3"></i>
                Product Variations
              </h2>
              <button
                onClick={openVariationFormMethod}
                type="button"
                className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition flex items-center"
              >
                <i className="fas fa-plus-circle mr-2"></i> Add Variation
              </button>
              {productData?.variations && productData.variations.length > 0 ? (
  productData.variations.map((variation, index) => (
    <div key={index} className="flex mt-3 bg-gray-300 relative">
      <div className="p-3 ">
        <p>{variation.type}:{variation.value}</p>
      </div>

      <span className="absolute p-3 w-full z-[100] text-red-600 flex justify-end">
        <button
          type="button"
          onClick={(e) => removeListDataMethod(e, "variations", index)}
        >
          <CloseBtn />
        </button>
      </span>
    </div>
  ))
) : ""}

              {openVariationForm && (
                <div className="mt-6">
                  <ProductVariationForm
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
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-4 border-b border-gray-200 flex items-center">
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
                  className="h-5 w-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
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
                className="order-2 sm:order-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                <i className="fas fa-times mr-2"></i> Cancel
              </button>
              <button
                type="submit"
                onClick={handleCreateProduct}
                className="order-1 sm:order-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
              >
                <i className="fas fa-save mr-2"></i> Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
