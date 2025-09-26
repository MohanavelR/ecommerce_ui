import React from 'react'
import NotAvailable from '../../../common/NotAvailable'

const SliderTable = ({sliders,setIsEditModeMethod,handleDeleteSlider}) => {
  return (
    <div>
       {/* <!-- Table Container --> */}
        <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            {/* <!-- Responsive Table Wrapper --> */}
            <div class="overflow-x-auto">
                {
                    sliders && (sliders.length > 0)?
                        
                <table class="min-w-full divide-y divide-gray-200">
                    {/* <!-- Table Header --> */}
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heading</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image Preview</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            {/* <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th> */}
                            <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    
                    {/* <!-- Table Body --> */}
                    <tbody class="bg-white divide-y divide-gray-200">
                        {
                            sliders.map((slider)=>(
                        <tr class="hover:bg-gray-50 transition-colors duration-150">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">{slider?.title}</div>
                                <div class="text-sm text-gray-500">{slider?.subtitle}</div>
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm text-gray-900 max-w-xs truncate">
                                   {slider.description}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex-shrink-0 h-16 w-24">
                                    <img class="h-16 w-24 rounded-md object-cover" src={slider?.image} alt="Slide preview"/>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {
                                        slider.isActive?"Active":"Disactive"
                                    }
                                </span>
                            </td>

                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={()=>setIsEditModeMethod(slider)} class="text-blue-600 hover:text-blue-900 mr-3 transition-colors duration-200">
                                    <i class="fas fa-edit mr-1"></i>Edit/View
                                </button>
                                <button onClick={()=>handleDeleteSlider(slider._id)} class="text-red-600 hover:text-red-900 transition-colors duration-200">
                                    <i class="fas fa-trash-alt mr-1"></i>Delete
                                </button>
                            </td>
                        </tr>
                            ))
                        }
                        
                       
                        
                        
                    </tbody>
                </table>
                        :<NotAvailable/>
                }
            </div>
        </div>
    </div>
  )
}

export default SliderTable
