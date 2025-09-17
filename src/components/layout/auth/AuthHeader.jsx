import React from 'react'
import Logo from '../../common/Logo'
import { useLocation, useNavigate } from 'react-router-dom'

const AuthHeader = () => {
    const location=useLocation()
    const nav=useNavigate()
  return (
    <>
    <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
                {/* <!-- Left Side: Logo + Brand Name + Tagline --> */}
                <Logo/>
                
                {/* <!-- Right Side: Rounded Login Button --> */}
                <div>
                    {
                    location.pathname=="/auth/login" ?<button onClick={()=>nav("register")} className="bg-black text-white px-6 py-2  font-medium hover:bg-gray-800 focus:outline-none   transition duration-200">
                        Register
                    </button>:<button  onClick={()=>nav("login")} className="bg-black text-white px-6 py-2  font-medium hover:bg-gray-800 focus:outline-none   transition duration-200">
                        Login
                    </button>
                    }
                    {/* <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 focus:outline-none   transition duration-200">
                        Login
                    </button> */}
                </div>
            </div>
        </div>
    </header>
    </>
  )
}

export default AuthHeader