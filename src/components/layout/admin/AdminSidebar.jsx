import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../common/Logo';
import { LogoutContext, MessageContext } from '../../../context/context';

const AdminSidebar = ({sidebarOpen,setSidebarOpen}) => {
  const {logoutContextState,setLogoutContextState} =useContext(LogoutContext)
  const navigate=useNavigate()
return (
  <>
     <div onClick={()=>setSidebarOpen(!sidebarOpen)}  className={`h-screen ${sidebarOpen?"block":"hidden"}  lg:hidden  w-screen  fixed top-0 left-0 bg-black/50`}>
      </div>    
    <div className={`w-78 z-[500] lg:-translate-x-0 hover-duration ${sidebarOpen?"-translate-x-0":"-translate-x-full"} fixed  transform lg:relative  bg-white shadow-lg lg:flex flex-col h-full border-r border-gray-200`}>
      <div onClick={()=>setSidebarOpen(!sidebarOpen)} className='absolute  block lg:hidden transform hover-duration hover:scale-120 top-2 hover:text-black cursor-pointer  text-amber-950 right-3'>
         <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
      </div>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <Logo/>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
  
          <li>
            <button onClick={()=>{
              navigate('/admin/dashboard')
              setSidebarOpen(false)
            }}  className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200">
                <i className="fas fa-chart-line text-indigo-600"></i>
              </div>
              <span className="font-medium">Dashboard</span>
            </button>
          </li>
          
       
          <li>
            <button onClick={()=>{
              navigate('/admin/products')
              setSidebarOpen(false)
            }}  className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200">
                <i className="fas fa-box text-indigo-600"></i>
              </div>
              <span className="font-medium">Products</span>
            </button>
          </li>
          
         
          <li>
            <button onClick={()=>{
              navigate('/admin/orders')
              setSidebarOpen(false)
            }} className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200">
                <i className="fas fa-shopping-cart text-indigo-600"></i>
              </div>
              <span className="font-medium">Orders</span>
            </button>
          </li>
          
          
          <li>
            <button onClick={()=>{
              navigate('/admin/customers')
              setSidebarOpen(false)
            }}   className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200">
                <i className="fas fa-users text-indigo-600"></i>
              </div>
              <span className="font-medium">Customers</span>
            </button>
          </li>
          
         
          <li>
            <button onClick={()=>{
              navigate('/admin/categories')
              setSidebarOpen(false)
            }}   className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200">
                <i className="fas fa-tags text-indigo-600"></i>
              </div>
              <span className="font-medium">Categories</span>
            </button>
          </li>
          
       
          <li>
            <button onClick={()=>{
              navigate('/admin/ad-banner')
              setSidebarOpen(false)
            }}  className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200">
                <i className="fas fa-chart-bar text-indigo-600"></i>
              </div>
              <span className="font-medium">Ad/Banners</span>
            </button>
          </li>
          
   
          <li>
            <button onClick={()=>{
              navigate('/admin/coming-soon')
              setSidebarOpen(false)
            }}  className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200">
                <i className="fas fa-bullhorn text-indigo-600"></i>
              </div>
              <span className="font-medium">Coming soon </span>
            </button>
          </li>
          <li>
            <button onClick={()=>{
              navigate('/admin/slider')
              setSidebarOpen(false)
            }}  className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200">
                <i className="fas fa-bullhorn text-indigo-600"></i>
              </div>
              <span className="font-medium">Slider</span>
            </button>
          </li>
          
 
          <li>
            <a href="#" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 group">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200">
                <i className="fas fa-cog text-indigo-600"></i>
              </div>
              <span className="font-medium">Settings</span>
            </a>
          </li> 
        </ul>
      </nav>
      
   
      <div className="p-4 border-t border-gray-200">
        <div className="flex w-full">
          <button onClick={()=>setLogoutContextState(true)} className='flex text-red-500 font-medium' href="">
            <svg xmlns="http://www.w3.org/2000/svg" className='fill-red-700' height="24px" viewBox="0 -960 960 960" width="24px" fill=""><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg><span>Logout</span></button>
        </div>
      </div>
    </div>
  </>

  );
};

export default AdminSidebar;
