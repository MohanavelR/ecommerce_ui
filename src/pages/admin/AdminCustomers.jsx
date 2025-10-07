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

          <div className="max-w-7xl mx-auto ">
            {/* <!-- Header Section --> */}
            <div className="admin-header-box">
                <h1 className="admin-heading">Manage Users</h1>
                
                {/* <!-- Add Category Button --> */}
                {/* <button  className="admin-add-btn">
                    <i className="fas fa-plus mr-2"></i>
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