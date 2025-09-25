import React from 'react'
import Logo from '../../common/Logo'
import { useLocation, useNavigate,Link } from 'react-router-dom'

const AuthHeader = () => {
    const location=useLocation()
    const nav=useNavigate()
  return (
    <>
<header className="bg-background/95 backdrop-blur-md border-b border-border">
           <div className="container mx-auto px-4">
             <div className="flex items-center justify-between h-16">
               {/* Logo & Brand */}
               <Logo/>
   
               {/* Signup Button */}
               {
                location.pathname==='/auth/register' ?  <Link 
                 to="/auth/login" 
                 className="btn-hero text-sm px-6 py-2"
               >
                 Sign In
               </Link>: <Link 
                to="/auth/register" 
                 className="btn-hero text-sm px-6 py-2"
               >
Sign Up
                </Link>
               }
               {/* <Link 
                 to="/auth/register" 
                 className="btn-hero text-sm px-6 py-2"
               >
                 
               </Link> */}
             </div>
           </div>
         </header>
    </>
  )
}

export default AuthHeader