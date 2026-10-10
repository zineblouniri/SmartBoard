import { Calendar, EllipsisVertical, Square,CheckSquare2 } from 'lucide-react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const TaskComponent = ({task, onStatusChange, onDelete,changeStatus}) => {
  const isDone  = task.status === "done";
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className='relative border border-gray-200 rounded-lg bg-white w-full min-h-16 p-2.5 flex items-center'>
      <button 
      type='button'
      onClick={() => onStatusChange(task)}
      className='mr-4 mb-4 hover:cursor-pointer'
        aria-label={isDone ? "Mark task as incomplete" : "Mark task as complete"}>
        {isDone ? (
          <CheckSquare2 className="size-4 text-green-500" />
        ) : (
          <Square className="size-4 text-gray-500 " />
        )}
      </button>
      <div className='flex-1  min-w-0 flex flex-col gap-2'>
         <p
          className={`font-semibold text-sm truncate ${
            isDone
              ? "text-gray-400 line-through"
              : "text-gray-700"
          }`}
        >
          {task.title} 
        </p>
        <div className='flex items-center gap-1'>
            <Calendar className="size-3 text-gray-500 mt-0.5" />
            <p className="text-gray-900 text-xs ">{new Date(task.deadline).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}</p>
            
        </div>
      </div>
      <div className=' flex flex-col items-end gap-4'>
        <button className='hover:cursor-pointer' aria-label="Task options" onClick={() => setOpenMenu(prev => !prev)}>
          <EllipsisVertical className="size-4 text-gray-500 ml-6" />
        </button>
        <div className={`${task.priority === "high" ? "bg-red-50" : task.priority === "medium" ? "bg-yellow-50" : "bg-blue-50"}  rounded-full py-0.5 px-2.5 `}>
        <p className={`${task.priority === "high" ? "text-red-500" : task.priority === "medium" ? "text-yellow-500" : "text-blue-500"}  text-xs font-semibold`}>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>

        </div>
      
      </div>
        {openMenu && (
          <div className="absolute top-5 right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className='flex flex-col '>
            <NavLink  to={`/tasks/${task.id}/edit`} className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left">Edit Task</NavLink>
            <span className="px-4 py-2 text-xs text-gray-700  w-full text-left">Change Status </span>
            <button className="px-8 py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => changeStatus(task,  "todo")}>To Do</button>
            <button className="px-8 py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => changeStatus(task,  "in_progress")}>In Progress</button>
            <button className="px-8 py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => changeStatus(task,  "done")}>Done</button>
            
            <button onClick={() => onDelete(task)} className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 w-full text-left">Delete Task</button>
          </div>
          </div>
        )}
      
    </div>
  )
}

export default TaskComponent
