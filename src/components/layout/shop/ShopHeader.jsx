import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MediumDeviceHeader from "./header/MediumDeviceHeader";
import MobileViewHeader from "./header/MobileViewHeader";
import { LogoutContext, MessageContext } from "../../../context/context";
import Logo from "../../common/Logo";
import { useSendverifyOTP } from "../../../store/authSlice";
import Loader from "../../common/Loader"
import { useGetCart } from "../../../store/cart";

const ShopHeader = () => {
  // Destructure state values
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  // State for mobile menu
  const [openMenu, setOpenMenu] = useState(false);
  
  // State for user dropdown (renamed for clarity, using boolean)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  
  const navigate = useNavigate();
  const { setLogoutContextState } = useContext(LogoutContext);
  const {count,isLoading}=useSelector(state=>state.cart)
  const { messageContextState, setMessageContextState } = useContext(MessageContext);
  const dispatch = useDispatch();

  // Unified function to toggle dropdown
  const toggleUserDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };
  useEffect(()=>{
  if(isAuthenticated){
  dispatch(useGetCart(user.id))
  }
  },[isAuthenticated])
  // Close menu and dropdown when navigating
  const handleNavigation = (path) => {
    navigate(path);
    setOpenMenu(false);
    setIsDropdownOpen(false);
  }

  const handleLogout = () => {
    setLogoutContextState(true);
    setIsDropdownOpen(false); // Close dropdown on logout attempt
  };

function navPath(path){
 navigate(path)
  setOpenMenu(false)
}

  async function sendOTPforverify(){
    setIsDropdownOpen(false); // Close dropdown before action
    dispatch(useSendverifyOTP({email: user?.email})).then(res => {
      if(res.payload?.success){
        sessionStorage.setItem("isSubmitted", true);
        setMessageContextState({...messageContextState, is_show: true, text: res.payload?.message, success: true});
        navigate("/shop/verify-account");
      } else {
        setMessageContextState({...messageContextState, is_show: true, text: res.payload?.message, success: false});
      }
    });
  }

  return (
    // Updated header styling for a cleaner look and stronger shadow
    <header className="sticky top-0 left-0 z-[999] bg-white shadow-lg backdrop-blur-sm transition-all duration-300 border-b border-gray-100">
      <div className="container min-w-screen px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
           <Logo onClick={() => handleNavigation('/')} />
          </div>

          {/* Medium and Large Device Navigation */}
          <MediumDeviceHeader />

          {/* Right-side Icons & Menu */}
          <div className="flex  items-center space-x-2 sm:space-x-4">
            
            {/* Search Icon */}
            <button onClick={()=>handleNavigation("/shop/search")} className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Wishlist Icon with count */}
            {/* <a href="/wishlist" className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 relative" aria-label="Wishlist">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
             
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center leading-none transform translate-x-1/4 -translate-y-1/4">3</span>
            </a> */}
             {/* Cart Icon with count */}
            {
              isAuthenticated &&
            <button  onClick={()=>handleNavigation("/shop/cart")} className="p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 relative" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H21M7 13-1.6 8M14 21a1 1 0 100-2 1 1 0 000 2zM17 21a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              {/* Refined badge styling */}
              <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center leading-none transform translate-x-1/4 -translate-y-1/4">{isLoading?<Loader/> :count }</span>
            </button>
            }
           
            
            {/* --- User/Auth Section --- */}
            {isAuthenticated ? (
              <div className="relative group: ">
                {/* User Dropdown Trigger (Avatar/Initial) */}
                <button 
                  onClick={toggleUserDropdown} 
                  className={`flex items-center justify-center w-5 h-5 md:w-8 md:h-8 text-white bg-indigo-600 rounded-full font-bold text-sm ring-2 ring-transparent transition-all duration-200 ${isDropdownOpen ? 'ring-indigo-300 shadow-md' : 'hover:ring-indigo-300'}`}
                  aria-label="User menu"
                  aria-expanded={isDropdownOpen}
                >
                  {/* Display first initial or a generic icon */}
                  {user?.username ? user.username.charAt(0).toUpperCase() : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  )}
                </button>
                
                {/* User Dropdown Menu */}
                {isDropdownOpen && (
                  // Position and transition controlled by isDropdownOpen state
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate-fade-in-down origin-top-right">
                    <div className="p-4 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user?.firstName + user?.lastName || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    
                    <div className="py-1">
                      <button onClick={() => handleNavigation("/shop/profile")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200">
                          <i className="fas fa-user-circle w-4 mr-2"></i> Profile
                      </button>
                      <button onClick={() => handleNavigation("/shop/orders")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200">
                          <i className="fas fa-box w-4 mr-2"></i> My Orders
                      </button>
                      
                      {/* Verify Account Link */}
                      {!user.isVerified && (
                        <button onClick={sendOTPforverify} className="block w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200">
                            <i className="fas fa-bell w-4 mr-2"></i> Verify Account
                        </button>
                      )}
                      
                      <hr className="my-1 border-gray-100" />
                      
                      {/* Logout Button */}
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors duration-200">
                          <i className="fas fa-sign-out-alt w-4 mr-2"></i> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Login Button for unauthenticated users
              <button 
                onClick={() => navigate("/auth/login")}  
                className="btn-hero">
                  Login
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button onClick={() => setOpenMenu(!openMenu)} className="lg:hidden p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200" aria-expanded={openMenu} aria-controls="mobile-nav-menu">
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile View Header */}
        <MobileViewHeader setOpenMenu={setOpenMenu} isOpen={openMenu} toggleMenu={() => setOpenMenu(!openMenu)} />
      </div>
    </header>
  );
};

export default ShopHeader;