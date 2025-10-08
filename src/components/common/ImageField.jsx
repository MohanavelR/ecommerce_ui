import React from 'react'

const ImageField = ({handleImageChange}) => {
  return (
    <>
     <div className="mb-4">
                        <label className="admin-form-label">
                            Image URLs
                        </label>
                        <div id="imagesContainer" className="space-y-3">
                           <div className=" mx-auto p-6">
  {/* <!-- Upload Container --> */}
  <div className="relative">
    {/* <!-- Hidden File Input --> */}
    <input 
      type="file" 
      id="image-upload" 
      className="hidden" 
      accept="image/*"
      onChange={handleImageChange}
    />
    
    {/* <!-- Upload Trigger --> */}
    <label 
      for="image-upload" 
      className="flex flex-col items-center justify-center w-full h-30 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
    >
      {/* <!-- Upload Icon --> */}
      <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
      
      {/* <!-- Upload Text --> */}
      <p className="mb-2 text-sm text-gray-500">
        <span className="font-semibold">Click to upload</span> or drag and drop
      </p>
      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
    </label>
  </div>
</div>
                        </div>
                        {/* <button type="button" id="addImage" className="mt-3 text-sm text-blue-600 hover:text-blue-700 flex items-center">
                            <i className="fas fa-plus-circle mr-1"></i> Add another image
                        </button> */}
                    </div> 
    </>
  )
}

export default ImageField
