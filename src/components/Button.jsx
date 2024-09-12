import React from 'react'

function Button({
    children,
    textColor = "text-blue-200",
    bgColor = "bgcolor-green-100",
    borderColor = "",
    className='',
    ...props
}) {
  return (
    <button className={`px-6 py-2 rounded-lg ${className} ${bgColor} ${textColor} `} {...props}   >{children }</button>
  )
}

export default Button