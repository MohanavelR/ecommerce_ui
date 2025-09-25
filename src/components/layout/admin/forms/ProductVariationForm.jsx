import React, { useState } from 'react'
import ImageField from '../../../common/ImageField'
import { deepcopyObj } from '../../../../utils/deepCopyObj'
import { variationError } from '../../../../utils/errorObj'
import CloseBtn from '../../../common/CloseBtn'
import { variationFormData } from '../../../../utils/formDataObj'
import { uploadImageToCloudinary } from '../../../../utils/imageUploader'
import Progress from '../../../common/Progress'
import Loader from '../../../common/Loader'

const ProductVariationForm = ({variationData, save,setVariationData, closevariationForm}) => {
  const [fieldErrors,setFieldErrors]=useState(deepcopyObj(variationError))
  const [progressbar,setprogressbar]=useState({
      is_show:false,
      percentage:0,
      text:""
    })
  const [isUpload,setUpload]=useState(false)  
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
  
  function handleVariation(variation) {
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
  if (variationData.price<=0) {
    hasError = true;
    localError.price.isRequired = true;
  } else if (variation.price <= 0) {
    hasError = true;
    localError.price.mustBePositive = true;
  }
  if (!variationData.stock) {
    hasError = true;
    localError.stock.isRequired = true;
  } else if (variation.stock < 0) {
    hasError = true;
    localError.stock.mustBePositive = true;
  }
  if (!variationData.image) {
    hasError = true;
    localError.image.isRequired = true;
  }

  setFieldErrors(localError);
  console.log(variationData)
  if(!hasError){
    save("variations",variationData)
    setVariationData(deepcopyObj(variationFormData))
  }

   // true if valid
}
    return (
    <>
    <div id="variationsContainer" className="space-y-6">
  <div className="variation-template">
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">Variation</h3>
        {/* <button
          type="button"
          className="bg-gray-200 hover:bg-red-100 text-gray-600 hover:text-red-600 px-3 py-1 rounded transition"
        >
          <i className="fas fa-trash-alt"></i>
        </button> */}
      </div>

      <form  className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type <span className="text-red-500">*</span>
          </label>
          <input type="text" value={variationData.type} onChange={e=>setVariationData({...variationData,type:e.target.value})} placeholder='ex:Color' className='w-full pl-8 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900' />
          {fieldErrors.type.isRequired && (
            <p className="text-xs font-medium text-red-700 mt-1">
              Type is required
            </p>
          )}
        </div>

        {/* Value */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Value <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={variationData.value}
            name="variationValue"
            onChange={e=>setVariationData({...variationData,value:e.target.value})}
            placeholder='ex:Red'
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
          />
          {fieldErrors.value.isRequired && (
            <p className="text-xs font-medium text-red-700 mt-1">
              Value is required
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Adjustment
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">₹</span>
            </div>
            <input
              type="number"
              name="variationPrice"
              
              value={variationData.price}
              
              onChange={e=>setVariationData({...variationData,price:e.target.value})}
              className="w-full pl-8 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
            />
          </div>
          {fieldErrors.price.isRequired && (
            <p className="text-xs font-medium text-red-700 mt-1">
              price is required
            </p>
          )}
          {fieldErrors.price.mustBePositive && (
            <p className="text-xs font-medium text-red-700 mt-1">
              Price must be positive
            </p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="variationStock"
            min="0"
            value={variationData.stock}
            onChange={e=>setVariationData({...variationData,stock:e.target.value})}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
          />
          {fieldErrors.stock.isRequired && (
            <p className="text-xs font-medium text-red-700 mt-1">
              Stock is required
            </p>
          )}
          {fieldErrors.stock.mustBePositive && (
            <p className="text-xs font-medium text-red-700 mt-1">
              Stock must be greater than 0
            </p>
          )}
        </div>
      </form>

      {/* Images */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Variation Images
        </label>
       <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Image URLs
                        </label>
                        <div id="imagesContainer" class="space-y-3">
                           <div class=" mx-auto p-6">
  <div class="relative">
    <input 
      type="file" 
      id="image" 
      class="hidden" 
      accept="image/*"
      onChange={(e)=>handleImageChangeVariation(e.target.files)}
    />
    
    {/* <!-- Upload Trigger --> */}
    <label 
      for="image" 
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
           {
                           progressbar.is_show &&
                           <div>
                             <p className="text-end text-base font-medium text-gray-600">{progressbar.text}</p>
                             <Progress width={progressbar.percentage} />
                           </div>
                          
                         }         
         <div className="grid grid-cols-2 mt-3 gap-3 sm:grid-cols-3 md:grid-cols-4">
 {
  variationData.image && 
  <div className='relative flex'>
    <img src={variationData.image} ></img>
     <span className="absolute p-3  z-[100] text-white flex justify-end">
                                <button
                                  onClick={()=>setVariationData({...variationData,image:null})}
                                >
                                  <CloseBtn/>
                                </button>
                              </span>
  </div>
 }
</div>

        {fieldErrors.image.isRequired && (
          <p className="text-xs font-medium text-red-700 mt-1">
            At least one image is required
          </p>
        )}
        {fieldErrors.image.formatError && (
          <p className="text-xs font-medium text-red-700 mt-1">
            Invalid image format
          </p>
        )}

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleVariation}
            disabled={isUpload}
            className=" disabled:cursor-copy mt-3 btn-hero"
          >{
            isUpload ?<Loader/>:"Add Variation"
          }
           
          </button>
          <button
            onClick={closevariationForm}
            type="button"
            className="bg-gray-900 rounded mt-3 hover-duration text-sm px-6 py-3 text-white hover:bg-gray-800 flex items-center"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default ProductVariationForm
