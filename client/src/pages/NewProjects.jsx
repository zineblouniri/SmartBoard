import { ArrowLeft, BadgeCheck, ChevronRightIcon, Folder, Save,Briefcase,
  Rocket,
  Code,
  Globe,
  ChartLine,
  Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import Bulb from '../assets/bulb.svg'
import { useState } from 'react';
import { createProject } from '../api/projectApi';
import ProjectForm from '../components/projectForm';

const NewProjects = () => {
  
  return (
    <div className='lg:px-8 px-4 py-4'>
        
        <div className='flex lg:flex-row flex-col lg:justify-between items-center  justify-center mb-4'>
        <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
          <h1 className='text-2xl font-bold text-gray-800 mb-2'>Create New Project</h1>
          <p className='text-gray-500 text-sm '>Add the details of your new project. You can always change them later.</p>
        </div>
        <NavLink to="/projects" className="bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 py-2 px-4 rounded-lg flex items-center mt-3 lg:mt-0">
          <ArrowLeft className="mr-2 size-4"/> <p className='text-sm'>Back to Projects</p>
        </NavLink>
      </div>
      <div className='flex lg:flex-row flex-col items-start justify-start gap-3'>
       
        <div className='lg:flex-1 bg-gray-50 rounded-lg shadow-xs border border-gray-100 w-full pb-6'>
    <ProjectForm />
  </div>
        <div className='bg-gray-50 rounded-lg shadow-xs border border-gray-100 flex flex-col items-start lg:px-8 px-6 lg:w-1/4  mb-15'>
          <div className='flex items-center gap-1 pt-5 mb-2 '>
            <img src={Bulb} alt="Bulb" className="size-12 "/>
            <p className='text-md font-semibold text-gray-800'>Tips</p>
          </div>
          
            <p className='text-sm text-gray-700'>A good project name is short, clear and describes what you're building.</p>
          
          <hr className='border-gray-200 w-full my-5'/>
          <div className='flex flex-col gap-3 items-start justify-center mb-8'>
            <p className='text-blue-500 font-semibold text-sm'>Examples</p>
            <div className='flex items-center gap-2'>
              <BadgeCheck className="size-4 text-green-500"/>
            <p className='text-sm text-gray-700'>Smartboard Website</p>
            </div>
            <div className='flex items-center gap-2'>
            <BadgeCheck className="size-4 text-green-500"/>
            <p className='text-sm text-gray-700'>Mobile App Redesign</p> 
            </div>
            <div className='flex items-center gap-2'>
            <BadgeCheck className="size-4 text-green-500 "/>
            <p className='text-sm text-gray-700'>Marketing Campaign Q3</p>
            </div>
            <div className='flex items-center gap-2'>
            <BadgeCheck className="size-4 text-green-500"/>
            <p className='text-sm text-gray-700'>AI Task Assistant</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProjects
