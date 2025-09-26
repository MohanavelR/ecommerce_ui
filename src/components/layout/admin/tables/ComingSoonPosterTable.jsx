import React from 'react'
import NotAvailable from '../../../common/NotAvailable'
import { generatSerialNumber } from '../../../../utils/generatePageNumber'

const ComingSoonPosterTable = ({comingsoon,handleDeletePoster,setIsEditModeMethod}) => {
  const page=generatSerialNumber()
    return (
    <div>
       {/* <!-- Table Container --> */}
        <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            {/* <!-- Responsive Table Wrapper --> */}
            <div class="overflow-x-auto">
                {
                  comingsoon && (comingsoon.length > 0)?   
                <table class="min-w-full divide-y divide-gray-200">
                    {/* <!-- Table Header --> */}
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category Name</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategories</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    
                    {/* <!-- Table Body --> */}
                    <tbody class="bg-white divide-y divide-gray-200">
                        {
                            comingsoon && (comingsoon.length > 0 ?comingsoon.map(data=>(
                                 <tr class="hover:bg-gray-50 transition-colors duration-150">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{page.next().value}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 h-10 w-10">
                                        <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <i class="fas fa-laptop text-blue-600"></i>
                                        </div>
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">{data?.title}</div>
                                    {/* <div class="text-sm text-gray-500">ID: CAT001</div> */}
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div className='w-20 object-cover  mt-4'>

                               <img src={data?.image} alt="" className='rounded'  />
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <p className={`${data.isActive?"text-green-500":"text-red-500"} font-bold text-base`}>

                                {
                                    data.isActive?"Active":"InActive"
                                }
                                </p>
                            </td>

                            <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                <button onClick={()=>setIsEditModeMethod(data)} class="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-200">
                                    <i class="fas fa-edit mr-1"></i>Edit/View
                                </button>
                                <button onClick={()=>handleDeletePoster(data._id)} class="text-red-600 hover:text-red-900 transition-colors duration-200">
                                    <i class="fas fa-trash-alt mr-1"></i>Delete
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
