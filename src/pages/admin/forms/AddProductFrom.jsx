import React from "react";

const AddProductForm = () => {
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
                        </div>
                        
                        {/* <!-- Subcategory --> */}
                        <div>
                            <label for="subCategory" class="block text-sm font-medium text-gray-700 mb-1">
                                Subcategory <span class="text-red-500">*</span>
                            </label>
                            <input type="text" id="subCategory" name="subCategory" required
                                class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"/>
                        </div>
                        
                        {/* <!-- Brand --> */}
                        <div>
                            <label for="brand" class="block text-sm font-medium text-gray-700 mb-1">
                                Brand
                            </label>
                            <input type="text" id="brand" name="brand"
                                class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"/>
                        </div>
                        
                        {/* <!-- Offer --> */}
                        <div>
                            <label for="offer" class="block text-sm font-medium text-gray-700 mb-1">
                                Offer
                            </label>
                            <input type="text" id="offer" name="offer"
                                class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"/>
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
                                <button type="button" class="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg transition">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                        <button type="button" id="addDescription" class="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center">
                            <i class="fas fa-plus-circle mr-1"></i> Add another description
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
                                <button type="button" class="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg transition">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                        <button type="button" id="addFeature" class="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center">
                            <i class="fas fa-plus-circle mr-1"></i> Add another feature
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
                                <button type="button" class="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg transition">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                        <button type="button" id="addAdditionalInfo" class="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center">
                            <i class="fas fa-plus-circle mr-1"></i> Add additional information
                        </button>
                    </div>
                </div>

                {/* <!-- Images Section --> */}
                <div class="mb-10">
                    <h2 class="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center">
                        <i class="fas fa-images text-yellow-600 mr-2"></i>
                        Product Images
                    </h2>
                    
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Image URLs
                        </label>
                        <div id="imagesContainer" class="space-y-3">
                           <div class=" mx-auto p-6">
  {/* <!-- Upload Container --> */}
  <div class="relative">
    {/* <!-- Hidden File Input --> */}
    <input 
      type="file" 
      id="image-upload" 
      class="hidden" 
      accept="image/*"
      onchange="previewImage(event)"
    />
    
    {/* <!-- Upload Trigger --> */}
    <label 
      for="image-upload" 
      class="flex flex-col items-center justify-center w-full h-30 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      {/* <!-- Upload Icon --> */}
      <svg class="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
      
      {/* <!-- Upload Text --> */}
      <p class="mb-2 text-sm text-gray-500">
        <span class="font-semibold">Click to upload</span> or drag and drop
      </p>
      <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
    </label>
    
    {/* <!-- Image Preview (Hidden by default) --> */}
    <div id="image-preview" class="hidden absolute inset-0 rounded-lg overflow-hidden">
      <img id="preview-img" src="" alt="Preview" class="w-full h-full object-cover"/>
      
      {/* <!-- Remove Button --> */}
      <button 
        type="button" 
        onclick="removeImage()"
        class="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </div>
  
  {/* <!-- Selected File Info (Hidden by default) --> */}
  <div id="file-info" class="hidden mt-4 text-sm text-gray-600">
    <p>Selected file: <span id="file-name" class="font-medium"></span></p>
    <p>File size: <span id="file-size" class="font-medium"></span></p>
  </div>
</div>
                        </div>
                        <button type="button" id="addImage" class="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center">
                            <i class="fas fa-plus-circle mr-1"></i> Add another image
                        </button>
                    </div>
                    
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
                    
                    <div id="variationsContainer" class="space-y-6">
                        {/* <!-- Variation Template (Hidden) --> */}
                        <div class="variation-template hidden">
                            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <div class="flex justify-between items-center mb-4">
                                    <h3 class="font-medium text-gray-900">Variation</h3>
                                    <button type="button" class="bg-gray-200 hover:bg-red-100 text-gray-600 hover:text-red-600 px-3 py-1 rounded transition">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* <!-- Type --> */}
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Type <span class="text-red-500">*</span>
                                        </label>
                                        <select name="variationType" required
                                            class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900">
                                            <option value="">Select type</option>
                                            <option value="color">Color</option>
                                            <option value="size">Size</option>
                                            <option value="material">Material</option>
                                            <option value="style">Style</option>
                                        </select>
                                    </div>
                                    
                                    {/* <!-- Value --> */}
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Value <span class="text-red-500">*</span>
                                        </label>
                                        <input type="text" name="variationValue" required
                                            class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"/>
                                    </div>
                                    
                                    {/* <!-- Price --> */}
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Price Adjustment
                                        </label>
                                        <div class="relative">
                                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span class="text-gray-500">₹</span>
                                            </div>
                                            <input type="number" name="variationPrice" min="0" step="0.01"
                                                class="w-full pl-8 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"/>
                                        </div>
                                    </div>
                                    
                                    {/* <!-- Stock --> */}
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Stock <span class="text-red-500">*</span>
                                        </label>
                                        <input type="number" name="variationStock" required min="0"
                                            class="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"/>
                                    </div>
                                </div>
                                
                                {/* <!-- Variation Images --> */}
                                <div class="mt-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Variation Images
                                    </label>
                                    <div class="variation-images-container space-y-3">
                                        <div class="variation-image-item flex items-center gap-3">
                                            <input type="text" name="variationImages" placeholder="https://example.com/image.jpg"
                                                class="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"/>
                                            <button type="button" class="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 px-3 py-1 rounded transition">
                                                <i class="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <button type="button" class="add-variation-image mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center">
                                        <i class="fas fa-plus-circle mr-1"></i> Add another image
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <button type="button" id="addVariation" class="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition flex items-center">
                        <i class="fas fa-plus-circle mr-2"></i> Add Variation
                    </button>
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
                    <button type="button" class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
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
