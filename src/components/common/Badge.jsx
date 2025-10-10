import React from 'react'

const Badge = ({text="New",className}) => {
  return (

        <span className={`absolute ${className}   px-2 font-bold bg-primary rounded-4xl text-accent text-[9px]`}>{text}</span>
  )
}

export default Badge
