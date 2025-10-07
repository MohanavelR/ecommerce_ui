import React from 'react'
import NotAvailable from '../../../common/NotAvailable'
import { generatSerialNumber } from '../../../../utils/generatePageNumber'
// import { generatepageNumber } from '../../../../utils/generatePageNumber'

const CategoryTable = ({categoryList,handleDeleteCategory,setIsEditModeMethod}) => {
    let page=generatSerialNumber()
  return (
    <div>
       {/* */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
            {/* */}
            <div className="overflow-x-auto">
                {
                  categoryList && (categoryList.length > 0)?   
                <table className="min-w-full divide-y divide-gray-200">
                    {/* */}
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th scope="col" className="admin-table-th">#</th>
                            <th scope="col" className="admin-table-th">Category Name</th>
                            <th scope="col" className="admin-table-th">Subcategories</th>
                            {/* <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created At</th> */}
                            <th scope="col" className="admin-table-th">Actions</th>
                        </tr>
                    </thead>
                    
                    {/* */}
                    <tbody className="bg-white divide-y divide-gray-100">
                        {
                            categoryList && (categoryList.length > 0 ?categoryList.map(category=>(
                                 <tr key={category._id} className="admin-table-tr">
                            <td className="admin-table-td">{page.next().value}</td>
                            <td className="admin-table-td">
                                <div className="flex items-center justify-center">
                                    <div className="ml-0">
                                        <div className="text-sm text-center font-medium text-gray-900 capitalize">{category?.categoryName}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="admin-table-td">
                                <div className="text-sm font-medium text-gray-900">{category?.subcategories.length}</div>
                                <div className="text-xs text-gray-500">{category?.subcategories.length === 1?"subcategory":"subcategories"}</div>
                            </td>
                            {/* <td className="admin-table-td text-sm text-gray-500">
                                <div>Jan 15, 2024</div>
                                <div>10:30 AM</div>
                            </td> */}
                            <td className="admin-table-td text-center text-sm font-medium space-x-3">
                                <button 
                                    onClick={()=>setIsEditModeMethod(category)} 
                                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                                >
                                    <i className="fas fa-edit mr-1"></i>Edit/View
                                </button>
                                <button 
                                    onClick={()=>handleDeleteCategory(category._id)} 
                                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                                >
                                    <i className="fas fa-trash-alt mr-1"></i>Delete
                                </button>
                            </td>
                        </tr>
                            ))
                                
                                :<NotAvailable/>)
                        
                        }
                    </tbody>
                </table>:<NotAvailable/>
                }
            </div>
        </div>
    </div>
  )
}

export default CategoryTable