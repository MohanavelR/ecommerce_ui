import React, { useState } from 'react'
import ImageField from '../../../common/ImageField'
import { deepcopyObj } from '../../../../utils/deepCopyObj'
import { variationError } from '../../../../utils/errorObj'

const ProductVariationForm = ({variationData, setVariationData, closevariationForm}) => {
  const [fieldErrors,setFieldErrors]=useState(deepcopyObj(variationError))
    return (
    <>
    <div id="variationsContainer" className="space-y-6">
  <div className="variation-template">
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">Variation</h3>
        <button
          type="button"
          className="bg-gray-200 hover:bg-red-100 text-gray-600 hover:text-red-600 px-3 py-1 rounded transition"
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            name="variationType"
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
          >
            <option value="">Select type</option>
            <option value="color">Color</option>
            <option value="size">Size</option>
            <option value="material">Material</option>
            <option value="style">Style</option>
          </select>
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
            name="variationValue"
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
              min="0"
              step="0.01"
              className="w-full pl-8 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
            />
          </div>
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
      </div>

      {/* Images */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Variation Images
        </label>
        <ImageField />
        {fieldErrors.images.isRequired && (
          <p className="text-xs font-medium text-red-700 mt-1">
            At least one image is required
          </p>
        )}
        {fieldErrors.images.formatError && (
          <p className="text-xs font-medium text-red-700 mt-1">
            Invalid image format
          </p>
        )}

        <div className="flex space-x-4">
          <button
            type="button"
            className="bg-blue-600 rounded mt-3 hover-duration text-sm p-3 text-white hover:bg-blue-700 flex items-center"
          >
            Add Variation
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
