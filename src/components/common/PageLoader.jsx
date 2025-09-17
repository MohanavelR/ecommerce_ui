import React from 'react'

const PageLoader = () => {
  return (
    <div className='w-full min-h-screen items-center flex p-2 justify-center'>
       <div className='w-20 h-20  border-4 animate-spin duration-150 border-l-blue-700 border-y-gray-200 border-r-blue-700 rounded-full'>
       </div>
    </div>
  )
}

export default PageLoader
