import { Menu } from 'lucide-react'
import React from 'react'

const Navbar = ({ onMenuClick }) => {
  return (
    <div className='bg-white shadow-xs w-full h-16 px-4 mb-8 lg:mb-0 flex items-center justify-between'>
      <Menu  className='lg:hidden text-gray-700 w-7 h-7' onClick={onMenuClick}/>
    </div>
  )
}

export default Navbar
