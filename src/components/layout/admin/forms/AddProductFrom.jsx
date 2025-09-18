import React, { useState } from "react";
import ProductVariationForm from "./ProductVariationForm";
import { deepcopyObj } from "../../../../utils/deepCopyObj";
import { variationFormData } from "../../../../utils/formDataObj";
import ImageField from "../../../common/ImageField";
import { productError } from "../../../../utils/errorObj";

const AddProductForm = ({productData,setProductData,closeProductForm}) => {
   const [fieldErrors,setFieldErrors]=useState(deepcopyObj(productError))

   const [variationData,setVariationData]=useState(deepcopyObj(variationFormData))
   const [openVariationForm,setOpenVariationForm]=useState(false)
   function closevariationForm(){
       setOpenVariationForm(false)
        setVariationData(deepcopyObj(variationFormData))
     }
     function openVariationFormMethod(){
       setOpenVariationForm(!openVariationForm)
     }

  return (
    <div class="bg-gray-50 min-h-screen py-8">
    <div class="max-w-6xl mx-auto px-4">
        {/* <!-- Header --> */}
        <div class="mb-8 text-center">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Add New Product</h1>
            <p class="text-gray-600">Fill in the details below to add a new product to your inventory</p>
        </div>

        {/* <!-- Form Container --> */}
        <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <form id="productForm" class="p-6 md:p-8">
                {/* <!-- Basic Information Section --> */}
                <div class="mb-10">
                    <h2 class="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center">
                        <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                        Basic Information
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* <!-- Product Name --> */}
                        <div>
                            <label for="productName" class="block text-sm font-medium text-gray-700 mb-1">
                                Product Name <span class="text-red-500">*</span>
                            </label>
                            <input type="text" id="productName" name="productName" required
                                class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"/>
                           {
                            fieldErrors.productName.isRequired && <p className="text-xs font-medium text-red-700">ProductName is required</p>
                           }
                        </div>
                        
                      
                        
                        {/* <!-- Category --> */}
                        <div>
                            <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
                                Category <span class="text-red-500">*</span>
                            </label>
                            <select id="category" name="category" required
                                class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900">
                                <option value="">Select a category</option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                                <option value="home">Home & Kitchen</option>
                                <option value="beauty">Beauty & Personal Care</option>
                                <option value="sports">Sports & Outdoors</option>
                            </select>
                            {
                            fieldErrors.category.isRequired && <p className="text-xs font-medium text-red-700">Category is required</p>
                           }
                        </div>
                        
                        {/* <!-- Subcategory --> */}
                        <div>
                            <label for="subCategory" class="block text-sm font-medium text-gray-700 mb-1">
                                Subcategory <span class="text-red-500">*</span>
                            </label>
                            <input type="text" id="subCategory" name="subCategory" required
                                class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"/>
                        {
                            fieldErrors.subCategory.isRequired && <p className="text-xs font-medium text-red-700">subCategory is required</p>
                           }
                        </div>
                        
                        {/* <!-- Brand --> */}
                        <div>
                            <label for="brand" class="block text-sm font-medium text-gray-700 mb-1">
                                Brand
                            </label>
                            <input type="text" id="brand" name="brand"
                                class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"/>
                         {
                            fieldErrors.brand.isRequired && <p className="text-xs font-medium text-red-700">Brand is required</p>
                           }
                        </div>
                        
                        {/* <!-- Offer --> */}
                        <div>
                            <label for="offer" class="block text-sm font-medium text-gray-700 mb-1">
                                Offer
                            </label>
                            <input type="number" id="offer" name="offer"
                                class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"/>
                        {
                            fieldErrors.offer.invalidFormat && <p className="text-xs font-medium text-red-700">Offer must be Positive</p>
                           }
                        </div>
                    </div>
                </div>

                {/* <!-- Pricing Section --> */}
                <div class="mb-10">
                    <h2 class="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center">
                        <i class="fas fa-tag text-green-600 mr-2"></i>
                        Pricing Information
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* <!-- Current Price --> */}
                        <div>
                            <label for="currentPrice" class="block text-sm font-medium text-gray-700 mb-1">
                                Current Price <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span class="text-gray-500">₹</span>
                                </div>
                                <input type="number" id="currentPrice" name="currentPrice" required min="0" step="0.01"
                                    class="w-full pl-8 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"/>
                           {
                            
                            fieldErrors.price.current.isRequired && <p className="text-xs font-medium text-red-700">Price is Required</p>
                           
                           }
                            </div>
                        </div>
                        
                        {/* <!-- Original Price --> */}
                        <div>
                            <label for="originalPrice" class="block text-sm font-medium text-gray-700 mb-1">
                                Original Price
                            </label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span class="text-gray-500">₹</span>
                                </div>
                                <input type="number" id="originalPrice" name="originalPrice" min="0" step="0.01"
                                    class="w-full pl-8 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"/>
                            {
                            
                            fieldErrors.price.original.invalidNumber && <p className="text-xs font-medium text-red-700">price is Must be Positive</p>
                           
                           }
                            </div>
                        </div>
                        
                        {/* <!-- Currency --> */}
                        <div>
                            <label for="currency" class="block text-sm font-medium text-gray-700 mb-1">
                                Currency
                            </label>
                            <select id="currency" name="currency"
                                class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900">
                                <option value="₹">₹ (INR)</option>
                                <option value="$">$ (USD)</option>
                                <option value="€">€ (EUR)</option>
                                <option value="£">£ (GBP)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* <!-- Product Details Section --> */}
                <div class="mb-10">
                    <h2 class="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center">
                        <i class="fas fa-align-left text-purple-600 mr-2"></i>
                        Product Details
                    </h2>
                    
                    {/* <!-- Description --> */}
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Description <span class="text-red-500">*</span>
                        </label>
                        <div id="descriptionContainer" class="space-y-3">
                            <div class="description-item flex items-center gap-3">
                                <textarea name="description" rows="2" required
                                    class="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"></textarea>
                                {/* <button type="button" class="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg transition">
                                    <i class="fas fa-trash-alt"></i>
                                </button> */}

                            </div>
                            {
                            
                            fieldErrors.description.isRequired && <p className="text-xs font-medium text-red-700">Description is Required</p>
                           
                           }
                        </div>
                        <button type="button" id="addDescription" class="bg-blue-600 rounded mt-3 hover-duration text-sm p-3 text-white  hover:bg-blue-700 flex items-center">
                            <i class="fas fa-plus-circle mr-1"></i> Add description
                        </button>
                    </div>
                    
                    {/* <!-- Features --> */}
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Features
                        </label>
                        <div id="featuresContainer" class="space-y-3">
                            <div class="feature-item flex items-center gap-3">
                                <input type="text" name="features"
                                    class="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"/>
                                {/* <button type="button" class="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg transition">
                                    <i class="fas fa-trash-alt"></i>
                                </button> */}
                            </div>
                        </div>
                        <button type="button" id="addDescription" class="bg-blue-600 rounded mt-3 hover-duration text-sm p-3 text-white  hover:bg-blue-700 flex items-center">
                            <i class="fas fa-plus-circle mr-1"></i> Add Feature
                        </button>
                    </div>
                    
                    {/* <!-- Additional Info --> */}
                    <div class="mb-6">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Additional Information
                        </label>
                        <div id="additionalInfoContainer" class="space-y-3">
                            <div class="additional-info-item flex items-center gap-3">
                                <input type="text" name="additionalInfo"
                                    class="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"/>
                                {/* <button type="button" class="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg transition">
                                    <i class="fas fa-trash-alt"></i>
                                </button> */}
                            </div>
                        </div>
                        <button type="button" id="addDescription" class="bg-blue-600 rounded mt-3 hover-duration text-sm p-3 text-white  hover:bg-blue-700 flex items-center">
                            <i class="fas fa-plus-circle mr-1"></i> Add Additional Information
                        </button>
                    </div>
                </div>

                {/* <!-- Images Section --> */}
                <div class="mb-10">
                    <h2 class="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center">
                        <i class="fas fa-images text-yellow-600 mr-2"></i>
                        Product Images(Max 4 image You can add)
                    </h2>
                    
                    <ImageField/>
                    {
                            
                            fieldErrors.images.isRequired && <p className="text-xs font-medium text-red-700">images is Required</p>
                           
                           }
                    {/* <!-- Image Preview --> */}
                    <div id="imagePreview" class="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {/* <!-- Image previews will be added here dynamically --> */}
                    </div>
                </div>

                {/* <!-- Variations Section --> */}
                <div class="mb-10">
                    <h2 class="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center">
                        <i class="fas fa-layer-group text-indigo-600 mr-2"></i>
                        Product Variations
                    </h2>
                      <button onClick={openVariationFormMethod} type="button" id="addVariation" class="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition flex items-center">
                        <i class="fas fa-plus-circle mr-2"></i> Add Variation
                    </button>
                    {
                        openVariationForm && 
                    <div className="" >
                        <ProductVariationForm variationData={variationData} setVariationData={setVariationData} closevariationForm={closevariationForm} />
                    </div>
                    }
                    
                  
                </div>

                {/* <!-- Options Section --> */}
                <div class="mb-10">
                    <h2 class="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center">
                        <i class="fas fa-cog text-gray-600 mr-2"></i>
                        Product Options
                    </h2>
                    
                    <div class="flex items-center">
                        <input type="checkbox" id="isTrending" name="isTrending" class="h-5 w-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/>
                        <label for="isTrending" class="ml-2 block text-sm text-gray-700">
                            Mark as trending product
                        </label>
                    </div>
                </div>

                {/* <!-- Form Actions --> */}
                <div class="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200">
                    <button onClick={closeProductForm} type="button" class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                        <i class="fas fa-times mr-2"></i> Cancel
                    </button>
                    <button type="submit" class="px-6 py-3 bg-black text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
                        <i class="fas fa-save mr-2"></i> Save Product
                    </button>
                </div>
            </form>
        </div>
    </div>
     </div>

  );
};

export default AddProductForm;
