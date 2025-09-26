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
      <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            {/* <!-- Responsive Table Wrapper --> */}
            <div class="overflow-x-auto">
              {
                users && (users.length > 0?
                <table class="min-w-full divide-y divide-gray-200">
                    {/* <!-- Table Header --> */}
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    
                    {/* <!-- Table Body --> */}
                    <tbody class="bg-white divide-y divide-gray-200">
                       
                        
                    {
                        users.map(user=>(

                        <tr class="hover:bg-gray-50 transition-colors duration-150">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{serialNumber.next().value}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">{user.firstName}</div>
                                        {/* <div class="text-sm text-gray-500">ID: CAT002</div> */}
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                
                                <div class="text-sm text-gray-500">{user.email}</div>
                            </td>
                                <td class="px-6 py-4 text-center whitespace-nowrap">
                           
                                <div class="text-sm text-gray-500">{user.role}</div>
                            </td>
                             <td class="px-6 py-4 text-center whitespace-nowrap">
                                
                               <select onChange={(e)=>handlechangeRole(e,user._id,user.role)} className='border-accent border ms-2 p-2 outline-none' name="" id="">
                                <option className='border-accent border ' value="">Select Role</option>
                                <option className='border-accent border ' value="user">user</option>
                                <option className='border-accent border ' value="admin">admin</option>
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
