import React from 'react'
import NotAvailable from '../../../common/NotAvailable'
import { generatSerialNumber } from '../../../../utils/generatePageNumber'

const ComingSoonPosterTable = ({comingsoon,handleDeletePoster,setIsEditModeMethod}) => {
  const page=generatSerialNumber()
    return (
    <div>
       {/* <!-- Table Container: Applied modern styling --> */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
            {/* <!-- Responsive Table Wrapper --> */}
            <div className="overflow-x-auto">
                {
                  comingsoon && (comingsoon.length > 0)?   
                <table className="min-w-full divide-y divide-gray-200">
                    {/* <!-- Table Header: Updated padding and text style --> */}
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image Preview</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    
                    {/* <!-- Table Body --> */}
                    <tbody className="bg-white divide-y divide-gray-100">
                        {
                            comingsoon && (comingsoon.length > 0 ?comingsoon.map(data=>(
                                 <tr key={data._id} className="hover:bg-indigo-50/20 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{page.next().value}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    {/* Removed unnecessary image/icon placeholder divs */}
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{data?.title}</div>
                                    </div>
                                </div>
                            </td>
                            {/* Image Preview Column: Applied modern styling and error handler */}
                            <td className="px-6 py-4">
                                <div className='w-24 h-16 object-cover overflow-hidden rounded-lg border border-gray-200'>
                                   <img 
                                      src={data?.image} 
                                      alt={`Poster: ${data?.title}`} 
                                      className='w-full h-full object-cover'  
                                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/96x64/E0E7FF/4338CA?text=No+Image" }}
                                    />
                                </div>
                            </td>
                            {/* Status Badge: Applied consistent styling */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <p className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${data?.isActive?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}  `}>

                                {
                                    data.isActive?"Active":"Inactive"
                                }
                                </p>
                            </td>

                            {/* Action Buttons: Applied consistent styling */}
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-3">
                                <button 
                                    onClick={()=>setIsEditModeMethod(data)} 
                                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                                >
                                    <i className="fas fa-edit mr-1"></i>Edit/View
                                </button>
                                <button 
                                    onClick={()=>handleDeletePoster(data._id)} 
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

export default ComingSoonPosterTable
