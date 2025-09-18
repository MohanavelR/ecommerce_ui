import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Layouts
import MainLayout from "./layouts/MainLayout";
import ShopLayout from "./layouts/shop/ShopLayout";
import AuthLayout from "./layouts/auth/AuthLayout";
import AdminLayout from "./layouts/admin/AdminLayout";

// Pages
import Home from "./pages/shop/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./components/common/NotFound";
import { useAuth } from "./store/authSlice";
import Message from "./components/common/Message";
import Logout from "./components/common/Logout";
import { LogoutContext, MessageContext } from "./context/context";

import AdminProducts from "./pages/admin/AdminProducts";
import PageLoader from "./components/common/PageLoader";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminComingSoon from "./pages/admin/AdminComingSoon";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminAd_Banner from "./pages/admin/AdminAd_Banner";
import AdminSlider from "./pages/admin/AdminSlider";
import AdminOrders from "./pages/admin/AdminOrders";

const App = () => {
  const {logoutContextState,setLogoutContextState}=useContext(LogoutContext)
  const { isAuthenticated, user,isLoading } = useSelector((state) => state.auth);
  const dispatch= useDispatch()
  useEffect(()=>{
    dispatch(useAuth())
  },[dispatch])
  if(isLoading){
    return <p><PageLoader/></p>
  }
  return (
    <>
    <Message/>
    {
      logoutContextState && 
    <Logout/>
    }
    <Routes>
       <Route
        path="/"
        element={
          <MainLayout isAuthenticated={isAuthenticated} user={user}>
          </MainLayout>
        }
      >
        
      </Route>
      <Route path="/shop" element={<MainLayout isAuthenticated={isAuthenticated} user={user} >
        <ShopLayout/>
      </MainLayout>}>
      <Route path="home" element={<Home/>} />
      </Route>

      {/* Auth routes */}
      <Route
        path="/auth"
        element={
          <MainLayout isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
          </MainLayout>
        }
      >
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Route>


      <Route
        path="/admin/*"
        element={
          <MainLayout isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </MainLayout>
        }
      >
         <Route path="dashboard" element={<AdminDashboard/>} />
         <Route path="products" element={<AdminProducts/>} />
         <Route path="customers" element={<AdminCustomers/>} />
         <Route path="coming-soon" element={<AdminComingSoon/>} />
         <Route path="categories" element={<AdminCategory/>} />
          <Route path="ad-banner" element={<AdminAd_Banner/>} />
          <Route path="orders" element={<AdminOrders/>} />
          <Route path="slider" element={<AdminSlider/>} />
      </Route>
      <Route path="*" element={<NotFound/>} />
    </Routes>
    </>
  );
};

export default App;
