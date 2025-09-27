import React, { useState } from 'react'
import ImageField from '../../../common/ImageField'
import { deepcopyObj } from '../../../../utils/deepCopyObj'
import { variationError } from '../../../../utils/errorObj'
import CloseBtn from '../../../common/CloseBtn'
import { variationFormData } from '../../../../utils/formDataObj'
import { uploadImageToCloudinary } from '../../../../utils/imageUploader'
import Progress from '../../../common/Progress'
import Loader from '../../../common/Loader'

const ProductVariationForm = ({variationData,isUpload,setUpload,save,setVariationData, closevariationForm}) => {
  const [fieldErrors,setFieldErrors]=useState(deepcopyObj(variationError))
  const [progressbar,setprogressbar]=useState({
      is_show:false,
      percentage:0,
      text:""
    })
  // const [isUpload,setUpload]=useState(false)  
  
  const handleImageChangeVariation = async(files) => {
    setUpload(true)
    setprogressbar({...progressbar,is_show:true,text:"Uploading...",percentage:0})
    const file =files[0];
    const uploadedUrl = await uploadImageToCloudinary(file, (percent) => {
        console.log(percent)
        setprogressbar({...progressbar,is_show:true,percentage:(percent-1),text:"Uploading..."});
      });
    setprogressbar({...progressbar,is_show:true,percentage:100,text:"Uploaded!"})  

    setVariationData((prev) => ({
      ...prev,
      image: uploadedUrl   // store as an array with only 1 file
    }));
    setUpload(false)
      setTimeout(()=>{
      setprogressbar({is_show:false})
    },8000)
  };

  
  function removeListDataMethod(e,key, index) {
    e.preventDefault()
    setVariationData({
      ...variationData,
      [key]: variationData[key].filter((_, i) => i !== index),
    });
  }
  
  function handleVariation() {
  const localError = deepcopyObj(variationError);
  let hasError = false;
  
  // Validation checks
  if (!variationData.type || variationData.type.trim() === "") {
    hasError = true;
    localError.type.isRequired = true;
  }
  if (!variationData.value || variationData.value.trim() === "") {
    hasError = true;
    localError.value.isRequired = true;
  }
  
  // Price validation
  const price = parseFloat(variationData.price);
  if (isNaN(price)) {
    hasError = true;
    localError.price.isRequired = true;
  } else if (price <= 0) {
    hasError = true;
    localError.price.mustBePositive = true;
  }
  
  // Stock validation
  const stock = parseInt(variationData.stock);
  if (isNaN(stock) || variationData.stock === "") {
    hasError = true;
    localError.stock.isRequired = true;
  } else if (stock < 0) {
    hasError = true;
    localError.stock.mustBePositive = true;
  }

  if (!variationData.image) {
    hasError = true;
    localError.image.isRequired = true;
  }

  setFieldErrors(localError);
  
  if(!hasError){
    save("variations",variationData)
    setVariationData(deepcopyObj(variationFormData))
  }
}

    return (
    <>
      <div id="variationsContainer" className="space-y-6">
        <div className="variation-template">
          {/* Main Card Container */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xl">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h3 className="text-2xl font-extrabold text-gray-900">Add Product Variation</h3>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              {/* Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Type <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={variationData.type} 
                  onChange={e=>setVariationData({...variationData,type:e.target.value.toLowerCase()})} 
                  placeholder='e.g., Color, Size, Material' 
                  className='w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 placeholder-gray-400' 
                />
                {fieldErrors.type.isRequired && (
                  <p className="text-xs font-medium text-red-700 mt-1">
                    Variation type (e.g., 'Color') is required
                  </p>
                )}
              </div>

              {/* Value */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Value <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={variationData.value}
                  name="variationValue"
                  onChange={e=>setVariationData({...variationData,value:e.target.value.toLowerCase()})}
                  placeholder='e.g., Red, Large'
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900 placeholder-gray-400"
                />
                {fieldErrors.value.isRequired && (
                  <p className="text-xs font-medium text-red-700 mt-1">
                    Variation value (e.g., 'Red') is required
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Price Adjustment <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">₹</span>
                  </div>
                  <input
                    type="number"
                    name="variationPrice"
                    value={variationData.price}
                    onChange={e=>setVariationData({...variationData,price:e.target.value})}
                    className="w-full pl-8 pr-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900"
                    min="0.01"
                    step="0.01"
                  />
                </div>
                {fieldErrors.price.isRequired && (
                  <p className="text-xs font-medium text-red-700 mt-1">
                    Price is required
                  </p>
                )}
                {fieldErrors.price.mustBePositive && (
                  <p className="text-xs font-medium text-red-700 mt-1">
                    Price must be greater than 0
                  </p>
                )}
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="variationStock"
                  min="0"
                  value={variationData.stock}
                  onChange={e=>setVariationData({...variationData,stock:e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-900"
                />
                {fieldErrors.stock.isRequired && (
                  <p className="text-xs font-medium text-red-700 mt-1">
                    Stock quantity is required
                  </p>
                )}
                {fieldErrors.stock.mustBePositive && (
                  <p className="text-xs font-medium text-red-700 mt-1">
                    Stock must be 0 or greater
                  </p>
                )}
              </div>
            </form>

            {/* Images */}
            <div className="mt-8 border-t pt-6 border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Variation Image <span className="text-red-500">*</span>
              </label>
              
              {/* Upload Area */}
              <div className="mb-4">
                <div id="imagesContainer" className="space-y-3">
                  <div className="relative">
                    <input 
                      type="file" 
                      id="image" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e)=>handleImageChangeVariation(e.target.files)}
                      disabled={isUpload}
                    />
                    
                    <label 
                      htmlFor="image" 
                      className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer transition-colors p-4 
                      ${isUpload ? "bg-gray-100 border-gray-400" : "bg-gray-50 border-gray-300 hover:bg-gray-100"}`}
                    >
                      <svg 
                        className="w-12 h-12 mb-2 text-gray-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      
                      <p className="mb-1 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </label>
                  </div>
                </div>
              </div> 
            
              {/* Progress Bar */}
              {progressbar.is_show && (
                <div className="mt-3">
                  <p className="text-end text-sm font-medium text-gray-600">{progressbar.text}</p>
                  <Progress width={progressbar.percentage} />
                </div>
              )}
                      
              {/* Image Preview */}
              <div className="grid grid-cols-1 mt-4">
                {variationData.image && 
                  <div className='relative w-48 border border-gray-300 rounded-lg shadow-md p-2 bg-white'>
                    <img src={variationData.image} alt="Variation Preview" className='rounded w-full h-auto object-cover' />
                    <span className="absolute top-[-8px] right-[-8px] p-0">
                      <button
                        onClick={() => setVariationData({...variationData, image: null})}
                        type="button"
                        className="bg-red-600 p-1 rounded-full text-white hover:bg-red-700 transition shadow-lg flex items-center justify-center h-6 w-6"
                      >
                        <i className="fas fa-times text-xs"></i>
                      </button>
                    </span>
                  </div>
                }
              </div>

              {fieldErrors.image.isRequired && (
                <p className="text-xs font-medium text-red-700 mt-1">
                  Image is required
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6 border-t border-gray-200 mt-6">
              <button
                type="button"
                onClick={handleVariation}
                disabled={isUpload}
                className={`flex items-center justify-center px-8 py-3 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md shadow-indigo-500/50 text-base
                ${isUpload ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                {isUpload ? <Loader /> : "Add Variation"}
              </button>
              <button
                onClick={closevariationForm}
                type="button"
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium text-base shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductVariationForm