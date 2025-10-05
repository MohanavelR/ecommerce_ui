import React, { useContext } from 'react';
import { MessageContext } from '../../../../context/context';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteAddress, useGetAddressesByUser } from '../../../../store/address';

// Define the expected shape of the address prop (optional but good for context)
// const AddressShape = {
//   title: "Home",
//   address: "123 Main St, Apt 4B",
//   city: "Springfield",
//   pincode: "627045",
//   phone: "9876543210",
// };

const AddressCard = ({ 
  address, 
  onEdit, 
  isselectedMode = null,
  setIdOfAddress=null
}) => {
   const {messageContextState,setMessageContextState} = useContext(MessageContext)
   const dispatch = useDispatch()
   const {user} = useSelector(state => state.auth)
   
   async function handleDeleteAddress (id){
    if(confirm("Are you Delete Address?")){
      dispatch(useDeleteAddress(id)).then(res=>{
              if(res.payload?.success){
                setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
                dispatch(useGetAddressesByUser(user.id))
              }
              else{
                setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
              }
       })
    }
   }

  return (
    // Updated Card Container Design: Softer look, subtle hover and border accent
    <div className={`p-5 bg-white rounded-lg shadow-md transition duration-200 ease-in-out hover:shadow-lg border border-gray-200 hover:border-indigo-400`}>
      
      {/* Header and Title */}
      {/* Clean separator, items aligned centrally */}
      <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
        {/* Title Design: Bolder text, primary color accent */}
        <h3 className="text-lg font-extrabold text-indigo-700 flex items-center">
          {address.title || "Untitled Address"}
          {/* Default Badge (Uncomment if needed) */}
          {/* {isDefault && (
            <span className="ml-3 px-3 py-1 text-xs font-semibold tracking-wider text-white bg-indigo-500 rounded-full">
              DEFAULT
            </span>
          )} */}
        </h3>

        {/* Action Button Group or Selection Radio Button */}
        
        <div className="flex space-x-1 text-sm items-center">
          <button 
            onClick={() => onEdit(address, address._id)} 
            // Edit Button Design: Hover effect with background fill
            className="text-sm text-indigo-600 hover:text-white hover:bg-indigo-600 transition px-2 py-1 rounded-md font-semibold flex items-center"
            title="Edit Address"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>
          </button>
          {/* Separator: Less prominent */}
          <span className="text-gray-400 mx-1">|</span>
          <button 
            onClick={() => handleDeleteAddress(address._id)} 
            // Delete Button Design: Hover effect with background fill
            className="text-sm text-red-500 hover:text-white hover:bg-red-600 transition px-2 py-1 rounded-md font-semibold flex items-center"
            title="Delete Address"
          >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
          </button>
        </div>
        {
          isselectedMode && 
        <div className="flex items-center">
          {/* Radio Button for single-select mode */}
          <input 
            type="radio"
            onChange={()=>setIdOfAddress(address._id)} 
            name="selected_address" // Crucial for grouping radio buttons
            className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500" 
          />
        </div>
        } 
        

      </div>

      {/* Address Details */}
      {/* Details Section: Slightly darker text, increased vertical spacing */}
      <div className="space-y-2 text-gray-700 mt-4">
        {/* Detail Line Text: Slightly smaller font, medium weight */}
        <p className="text-sm font-medium">{address.address}</p>
        <p className="text-sm font-medium">{`${address.city}, ${address.pincode}.`}</p>
        <p className="text-sm font-medium">
          {/* Phone Label: Accent color */}
          <span className="font-bold text-indigo-500 mr-1">Phone:</span>{address.phone}
        </p>
      </div>

    </div>
  );
};

export default AddressCard;