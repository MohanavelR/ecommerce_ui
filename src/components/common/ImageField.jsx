import React from 'react'

const ImageField = ({handleImageChange}) => {
  return (
    <>
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
      multiple

      onChange={handleImageChange}
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
  </div>
</div>
                        </div>
                        {/* <button type="button" id="addImage" class="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center">
                            <i class="fas fa-plus-circle mr-1"></i> Add another image
                        </button> */}
                    </div> 
    </>
  )
}

export default ImageField
