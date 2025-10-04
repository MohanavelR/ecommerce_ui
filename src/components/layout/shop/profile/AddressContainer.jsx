import React, { useContext, useState } from 'react'

import {useDispatch, useSelector} from 'react-redux'
import Loader from '../../../common/Loader'
import AddressCard from './AddressCard'
import { deepcopyObj } from '../../../../utils/deepCopyObj'
import { addressFormData } from '../../../../utils/formDataObj'
import { addressError } from '../../../../utils/errorObj'
import { MessageContext } from '../../../../context/context'
import AddressForm from '../forms/AddressForm'
import { useCreateAddress, useUpdateAddress } from '../../../../store/address'
const AddressContainer = ({isSeletedMode,setIdOfAddress}) => {
  const dispatch=useDispatch()
  const {addressList,isLoading}=useSelector(state=>state.address)
  const [formData,setFormData]=useState(deepcopyObj(addressFormData))
  const [fieldErrors,setFieldErrors]=useState(deepcopyObj(addressError))
  const [isEditMode,setIsEditMode]=useState(false)
  const [addressId,setAddressId]=useState(null)
  const [openAddressForm,setOpenAddressForm]=useState(false)
   const {messageContextState,setMessageContextState}=useContext(MessageContext)

    function openAddressFormMethod(){
      setOpenAddressForm(true)
    }
    function closeAddressFormMethod(){
      setOpenAddressForm(false)
      setFormData(deepcopyObj(addressFormData))
      setAddressId(null)    
      setIsEditMode(false)
    }
  
  
    function setEditModeMethod(data,id){
      setFormData(data)
      openAddressFormMethod()
      setAddressId(data._id)    
      setIsEditMode(true)
    }
  
  async function handleAddressSubmit(){
      let newErrors =deepcopyObj(addressError); // Deep clone
      let hasError = false;
      const requiredFields = ['title', 'address', 'city', 'pincode', 'phone'];
      requiredFields.forEach(field => {
        if (formData[field].trim() === '') {
          newErrors[field].isRequired = true;
        hasError = true;
        }
      });
      const pincodeRegex = /^\d{6}$/;
      if (formData.pincode.trim() !== '' && !pincodeRegex.test(formData.pincode)) {
          newErrors.pincode.invalidFormat = true;
         hasError = false;
      }
      const phoneRegex = /^\d{10}$/;
      if (formData.phone.trim() !== '' && !phoneRegex.test(formData.phone)) {
          newErrors.phone.invalidFormat = true;
         hasError = false;
      }
      setFieldErrors(deepcopyObj(newErrors));
      if(!hasError){
        dispatch(isEditMode?useUpdateAddress({id:addressId,data:formData}):useCreateAddress({...formData,userId:user.id})).then(res=>{
          if(res.payload?.success){
            setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
            closeAddressFormMethod()
            dispatch(useGetAddressesByUser(user.id))
          }
          else{
            setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
          }
        })
      }
  }
  
  return (
    <div>
        <div>  
            {
          openAddressForm &&
       <AddressForm formData={formData} handleAddressSubmit={handleAddressSubmit} fieldErrors={fieldErrors} setFieldErrors={setFieldErrors} setFormData={setFormData} closeAddressFormMethod={closeAddressFormMethod} />
        } 
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
                      setIdOfAddress={setIdOfAddress}
                     isselectedMode={isSeletedMode}
                      
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