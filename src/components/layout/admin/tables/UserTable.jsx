import React, { useContext } from 'react'
import { generatSerialNumber } from '../../../../utils/generatePageNumber'
import { useDispatch, useSelector } from 'react-redux'
import NotAvailable from '../../../common/NotAvailable'
import { useGetAllUsers, useUpdateUserRole } from '../../../../store/admin/userSlice'
import { MessageContext } from '../../../../context/context'

const UserTable = ({users}) => {
    let serialNumber=generatSerialNumber()
    const {messageContextState,setMessageContextState}=useContext(MessageContext)
    const dispatch=useDispatch()
  async function handlechangeRole(e,id,r){
    const role=e.target.value
    if(role!==r){
        if(role){
         dispatch(useUpdateUserRole({id,role})).then(res=>{
           if(res.payload?.success){
                 
                   dispatch(useGetAllUsers())
                   
                   setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
                 }
                 else{
                  
                   setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
                 }
         })
        }
    }
  }
  return (
    <div>
      {/* Updated Table Container Styling */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
            {/* <!-- Responsive Table Wrapper --> */}
            <div className="overflow-x-auto">
              {
                users && (users.length > 0?
                <table className="min-w-full divide-y divide-gray-200">
                    {/* <!-- Table Header --> */}
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                            <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Current Role</th>
                            <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Update Role</th>
                        </tr>
                    </thead>
                    
                    {/* <!-- Table Body --> */}
                    <tbody className="bg-white divide-y divide-gray-100">
                       
                        
                    {
                        users.map(user=>(

                        <tr key={user._id} className="hover:bg-indigo-50/20 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{serialNumber.next().value}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    
                                    <div className="ml-0">
                                        <div className="text-sm font-medium text-gray-900">{user.firstName}</div>
                                        {/* <div className="text-sm text-gray-500">ID: CAT002</div> */}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                
                                <div className="text-sm text-gray-700">{user.email}</div>
                            </td>
                            {/* Current Role Display */}
                            <td className="px-6 py-4 text-center whitespace-nowrap">
                                <span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                    {user.role}
                                </span>
                            </td>
                            {/* Role Update Select Box */}
                             <td className="px-6 py-4 text-center whitespace-nowrap">
                                
                               <select 
                                   onChange={(e)=>handlechangeRole(e,user._id,user.role)} 
                                   className='
                                       border border-gray-300 rounded-lg shadow-sm 
                                       focus:ring-indigo-500 focus:border-indigo-500 
                                       p-2 text-sm text-gray-700 bg-white
                                       transition-colors duration-150
                                   ' 
                                   name="role-select" 
                                   defaultValue={user.role} // Set the default value to the current user role
                               >
                                <option value="" disabled>Select Role</option>
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                               </select>
                               
                            </td>
                           
                        </tr>
                        ))
                    }
                        
                        
                    </tbody>
                </table>:<NotAvailable/>)
              }
            </div>
        </div>
    </div>
  )
}

export default UserTable
