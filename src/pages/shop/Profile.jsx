import React, { useContext, useEffect, useState } from 'react';
import AddressForm from '../../components/layout/shop/forms/AddressForm';
import { deepcopyObj } from '../../utils/deepCopyObj';
import { addressFormData } from '../../utils/formDataObj';
import { addressError } from '../../utils/errorObj';
import AddressContainer from '../../components/layout/shop/profile/AddressContainer';
import UserConatiner from '../../components/layout/shop/profile/UserConatiner';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateAddress, useGetAddressesByUser, useUpdateAddress } from '../../store/address';
import { MessageContext } from '../../context/context';

const MAX_ADDRESS = 3; 
const UserProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('addresses'); 
 
  // State to manage the view toggle for addresses
  
  const {user}=useSelector(state=>state.auth)

  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(useGetAddressesByUser(user.id))
  },[])

  return (
    <>
  
    <div className="bg-gray-50 min-h-screen py-5">
      <div className="mx-auto px-3 sm:px-4 lg:px-5">
        
        <h1 className="text-4xl font-extrabold border-accent text-gray-900 mb-4 border-b pb-4">
          My Profile
        </h1>

        {/* Horizontal Tab Navigation */}
        <div className="border-b border-gray-200  mb-8">
          <nav className="-mb-px flex space-x-8">
            {['addresses', 'details'].map((tabId) => (
              <button
                key={tabId}
                onClick={() => setActiveTab(tabId)}
                className={`
                  ${activeTab === tabId
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition duration-150
                `}
              >
                {tabId === 'addresses' ? 
                'My Addresses'
                :
                'User Details' 
                 }
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'details' && <UserConatiner />}
          {activeTab === 'addresses' && <AddressContainer/>}
        </div>
      </div>
    </div>
    </>
  );
};

export default UserProfileTabs;