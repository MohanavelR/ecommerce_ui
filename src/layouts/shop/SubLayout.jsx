import React from 'react'
import { Outlet } from 'react-router-dom'
import ShopComingSoonPoster from './ShopComingSoonPoster'
import ShopHeader from '../../components/layout/shop/ShopHeader'
import ShopFooter from '../../components/layout/shop/ShopFooter'

const SubLayout = () => {
  return (
    <>
       <ShopComingSoonPoster/>
      <div className="min-h-screen flex flex-col">
        <ShopHeader />
        <main className="flex-grow py-5 px-2 sm:px-3 lg:px-4">
          <Outlet />
        </main>
        <ShopFooter />
      </div> 
    </>
  )
}

export default SubLayout
