import { ChevronDownIcon, ChevronRightIcon, Menu, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../api/authApi'
import Breadcrumb from './Breadcrumb'

const Navbar = ({ projectName,taskTitle,onMenuClick }) => {
const [user, setUser] = useState(null)
   useEffect(() => {
      const getUser = async () => {
        try {
          const res = await getCurrentUser()
          setUser(res.user)
          console.log(res.user)
        } catch (error) {
          console.error(error);
        }
      };
      getUser()
    },[])
 const [openMenu, setOpenMenu] = useState(false)
 const navigate = useNavigate()

  return (
    <div className='bg-white shadow-xs w-full h-15 lg:px-4 px-2  flex items-center justify-between'>
      <Menu  className='lg:hidden text-gray-700 w-7 h-7' onClick={onMenuClick}/>
      
        <Breadcrumb project={projectName} task={taskTitle}/>
        
        <div className='flex items-center gap-4 lg:justify-center  '>
          <div>
          <Search className='text-gray-600 size-5'/>
        </div>
          <button onClick={() => setOpenMenu(prev => ! prev)} className='rounded-full py-1 px-3 bg-indigo-400 text-white text-center '>
{user && user.name.charAt(0).toUpperCase()}
          </button>
<button onClick={() => setOpenMenu(prev => ! prev)} className=' hidden lg:flex  lg:items-center lg:justify-center lg:gap-2'>
  <span className='text-sm font-semibold'>{user && user.name.charAt(0).toUpperCase() + user.name.slice(1)}</span>
 <ChevronDownIcon size={16} className='text-gray-500'/>
  </button>   
  {openMenu && (
          <div className="absolute top-10 right-2 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className='flex flex-col items-center'>
           <button onClick={() => {navigate('/profile');setOpenMenu(prev => !prev)}} className="py-2.5 px-4  flex items-center hover:bg-gray-100 w-full">
          <span className='text-sm font-semibold'>Profile</span>
          </button>
            <button onClick={() => {navigate('/settings');setOpenMenu(prev => !prev)}} className="py-2.5 px-4  flex items-center hover:bg-gray-100 w-full">
         <span className='text-sm font-semibold'>Settings</span>
          
          </button>
          <button onClick={() => {navigate('/login');setOpenMenu(prev => !prev)}} className="py-2.5 px-4  flex items-center hover:bg-gray-100 w-full">
           
          <span className='text-sm font-semibold'>Logout</span></button>
          
          </div>
          </div>
        )}   
  
  </div>
    </div>
  )
}

export default Navbar
