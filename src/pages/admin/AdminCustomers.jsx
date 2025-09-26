import React from 'react'
import UserTable from '../../components/layout/admin/tables/UserTable'
import { useSelector } from 'react-redux'
import Loader from '../../components/common/Loader'

const AdminCustomers = () => {
   const {users,isLoading}=useSelector(state=>state.users)
  return (
    <div>
      {
        isLoading?<Loader/>:
        <div>

          <div class="max-w-7xl mx-auto ">
            {/* <!-- Header Section --> */}
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 class="text-3xl font-bold text-gray-900">Manage Users</h1>
                
                {/* <!-- Add Category Button --> */}
                {/* <button  class="admin-add-btn">
                    <i class="fas fa-plus mr-2"></i>
                    Add Category
                </button> */}
            </div>
        </div>
        <UserTable users={users}/>
        </div>
      }
    </div>
  )
}

export default AdminCustomers