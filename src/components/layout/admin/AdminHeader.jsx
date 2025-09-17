import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../common/Logo'



 const AdminHeader = ({sidebarOpen,setSidebarOpen}) => {
  return (
       <>
      <header className="bg-white   shadow-sm border-b border-gray-200">
        <div className="flex justify-between items-center px-6 py-4">
          <div className='md:hidden block'>
           <Logo/>
          </div>
          <div className="lg:flex hidden  items-center">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to='dashboard' className="text-gray-700 hover:text-indigo-600">
                    <i className="fas fa-home"></i>
                  </Link>
                </li>
              </ol>
            </nav>
          </div>         
          <div className="flex items-center space-x-4">
            <div className="">
              <button  onClick={()=>setSidebarOpen(!sidebarOpen)} className='transform lg:hidden hover-duration hover:scale-120 top-2 hover:text-black cursor-pointer  text-amber-950'>
              <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
          </button></div>
          </div>
        </div>
      </header>
      
    </>
  )
}
export default AdminHeader