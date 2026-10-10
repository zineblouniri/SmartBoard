
import TaskComponent from './TaskComponent'
import { NavLink } from 'react-router-dom'
const TaskCard = ({projectId,status,tasks,statusValue,onStatusChange,changeStatus,onDelete}) => {

  return (
    <div className={`${status==="To Do" ? "bg-indigo-50/70" : status==="In Progress" ? "bg-orange-50/70" : "bg-green-50/70" }  min-h-82 rounded-lg w-full p-3 flex flex-col`} >
      <div className='flex gap-2 items-center mb-4 '>
        <p className='font-semibold text-sm text-gray-700'>{status}</p>
        <p className={`${status==="To Do" ? "bg-indigo-100" : status==="In Progress" ? "bg-orange-100" : "bg-green-100" }  rounded-full py-0.5 px-2.5 ${status==="To Do" ? "text-indigo-500" : status==="In Progress" ? "text-orange-500" : "text-green-500"}  text-xs font-semibold`}>{tasks.length}</p>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.slice(0, 3).map((task) => (
          <TaskComponent key={task.id}  task={task} project_id={projectId} onStatusChange={onStatusChange} onDelete={onDelete} changeStatus={changeStatus} />
        ))}
      </div>
      <div className='mt-auto pt-3 '>
        <NavLink
          to={`/tasks/project/${projectId}?status=${statusValue}`}
          className="  text-blue-500 w-full  flex items-end justify-end p-3 mt-2 "
        >
          
          <span className="text-xs font-semibold"> Show all tasks →</span>
        </NavLink>
      </div>



      
    </div>
  )
}

export default TaskCard
