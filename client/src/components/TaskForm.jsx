import { useEffect, useState } from 'react'
import { Save, ChevronDown} from 'lucide-react'
import {toast} from 'sonner'
import { useNavigate } from 'react-router-dom'
import { createTask, getTaskById, updateTask } from '../api/taskApi'

const TaskForm = ({taskId, project_id}) => { 
  
    const [formData , setFormData] = useState({
    title :  '',
    description : '',
    status : 'todo',
    priority : 'medium',
    deadline : '',
    project_id : project_id,
    assigned_to : ''
  })


  const navigate = useNavigate()

 useEffect(() => {
  if (taskId) {
    const fetchTask = async () => {
      try {
        const task = await getTaskById(taskId)
        setFormData({...task, deadline : task.deadline ? task.deadline.split('T')[0] : ''})
        console.log(task);
      } catch (error) {
        console.log(error)
      }
    }

    fetchTask()
  }
}, [taskId])

  const handleSubmit = async (e) => { 
    e.preventDefault()
    console.log(formData);
    try {
      await createTask(formData)
      setFormData({title : '',description : '',status : 'todo',priority : 'medium',deadline : '', project_id : project_id})
      toast.success("Task created successfully")
    } catch (error) {
      console.log(error);
      toast.error("Failed to create task")
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      await updateTask({taskId, ...formData})
      navigate(`/projects/${formData.project_id}`)
      toast.success("Task edited successfully")
    } catch (error) {
      console.log(error);
      toast.error("Failed to edit task")
    }
  }
  return (
    <div className='lg:px-6'>
      <form onSubmit={taskId? handleEdit :handleSubmit} className='pb-28' >
          <div className='flex flex-col items-start lg:pt-7 '>
            <p className='text-gray-800 font-semibold mb-1'>Task Title </p>
            <p className='text-gray-500 text-sm mb-2'>Choose a clear and descriptive name for your task</p>
            <input required={true} value={formData.title} onChange={(e) => setFormData({...formData,title :e.target.value})} type="text" placeholder='e.g. Smartboard Website' className="text-sm text-gray-500 border border-gray-200 bg-white rounded-lg px-3 py-2 outline-none w-full" />
          </div>
          <div className='flex flex-col items-start pt-5'>
            <p className='text-gray-800 font-semibold mb-1'>Description</p>
            <p className='text-gray-500 text-sm mb-2'>Describe your task goals, features or any important details.</p>
            <textarea required={true} value={formData.description} onChange={(e) => setFormData({...formData,description :e.target.value})} placeholder='e.g. This project will help us manage tasks, collaborate with team members, and track progress easily.' className="text-sm bg-white text-gray-500 border border-gray-200 rounded-lg px-3 py-2 outline-none w-full h-25" />
          </div>
          <div className='flex lg:flex-row flex-col items-center justify-start pt-5 w-full gap-1 lg:gap-3'>
            <div className="relative w-50">
          <select
            name="Status"
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({...formData,status :e.target.value})}
            className="text-sm border border-gray-200 rounded-lg py-2 px-2 bg-white w-full outline-none appearance-none"
          >
            <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
            <ChevronDown className="size-4 text-gray-400" />
          </span>
        </div>
        <div className="relative w-50">
          <select
            name="Priority"
            id="priority"
            value={formData.priority}
            onChange={(e) => setFormData({...formData,priority :e.target.value})}
            className="text-sm border border-gray-200 rounded-lg py-2 px-2 bg-white w-full outline-none appearance-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
            <ChevronDown className="size-4 text-gray-400" />
          </span>
        </div>
        
          <input
  type="date"
  value={formData.deadline}
  min={new Date().toISOString().split("T")[0]}
  onChange={(e) =>
    setFormData({ ...formData, deadline: e.target.value })
  }
  className="w-50 border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
/>
        
            
          </div>
            

          <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-end gap-3
                border-t border-gray-200 bg-white
                px-4 py-4 shadow-lg
                lg:left-64 lg:px-6">
            <button type="button" onClick={() => navigate("/projects")} className='border border-gray-200 hover:bg-gray-100 hover:cursor-pointer text-gray-800 py-2 px-4 rounded-lg text-sm '>Cancel</button>
            <button type='submit' className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-lg flex items-center">
              <Save className="mr-2 size-4"/> <p className='text-sm'>{taskId ? 'Update Task' : 'Create Task'}</p>
            </button>
          </div>
        </form>
    </div>
  )
}

export default TaskForm
