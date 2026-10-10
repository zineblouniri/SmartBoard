
import { NavLink, useParams } from 'react-router-dom'
import TaskForm from '../components/TaskForm'
import { ArrowLeft, ChevronRightIcon } from 'lucide-react'

const NewTask = () => {
    const {project_id} = useParams()
  return (
    <div className='px-8 py-4'>
        <div className='flex items-center gap-3 mb-4'>
            <NavLink to="/tasks" className="text-gray-400 hover:text-gray-600 hover:underline text-sm" >Tasks</NavLink>
               
               <ChevronRightIcon className=" size-3.5 text-gray-600"/> 
            <NavLink to="/projects/new" className="text-gray-700 hover:underline text-sm" >New Task</NavLink>
             
            
        </div>
        <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800 mb-2'>Create New Task</h1>
          <p className='text-gray-500 text-sm'>Add the details of your new task. You can always change them later.</p>
        </div>
        <NavLink to={project_id ? `/projects/${project_id}`  : `/tasks`} className="bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 py-2 px-4 rounded-lg flex items-center">
          <ArrowLeft className="mr-2 size-4"/> <p className='text-sm'>Back to Tasks</p>
        </NavLink>
      </div>
      <TaskForm project_id={project_id}/>
    </div>
  )
}

export default NewTask
