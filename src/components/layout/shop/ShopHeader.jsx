import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MediumDeviceHeader from "./header/MediumDeviceHeader";
import MobileViewHeader from "./header/MobileViewHeader";
import { LogoutContext, MessageContext } from "../../../context/context";
import Logo from "../../common/Logo";
import { useSendverifyOTP } from "../../../store/authSlice";

const ShopHeader = () => {
  const { isAuthenticated,user } = useSelector((state) => state.auth);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const { setLogoutContextState } = useContext(LogoutContext);
  const {messageContextState,setMessageContextState}=useContext(MessageContext)
  const dispatch=useDispatch()
  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleLogout = () => {
    setLogoutContextState(true);
   
  };
async function sendOTPforverify(){
   dispatch(useSendverifyOTP({email:user.email})).then(res=>{
               if(res.payload?.success){
                 console.log(res.payload)
                 sessionStorage.setItem("isSubmitted",true)
                 setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:true})
                 navigate("/shop/verify-account")
               }
               else{
                 setMessageContextState({...messageContextState,is_show:true,text:res.payload?.message,success:false})
               }
              })
}
  return (
    <header className="fixed top-0 left-0 w-full z-[999] bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
           <Logo/>
          </div>

          {/* Medium and Large Device Navigation */}
          <MediumDeviceHeader />

          {/* Right-side Icons & Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon */}
            <button className="p-2 text-foreground hover:text-primary transition-colors duration-200" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Wishlist Icon with count */}
            <a href="/wishlist" className="p-2 text-foreground hover:text-primary transition-colors duration-200 relative" aria-label="Wishlist">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none font-bold">3</span>
            </a>

            {/* Cart Icon with count */}
            <a href="/cart" className="p-2 text-foreground hover:text-primary transition-colors duration-200 relative" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H21M7 13-1.6 8M14 21a1 1 0 100-2 1 1 0 000 2zM17 21a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none font-bold">2</span>
            </a>
            {
              isAuthenticated ?
            <div className="relative group">
              <button className="p-2 text-foreground hover:text-primary transition-colors duration-200" aria-label="User menu">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <div className="absolute right-0 mt-4 w-48 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 bg-background border border-border rounded-lg shadow-xl overflow-hidden">
                <div className="py-2">
                  <a href="/profile" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">Profile</a>
                  <a href="/orders" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">My Orders</a>
                  {
                    !user.isVerified &&
                  <button onClick={sendOTPforverify} className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">Verify Account</button>
                  }
                  <hr className="my-2 border-border" />
                  {
                    isAuthenticated ?<button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">Logout</button>:
                    <button onClick={()=>navigate("/auth/login")} className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition-colors duration-200">Login</button>
                  }
                </div>
              </div>
            </div>:<button onClick={()=>navigate("/auth/login")}  className="btn-hero">Login</button>
            }
            {/* User Dropdown Menu */}

            {/* Mobile Menu Toggle */}
            <button onClick={() => setOpenMenu(!openMenu)} className="lg:hidden p-2 text-foreground hover:text-primary transition-colors duration-200" aria-expanded={openMenu} aria-controls="mobile-nav-menu">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile View Header */}
        <MobileViewHeader isOpen={openMenu} toggleMenu={() => setOpenMenu(!openMenu)} />
      </div>
    </header>
  );
};

export default ShopHeader;