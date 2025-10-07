import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <>
               <Link to="/shop/home" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">E</span>
                    </div>
                    <div className=" sm:block">
                        <h1 className="text-sm md:text-xl font-bold text-primary">EcoShop</h1>
                        <p className="text-[10px] md:text-xs  text-muted-foreground">Green Shopping Experience</p>
                    </div>
                </Link>
    </>
  )
}

export default Logo