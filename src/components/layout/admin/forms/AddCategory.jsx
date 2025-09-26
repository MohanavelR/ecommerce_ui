import React, { useState } from 'react'
import CloseBtn from '../../../common/CloseBtn'

const AddCategory = ({formData,setFormData,handleCategoryMethod,fielderrors,closeCategoryFormMethod,isEditMode,setIsEditMode}) => {
  const [subCategory,setSubCategory]=useState("")
  function addSubCategoryinList(e){

    e.preventDefault()
    if(subCategory!==""){
        setFormData({...formData,subcategories:[...formData.subcategories,subCategory]})
         setSubCategory("")
    }
  }
   function removeInList(index){
    setFormData({...formData,subcategories:formData.subcategories.filter((v,i)=>i!=index)})
   }
  return (
    <>
   <div className='fixed inset-0 bg-black/60 flex justify-center items-center z-[900] overflow-y-auto'>

      <div class="container mx-auto px-4 max-w-2xl">
        {/* <!-- Form Header --> */}
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="bg-accent-foreground p-6 text-white">
                <div class="flex items-center">
                    {/* <div class="bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-lg mr-4">
                        <i class="fas fa-folder-plus text-2xl"></i>
                    </div> */}
                    <div>
                        <h1 class="text-2xl font-bold">{isEditMode?"Update":"Add New"} Category</h1>
                        <p class="text-indigo-100 mt-1">Create a category with subcategories</p>
                    </div>
                </div>
            </div>
            
            {/* <!-- Form Body --> */}
            <form class="p-6 space-y-6" id="categoryForm">
                {/* <!-- Category Name --> */}
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
                            class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            placeholder="Enter category name"
                            
                        />
                    </div>
                    <p class="mt-1 text-sm text-gray-500">This name must be unique</p>
                    {
                        fielderrors.categoryName && <p className='text-xs font-medium text-red-700'>Category name is required</p>
                    }
                </div>
                
                {/* <!-- Subcategories Section --> */}
               <div>
                    <label for="subcategoryName" class="block text-sm font-semibold text-gray-700 mb-2">
                       SubCategory  <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i class="fas fa-tag text-gray-400"></i>
                        </div>
                        <input 
                            type="text" 
                            id="subcategoryName" 
                            name="subcategoryName"
                            value={subCategory}
                            onChange={(e)=>setSubCategory(e.target.value.trim())}
                            class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            placeholder="Enter category name"
                            required
                        />
                    </div>
                     {
                        fielderrors.subCategory && <p className='text-xs font-medium text-red-700'>At least one subcategory is required. </p>
                    }
                   {
                    formData.subcategories && formData.subcategories.length > 0 && formData.subcategories.map((sub,index)=>(
                      <div className="flex bg-gray-300 mt-2 relative">
                          <p className="w-[90%] font-medium truncate p-3 ">
                            {sub}
                          </p>
                          <span onClick={() =>
                                removeInList( index)
                              } className="absolute cursor-pointer p-3 w-full z-[100] text-amber-800 flex justify-end">
                        
                              
                            
                              <CloseBtn/>
                      
                          </span>
                        </div>
                      
                    ))
                   }

                  <button onClick={addSubCategoryinList} className='admin-form-btn'>Add</button>
                </div>
                
                {/* <!-- Form Actions --> */}
                <div class="flex justify-between items-center pt-4 border-t border-gray-200">
                    <button onClick={closeCategoryFormMethod} type="button" class="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        Cancel
                    </button>
                    <button onClick={handleCategoryMethod} type="" class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 flex items-center">
                        <i class="fas fa-save mr-2"></i>
                        Save Category
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
