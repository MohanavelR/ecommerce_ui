import React, { useState } from 'react'
import ImageField from '../../../common/ImageField'
import { deepcopyObj } from '../../../../utils/deepCopyObj'
import { variationError } from '../../../../utils/errorObj'
import CloseBtn from '../../../common/CloseBtn'
import { variationFormData } from '../../../../utils/formDataObj'
import { uploadImageToCloudinary } from '../../../../utils/imageUploader'
import Progress from '../../../common/Progress'
import Loader from '../../../common/Loader'
import generateVariationKey from '../../../../utils/generateVariationkey'

const ProductVariationForm = ({variationData,setProductData,isVariationEditMode,productData,editIndex,isUpload,setUpload,save,setVariationData, closevariationForm}) => {
  const [fieldErrors,setFieldErrors]=useState(deepcopyObj(variationError))
  const [progressbar,setprogressbar]=useState({
      is_show:false,
      percentage:0,
      text:""
    })
  
  
  const handleTopLevelChange = (e) => {
    const { name, value } = e.target;

    const newValue = (name === 'stock' || name === 'offer') ? (value === '' ? '' : parseFloat(value)) : value.toLowerCase();
    
    setVariationData(prev => ({
        ...prev,
        [name]: newValue
    }));
  }

  // Helper to handle nested price changes
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);
    setVariationData(prev => ({
        ...prev,
        price: {
            ...prev.price,
            // Store original value for display, let validation handle parsing
            [name]: value 
        }
    }));
  }

  const handleImageChangeVariation = async(files) => {
    setUpload(true)
    setprogressbar({...progressbar,is_show:true,text:"Uploading...",percentage:0})
    const file =files[0];    
    if (!file) {
        setUpload(false);
        setprogressbar({ is_show: false });
        return;
    }

    const uploadedUrl = await uploadImageToCloudinary(file, (percent) => {
        setprogressbar(prev => ({
          ...prev,
          is_show: true,
          percentage: percent < 100 ? percent : 99,
          text: "Uploading..."
        }));
      });

    setprogressbar({...progressbar,is_show:true,percentage:100,text:"Uploaded!"})  

    setVariationData((prev) => ({
      ...prev,
      image: uploadedUrl
    }));
    setUpload(false)
      setTimeout(()=>{
      setprogressbar({is_show:false})
    },3000)
  };

  
  function handleVariation() {
  const localError = deepcopyObj(variationError);
  let hasError = false;
  if (!variationData.type || variationData.type.trim() === "") {
    hasError = true;
    localError.type.isRequired = true;
  }
  if (!variationData.value || variationData.value.trim() === "") {
    hasError = true;
    localError.value.isRequired = true;
  }
  
  const currentPriceInput = variationData.price.current;
  const originalPriceInput = variationData.price.original;
  const currentPrice = parseFloat(currentPriceInput);
  const originalPrice = parseFloat(originalPriceInput);
  

  if (currentPriceInput === '' || isNaN(currentPrice)) {
    hasError = true;
    localError.price.current.isRequired = true; 
  } else if (currentPrice <= 0) {
    hasError = true;
    localError.price.current.mustBePositive = true;
  }


  if (originalPriceInput !== '' && !isNaN(originalPrice) && originalPrice < 0) {
    hasError = true;
    localError.price.original.mustBePositive = true;
  }
  

  const offerInput = variationData.offer;
  const offer = parseFloat(offerInput);
  
  // The offer field is generally optional, treating empty as 0.
  if (offerInput !== '' && (isNaN(offer) || offer < 0 || offer > 100)) {
    hasError = true;
    localError.offer.mustBePositive = true; // Reusing mustBePositive for range check
  }

  // --- 4. Stock Validation ---
  const stockInput = variationData.stock;
  const stock = parseInt(stockInput);
  
  if (stockInput === '' || isNaN(stock)) {
    hasError = true;
    localError.stock.isRequired = true;
  } else if (stock < 0) {
    hasError = true;
    localError.stock.mustBePositive = true;
  }

  // --- 5. Image Validation ---
  if (!variationData.image) {
    hasError = true;
    localError.image.isRequired = true;
  }
  setFieldErrors(localError);
  if(!hasError){
    if(isVariationEditMode){
      const updateVariations=[...productData.variations]
      updateVariations[editIndex]=deepcopyObj(variationData)
      setProductData({...productData,variations:[...updateVariations]})
      closevariationForm()
    }
    else{
      save("variations",deepcopyObj({...variationData,key:generateVariationKey(productData.productName)}))
    }
  }
}

    return (
    <>
      <div id="variationsContainer" className="space-y-6">
        <div className="variation-template">
          {/* Main Card Container */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xl">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h3 className="text-2xl font-extrabold text-gray-900">{isVariationEditMode?"Edit":"Add"} Product Variation</h3>
              <button onClick={closevariationForm} className='text-gray-500 hover:text-gray-700 transition'>
                <CloseBtn />
              </button>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              
              {/* Type */}
              <div>
                <label className="admin-form-label">
                  Type <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="type"
                  value={variationData.type} 
                  onChange={handleTopLevelChange} 
                  placeholder='e.g., Color, Size, Material' 
                  className='admin-form-input' 
                />
                {fieldErrors.type?.isRequired && (
                  <p className="fielderror">
                    Variation type (e.g., 'Color') is required
                  </p>
                )}
              </div>

              {/* Value */}
              <div>
                <label className="admin-form-label">
                  Value <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="value"
                  value={variationData.value}
                  onChange={handleTopLevelChange}
                  placeholder='e.g., Red, Large'
                  className="admin-form-input"
                />
                {fieldErrors.value?.isRequired && (
                  <p className="fielderror">
                    Variation value (e.g., 'Red') is required
                  </p>
                )}
              </div>

              {/* Current Price (from nested price.current) */}
              <div>
                <label className="admin-form-label">
                  Current Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">{variationData.price.currency}</span>
                  </div>
                  <input
                    type="number"
                    name="current" // Matches the key in price object
                    value={variationData.price.current}
                    onChange={handlePriceChange}
                    className="admin-form-input-with-icon"
                    min="0.01"
                    step="0.01"
                  />
                </div>
                {fieldErrors.price.current?.isRequired && (
                  <p className="fielderror">
                    Current Price is required.
                  </p>
                )}
                {fieldErrors.price.current?.mustBePositive && (
                  <p className="fielderror">
                    Current Price must be greater than 0.
                  </p>
                )}
              </div>

              {/* Original Price (from nested price.original) */}
              <div>
                <label className="admin-form-label">
                  Original Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">{variationData.price.currency}</span>
                  </div>
                  <input
                    type="number"
                    name="original" // Matches the key in price object
                    value={variationData.price.original}
                    onChange={handlePriceChange}
                    className="admin-form-input-with-icon"
                    min="0"
                    step="0.01"
                    placeholder='0.00'
                  />
                </div>
                 {fieldErrors.price.original?.mustBePositive && (
                  <p className="fielderror">
                    Original Price cannot be negative.
                  </p>
                )}
              </div>
              
              {/* Offer */}
              <div>
                <label className="admin-form-label">
                  Offer (%)
                </label>
                <div className="relative">
                    <input
                      type="number"
                      name="offer"
                      min="0"
                      max="100"
                      value={variationData.offer}
                      onChange={handleTopLevelChange}
                      className="admin-form-input"
                      placeholder="0"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 font-medium">%</span>
                    </div>
                </div>
                {fieldErrors.offer?.mustBePositive && (
                  <p className="fielderror">
                    Offer must be between 0 and 100.
                  </p>
                )}
              </div>

              {/* Stock */}
              <div>
                <label className="admin-form-label">
                  Stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  min="0"
                  value={variationData.stock}
                  onChange={handleTopLevelChange}
                  className="admin-form-input"
                />
                {fieldErrors.stock?.isRequired && (
                  <p className="fielderror">
                    Stock quantity is required.
                  </p>
                )}
                {fieldErrors.stock?.mustBePositive && (
                  <p className="fielderror">
                    Stock must be 0 or greater.
                  </p>
                )}
              </div>
            </form>

            {/* Images */}
            <div className="mt-8 border-t pt-6 border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Variation Image <span className="text-red-500">*</span>
              </label>
              
              {/* Upload Area and Preview (kept the same as previous) */}
              <div className="mb-4">
                <div id="imagesContainer" className="space-y-3">
                  <div className="relative">
                    <input 
                      type="file" 
                      id="variation-image" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e)=>handleImageChangeVariation(e.target.files)}
                      disabled={isUpload}
                    />
                    
                    <label 
                      htmlFor="variation-image" 
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
                        <span className="font-semibold">Click to upload</span> {variationData.image ? "new image" : "image"}
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

              {fieldErrors.image?.isRequired && (
                <p className="fielderror">
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
                className="admin-save-btn"
              >
                {isUpload ? <Loader /> : `${isVariationEditMode?"Update":"Add"} Variation`}
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