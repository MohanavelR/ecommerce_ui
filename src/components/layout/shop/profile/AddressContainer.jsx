import React from 'react'

import {useSelector} from 'react-redux'
import Loader from '../../../common/Loader'
import AddressCard from './AddressCard'
const AddressContainer = ({openAddressFormMethod,setEditModeMethod,setAddressId}) => {
    const {addressList,isLoading}=useSelector(state=>state.address)
  return (
    <div>
        <div>   
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Delivery Addresses <span className='text-gray-500 text-sm'>(Maximum 3 allowed)</span> </h2>
                    <button 
                        onClick={openAddressFormMethod}
                        disabled={addressList.length >=3}
                        className="bg-indigo-600 disabled:bg-blue-400 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-150"
                    >
                        + Add New Address
                    </button>
                </div>
                {
                  isLoading ?<Loader/>:
                  addressList && addressList.length > 0?
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {addressList.map(address => (
                    <AddressCard 
                      key={address.id} 
                      address={address}
                      onEdit={setEditModeMethod}
                      setAddressId={setAddressId}
                    //   onDelete={handleDeleteAddress}
                      
                    />
                  ))}
                </div>:<div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md text-gray-500">
        No address data available.
      </div>
                }
        
               
        
                
                {/* {addresses.length === 0 && (
                    <div className="text-center py-10 border rounded-lg bg-gray-100">
                        <p className="text-lg text-gray-500">You have no saved addresses.</p>
                    </div>
                )} */}
              </div>
    </div>
  )
}

export default AddressContainer