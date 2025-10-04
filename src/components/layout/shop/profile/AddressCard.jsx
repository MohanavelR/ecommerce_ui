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
            Edit
          </button>
          {/* Separator: Less prominent */}
          <span className="text-gray-400 mx-1">|</span>
          <button 
            onClick={() => handleDeleteAddress(address._id)} 
            // Delete Button Design: Hover effect with background fill
            className="text-sm text-red-500 hover:text-white hover:bg-red-600 transition px-2 py-1 rounded-md font-semibold flex items-center"
            title="Delete Address"
          >
            Delete
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