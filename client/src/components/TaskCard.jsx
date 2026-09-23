import React from 'react'
import TaskComponent from './TaskComponent'
import { NavLink } from 'react-router-dom'
import { Plus } from 'lucide-react'

const TaskCard = () => {
  return (
    <div className='bg-indigo-50 rounded-lg w-full p-3'>
      <div className='flex gap-2 items-center mb-4 '>
        <p className='font-semibold text-sm text-gray-700'>To Do</p>
        <p className='bg-indigo-100 rounded-full py-0.5 px-2.5 text-indigo-500 text-xs font-semibold'>8</p>
      </div>
      <div className="flex flex-col gap-2">
        <TaskComponent />
        <TaskComponent />
        <TaskComponent />
      </div>
      <div>
        <NavLink
          to="/tasks/new"
          className="  text-blue-500 w-full rounded-lg flex items-center justify-center p-3 mt-2  border border-gray-200"
        >
          <Plus className="mr-2 size-3" />
          <span className="text-xs font-bold">Add Task</span>
        </NavLink>
      </div>
    </div>
  )
}

export default TaskCard
