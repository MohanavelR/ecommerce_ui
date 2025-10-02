import React from 'react'

const HeadingHome = ({heading,primaryText="Our" }) => {
  return (
    <div class="flex items-center justify-center space-x-2 py-4">
    <div class="flex-grow border-t border-gray-400 max-w-5 md:max-w-20"></div>
    <div className="text-4xl font-semibold text-gray-700 whitespace-nowrap">
        <span class='font-light italic text-primary'>{primaryText}</span> {heading}
    </div>  
    <div className="flex-grow border-t border-gray-400 max-w-5 md:max-w-20"></div>
</div>  
  )
}

export default HeadingHome
