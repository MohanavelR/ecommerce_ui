import React from 'react'

const FilteOption = ({catogoryOptions,handleFilter, filters}) => {
  return (
    <div>
      <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Category</h4>
                <div className="space-y-2">
                    {catogoryOptions.map((value, index) => (
                        <label 
                            key={index} 
                            className="flex items-center text-sm text-gray-600 hover:text-primary cursor-pointer"
                        >
                            <input 
                                type="checkbox" 
                                name="category"
                                 checked={ filters?.['category']?.includes(value.categorySKU) || false} onChange={() => handleFilter("category", value.categorySKU)}
                                className="mr-2  text-blue-600 rounded border-gray-300 focus:ring-blue-500 h-4 w-4" 
                            />
                            {value.categoryName}
                        </label>
                    ))}
                </div>
            </div>
    </div>
  )
}

export default FilteOption
