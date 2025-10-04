import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllSliders } from "../../store/admin/sliderSlice";
import { useGetAllCategory } from "../../store/categorySlice";
import { useGetAllBanners } from "../../store/admin/adbanner";
import { useGetAllComingSoon } from "../../store/admin/comingsoonSlice";
import { useGetAllProducts } from "../../store/productSlice";
import { useGetFilterProducts } from "../../store/shop";
// import { useGetCart } from "../../store/cart";


const ShopLayout = () => {

  const dispatch=useDispatch()
  // This hook runs once to fetch initial data for the entire shop section
  useEffect(()=>{
    dispatch(useGetAllSliders())
    dispatch(useGetAllCategory())
    dispatch(useGetAllBanners())
    dispatch(useGetAllComingSoon())
    dispatch(useGetAllProducts())
    dispatch(useGetFilterProducts({}))
  },[dispatch])
  
  return (
    <>
        <Outlet/>
    </>
  );
};

export default ShopLayout;
