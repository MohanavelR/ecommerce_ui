import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllSliders } from "../../store/admin/sliderSlice";
import { useGetAllCategory } from "../../store/categorySlice";
import { useGetAllBanners } from "../../store/admin/adbanner";
import { useGetAllComingSoon } from "../../store/admin/comingsoonSlice";
import { useGetAllProducts } from "../../store/productSlice";


const ShopLayout = () => {
  //  const {sliders}=useSelector()
  const dispatch=useDispatch()
  
  // This hook runs once to fetch initial data for the entire shop section
  useEffect(()=>{
    dispatch(useGetAllSliders())
    dispatch(useGetAllCategory())
    dispatch(useGetAllBanners())
    dispatch(useGetAllComingSoon())
    dispatch(useGetAllProducts())
  },[dispatch])
  
  return (
    // ShopLayout acts as the container/wrapper. 
    // The <Outlet/> renders the next nested component, which is SubLayout, 
    // as defined in the router structure in src/App.jsx.
    <>
        <Outlet/>
    </>
  );
};

export default ShopLayout;
