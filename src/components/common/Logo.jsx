import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <>
               <Link to="/shop/home" class="flex items-center space-x-2">
                    <div class="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                        <span class="text-white font-bold text-lg">E</span>
                    </div>
                    <div class=" sm:block">
                        <h1 class="text-sm md:text-xl font-bold text-primary">EcoShop</h1>
                        <p class="text-[10px] md:text-xs  text-muted-foreground">Green Shopping Experience</p>
                    </div>
                </Link>
    </>
  )
}

export default Logo