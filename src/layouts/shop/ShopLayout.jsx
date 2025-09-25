
import { Outlet } from 'react-router-dom'
import ShopHeader from '../../components/layout/shop/ShopHeader'

const ShopLayout = () => {
  return (
    <>
    <ShopHeader/>
    <div className='z-[500]'> 
      <Outlet/>
    </div>
    </>
  )
}

export default ShopLayout