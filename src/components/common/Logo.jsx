import React from 'react'

const Logo = () => {
  return (
    <>
                <div className="flex items-center">
                    {/* <!-- Logo Image --> */}
                    <div className="flex-shrink-0">
                        <img className="h-12 w-12 rounded-full object-cover" src="https://picsum.photos/seed/brandlogo/48/48.jpg" alt="Brand Logo"/>
                    </div>
                    {/* <!-- Brand Name and Tagline --> */}
                    <div className="ml-4">
                        <div className="text-xl font-bold text-gray-900">BrandName</div>
                        <div className="text-sm text-gray-600">Your trusted digital partner</div>
                    </div>
                </div>
    </>
  )
}

export default Logo