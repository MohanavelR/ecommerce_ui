import React from 'react'
import AuthHeader from '../../components/layout/auth/AuthHeader'
import { Outlet } from 'react-router-dom'
import Logout from '../../components/common/Logout'

const AuthLayout = () => {
  return (
    <>
    <AuthHeader/>
    <div>
     <Outlet/>
    </div> 
    </>
  )
}

export default AuthLayout
