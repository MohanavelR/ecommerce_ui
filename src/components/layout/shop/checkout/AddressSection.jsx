import React from 'react'
import { useSelector } from 'react-redux'
import AddressCard from '../profile/AddressCard'
import Loader from '../../../common/Loader'

const AddressSection = () => {
    const {isLoading,addressList}=useSelector(state=>state.address)

  if(isLoading){
    return <Loader/>
  }
    return (
    <div>
         <section className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-3">1. Select Shipping Address</h2>
                        {
                            (addressList && addressList.length > 0)?
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                 {
                                    addressList.map(address=>(

                                        <AddressCard address={address} isselectedMode={true} />
                                    ))
                                 }
                        </div>:"Not Avaliable"
                        }
                    </section>
    </div>
  )
}

export default AddressSection