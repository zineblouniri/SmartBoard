import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button.jsx'

const ProjectCard = ({project}) => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col justify-between h-64 bg-gray-100 border-2 border-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 '>
      
        <div className='flex  flex-col gap-4 items-center text-center'>
          <h2 className='text-xl font-semibold text-gray-800 mb-2'>{project.name}</h2>
        <p>{project.description}</p>
        <p>Created at: {new Date(project.created_at).toLocaleString()}</p>
        </div>
        <div className='flex justify-center gap-2 mt-4'>
            <Button className='bg-blue-500 px-4 py-1  hover:bg-blue-600 text-white' onClick={() => navigate(`/projects/${project.id}`)}>
          Open
        </Button>
        <Button className='bg-orange-500 px-4 py-1  hover:bg-orange-600 text-white'>Edit</Button>
       <Button className='bg-red-500 px-4 py-1  hover:bg-red-600 text-white'>Delete</Button>
        
      </div>
      
      
    </div>
  )
}

export default ProjectCard
