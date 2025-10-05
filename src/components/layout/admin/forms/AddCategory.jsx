import React, { useState } from 'react'
import CloseBtn from '../../../common/CloseBtn'
import Loader from '../../../common/Loader'

const AddCategory = ({formData,setFormData,handleCategoryMethod,fielderrors,closeCategoryFormMethod,isEditMode,setIsEditMode}) => {
  const [subCategory,setSubCategory]=useState("")
  function addSubCategoryinList(e) {
  e.preventDefault();
  
  if (subCategory.trim() !== "") {
    setFormData({
      ...formData,
      subcategories: [
        ...formData.subcategories,
        {
          name: subCategory.trim(),
          createdAt: new Date().toISOString() // Use ISO string for consistency
        }
      ]
    });
    
    setSubCategory(""); // Clear input
  }
}

   function removeInList(index){
    setFormData({...formData,subcategories:formData.subcategories.filter((v,i)=>i!=index)})
   }
  return (
    <>
   {/* Modal Container: Centered backdrop */}
   <div className='fixed inset-0 bg-black/60  z-[900] overflow-y-auto p-4'>

      <div class="container mx-auto max-w-2xl">
        {/* */}
        <div class="bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* */}
            <div class="bg-accent-foreground p-6 text-white">
                <div class="flex items-center">
                    <div>
                        <h1 class="text-2xl font-bold">{isEditMode?"Update":"Add New"} Category</h1>
                        <p class="text-indigo-100 mt-1"> {!isEditMode && "Create a category with subcategories" } </p>
                    </div>
                </div>
            </div>
            
            {/* */}
            <form class="p-6 space-y-6" id="categoryForm" onSubmit={(e) => e.preventDefault()}>
                {/* */}
                <div>
                    <label for="categoryName" class="block text-sm font-semibold text-gray-700 mb-2">
                        Category Name <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="fas fa-tag text-gray-400"></i>
                        </div>
                        <input 
                            type="text" 
                            id="categoryName" 
                            name="categoryName"
                            value={formData.categoryName.trim()}
                            onChange={(e)=>setFormData({...formData,categoryName:e.target.value})}
                            // Updated input styling for cleaner look
                            class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            placeholder="Enter category name"
                            
                        />
                    </div>
                    <p class="mt-1 text-sm text-gray-500">This name must be unique</p>
                    {
                        fielderrors.categoryName && <p className='text-xs font-medium text-red-700 mt-1'>Category name is required</p>
                    }
                </div>
                
                {/* */}
               <div>
                    <label for="subcategoryName" class="block text-sm font-semibold text-gray-700 mb-2">
                       SubCategory  <span class="text-red-500">*</span>
                    </label>
                    <div class="relative flex space-x-3">
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-list text-gray-400"></i>
                            </div>
                            <input 
                                type="text" 
                                id="subcategoryName" 
                                name="subcategoryName"
                                value={subCategory}
                                onChange={(e)=>setSubCategory(e.target.value.trim())}
                                // Updated input styling
                                class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                placeholder="Enter subcategory name"
                                required
                            />
                        </div>
                         {/* Updated Subcategory Add button style */}
                        <button 
                            onClick={addSubCategoryinList} 
                            type="button"
                            className='px-4 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition duration-200 whitespace-nowrap'
                        >
                            Add
                        </button>
                    </div>
                     {
                        fielderrors.subCategory && <p className='text-xs font-medium text-red-700 mt-1'>At least one subcategory is required. </p>
                    }
                   
                   {/* Subcategory List Display - New Professional Design */}
                   <div className="mt-4 space-y-2">
                        {formData.subcategories && formData.subcategories.length > 0 && formData.subcategories.map((sub,index)=>(
                            <div 
                                key={index}
                                // New clean list item style
                                className="flex items-center justify-between bg-gray-100 rounded-lg p-3 border border-gray-200 shadow-sm"
                            >
                                <p className="font-medium text-gray-700 truncate pr-4">
                                    {sub.name}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => removeInList(index)}
                                    // Remove button style
                                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition duration-200 flex-shrink-0"
                                >
                                    <CloseBtn/>
                                </button>
                            </div>
                        ))}
                   </div>

                </div>
                
                {/* */}
                <div class="flex justify-between items-center pt-4 border-t border-gray-200">
                    <button 
                        onClick={closeCategoryFormMethod} 
                        type="button" 
                        // Updated Cancel button style
                        class="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium shadow-sm"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleCategoryMethod} 
                        type="submit" 
                        // Kept original Save button styling
                        class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 flex items-center font-medium shadow-md shadow-indigo-500/50"
                    >
                        <i class="fas fa-save mr-2"></i>
                         {
                isEditMode ? "Update Category" : "Save Category" 
               } 
                    </button>
                </div>
            </form>
        </div>
         
    
    </div>
   </div>

    </>
  )
}

export default AddCategory