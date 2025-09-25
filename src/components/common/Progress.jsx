import React from 'react'

const Progress = ({width}) => {
  return (
    <>
    <div class="w-full bg-gray-200 rounded-full h-4">
  <div class="bg-blue-600 h-4 rounded-full flex items-center justify-center text-xs text-white font-bold" style={{width:`${width}%`}}>
   {width}%
  </div>
</div>
    </>
  )
}

export default Progress