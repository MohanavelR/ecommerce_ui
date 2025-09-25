import React from 'react'
import AuthHeader from '../../components/layout/auth/AuthHeader'
import { Outlet } from 'react-router-dom'
import Logout from '../../components/common/Logout'

const AuthLayout = () => {
  return (
    <>
       <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/10 flex flex-col">
         {/* Auth Header */}
         <AuthHeader/>
   
         {/* Main Content */}
         <main className="flex-1 flex items-center justify-center p-4">
           <div className="w-full max-w-md">
             <Outlet />
           </div>
         </main>
   
         {/* Footer */}
         <footer className="bg-background/95 backdrop-blur-md border-t border-border p-4">
           <div className="text-center text-sm text-muted-foreground">
             © 2024 EcoShop. All rights reserved.
           </div>
         </footer>
       </div> 
    </>
  )
}

export default AuthLayout
