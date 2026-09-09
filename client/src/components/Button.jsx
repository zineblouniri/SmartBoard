import React from 'react'

const Button = ({className='',children,...props}) => {
  return (
    <div>
        <button className={`rounded-lg py-2 px-3 text-white  ${className}`} {...props}>
            {children}
        </button>
    </div>
  )
}

export default Button
