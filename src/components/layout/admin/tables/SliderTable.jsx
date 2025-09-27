import React from 'react';
import NotAvailable from '../../../common/NotAvailable';

// NOTE: Since 'generatSerialNumber' was not provided, we will use 'index + 1' for the serial number
// as a functional equivalent to keep the component self-contained and working.

const SliderTable = ({sliders, setIsEditModeMethod, handleDeleteSlider}) => {
  return (
    <div>
       {/* Table Container: Applied modern styling */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
            {/* Responsive Table Wrapper */}
            <div className="overflow-x-auto">
                {
                    sliders && (sliders.length > 0) ?
                        
                <table className="min-w-full divide-y divide-gray-200">
                    {/* Table Header: Updated padding and text style (matching ComingSoonPosterTable) */}
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th scope="col" className="w-16 px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Heading & Subtitle</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Content</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-100">
                        {
                            sliders.map((slider, index) => ( 
                        <tr key={slider._id} className="hover:bg-indigo-50/20 transition-colors duration-150">
                            {/* Row Number: Matching ComingSoonPosterTable style */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{index + 1}</td>
                            
                            {/* Heading & Subtitle: Clear hierarchy */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-base font-medium text-gray-900 leading-snug">{slider?.title}</div>
                                <div className="text-sm text-indigo-600 mt-0.5 font-light">{slider?.subtitle}</div>
                            </td>
                            
                            {/* Description: Great for long text, good truncation */}
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-700 max-w-xs truncate" title={slider.description}>
                                   {slider.description}
                                </div>
                            </td>
                            
                            {/* Image: Sleek, high-quality display. Updated size to match ComingSoonPosterTable's W-24 H-16 ratio */}
                            <td className="px-6 py-4">
                                <div className='w-24 h-16 object-cover overflow-hidden rounded-lg border border-gray-200'>
                                    <img 
                                        className="w-full h-full object-cover" 
                                        src={slider?.image} 
                                        alt="Slide preview"
                                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/96x64/E0E7FF/4338CA?text=No+Image" }}
                                    />
                                </div>
                            </td>
                            
                            {/* Status: Professional, high-contrast badges (Matching ComingSoonPosterTable style) */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${slider?.isActive 
                                        ? "bg-green-100 text-green-800" 
                                        : "bg-red-100 text-red-800"
                                    }`}>
                                    {
                                        slider.isActive?"Active":"Inactive"
                                    }
                                </span>
                            </td>

                            {/* Actions: Clean, button-based links (Matching ComingSoonPosterTable style) */}
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-3">
                                <button 
                                    onClick={()=>setIsEditModeMethod(slider)} 
                                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                                >
                                    <i className="fas fa-edit mr-1"></i>Edit
                                </button>
                                <button 
                                    onClick={()=>handleDeleteSlider(slider._id)} 
                                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                                >
                                    <i className="fas fa-trash-alt mr-1"></i>Delete
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