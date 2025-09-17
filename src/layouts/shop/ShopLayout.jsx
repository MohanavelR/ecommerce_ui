
import { Outlet } from 'react-router-dom'
import ShopHeader from '../../components/layout/shop/ShopHeader'

const ShopLayout = () => {
  return (
    <>
    <ShopHeader/>
      <Outlet/>
    </>
  )
}

export default ShopLayout