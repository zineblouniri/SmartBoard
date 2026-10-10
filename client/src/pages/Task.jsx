import  { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'
import { Calendar, Pencil, Trash2,User,Book, Icon, PlusCircle, PencilIcon, User2} from 'lucide-react'
import { deleteTask, getTaskById } from '../api/taskApi'
import { toast } from 'sonner'
import { getProject } from '../api/projectApi'
import {  Folder, 
  Rocket,
  Code,
  Globe,
  ChartLine,
  Users } from 'lucide-react'

const Task = () => {
    const {id} = useParams();
    const [task, setTask] = useState({});
    const [projectName, setProjectName] = useState('')
    const [icon, setIcon] = useState('')
    
   const iconMap = {
  folder: Folder,
  rocket: Rocket,
  code: Code,
  globe: Globe,
  chart: ChartLine,
  users: Users,
};

    

    useEffect(()  => {
        const fetchTask = async () => {
            try {
                const task = await getTaskById(id)
                setTask(task)
                console.log("task",task )
                const project = await getProject(task.project_id)
                setProjectName(project.name)
                setIcon(project.icon)
                console.log(project)
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchTask();
    }, [id])

    const ProjectIcon = iconMap[icon] || Folder;



    
    
  //const Icon = iconMap[icon];  
const [msgConfirm, setMsgConfirm] = useState(false)
const navigate = useNavigate()
const handleDelete = async() => {
    try {
      await deleteTask(id)
      setMsgConfirm(false)
      toast.success("Task deleted successfully")
      navigate("/tasks")
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task")
    }

  }

  const wasUpdated = task.updated_at && task.created_at &&
  new Date(task.updated_at).getTime() > new Date(task.created_at).getTime();

  const date1 = new Date(task.created_at).getTime();
  const date2 = new Date(task.updated_at).getTime();

  console.log("date1", date1);
  console.log("date2", date2);


  return (
    <div className='flex flex-col justify-center items-start p-6 w-full'>
      <div className='flex flex-col w-full min-h-50 bg-white rounded-lg shadow-xs p-6 gap-4'>
        <div className="flex gap-2 items-center">
            <div className="  bg-indigo-50 rounded-lg px-7 py-7 cursor-pointer hover:border-blue-500">
                    
            <Book  className="size-8 text-indigo-500" />
            </div>
                   
        <div className="flex flex-col justify-start items-start gap-1">
          <p className="text-xl font-semibold text-gray-900 ">{task.title}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex justify-center items-center gap-2">
            <Calendar className="size-3 text-gray-500 mt-0.5" />
            <p className="text-gray-900 text-xs ">
              Created on {new Date(task.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          timeZone: "UTC",
                        })}
            </p>
            <User className="size-3 text-gray-500 ml-3 mt-0.5" />
            <p className="text-gray-900 text-xs">You are the owner</p>
        </div>
        <div className="flex justify-end gap-2 mt-3">
          
          <NavLink to={`/tasks/${id}/edit`} className="border border-gray-200 py-2.5 px-4 rounded-lg  flex items-center">
            <Pencil className="text-gray-800 size-3" /><span className='text-gray-800 text-xs ml-2'>Edit Task</span>
          </NavLink>
          <Button onClick={() => setMsgConfirm(true)} className=" border border-red-200 bg-red-100/15 py-2.5 rounded-lg flex items-center">
            <Trash2 className="text-red-500 size-3" /><span className='text-red-500 text-xs ml-2' >Delete Task</span>
          </Button>
        </div>
      </div>
      </div>
      <div className='flex items-start justify-center w-full mt-4 flex-1 '>
        <div className=' gap-4 w-2/3 flex flex-col'>
        <div className='flex flex-col bg-white rounded-lg shadow-xs p-6 gap-4 '>
          <div className='flex flex-col items-start gap-2'>
            <p className="text-md font-semibold text-gray-900">Description</p>
          <p className="text-gray-500 text-sm line-clamp-3">{task.description}</p>
          </div>
          <hr className='border-gray-200'/>
          <div className='flex flex-col items-start gap-2'>
            <p className="text-md font-semibold text-gray-900">Details</p>
            
            <div className='flex justify-center items-center gap-10'>
              <div className='flex flex-col gap-3'>
                <p className="text-gray-500 text-sm">Project</p>
                <p className="text-gray-500 text-sm">Priority</p>
                <p className="text-gray-500 text-sm">Status</p>
                <p className="text-gray-500 text-sm ">Deadline</p>
              </div>
              <div className='flex flex-col gap-3'>
                
              <div className='flex items-center gap-2'>
                <ProjectIcon className="size-3 text-blue-400 mt-0.5" />
                <p className="text-blue-500 text-sm font-semibold">{projectName}</p>
              </div>
                <div className=' text-center items-center  '>
                   <div className={`w-fit ${task.priority === "high" ? "bg-red-50" : task.priority === "medium" ? "bg-yellow-50" : "bg-blue-50"}  rounded-full py-1 px-3 `}>
        <p className={`${task.priority === "high" ? "text-red-500" : task.priority === "medium" ? "text-yellow-500" : "text-blue-500"}  text-xs font-semibold`}>{task.priority
  ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
  : "No priority"}</p>

        </div>
                </div>
                <div className='w-fit rounded-full py-1 px-3 bg-indigo-100'>
                  <p className='text-indigo-800 text-xs font-semibold'>
                    {task.status === "todo" ? "To Do" : task.status === "in_progress" ? "In Progress" : "Done"}
                  </p>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className="size-3 text-gray-500 mt-0.5" />
                  <p className="text-gray-900 text-xs">
                    {task.deadline
                      ? new Date(task.deadline).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          timeZone: "UTC",
                        })
                      : "No deadline"}</p>
                </div>
                
                </div>
            </div>

          </div>
        </div>
        <div className='flex flex-col bg-white rounded-lg shadow-xs p-6 items-start gap-2'>
          <div className='flex flex-col items-start gap-2'>
            <p className="text-md font-semibold text-gray-900 mb-2">Notes</p>
            <p className="text-gray-600 text-sm line-clamp-1">{task.description}</p>
          </div>
        </div>
        </div>
        <div className='flex flex-col px-4  gap-4 flex-1'>
<div className='flex flex-col bg-white rounded-lg shadow-xs p-6 items-start gap-2'>
            <p className="text-md font-semibold text-gray-900 mb-2">Activity</p>
            <div className='relative flex flex-col gap-6'>
               {task.updated_at && (
    <div className="absolute left-4 top-8 bottom-8 w-px bg-gray-200" />
  )}
              <div className='relative z-10 flex items-center gap-2'>
                <div className='flex items-center justify-center w-8 h-8 rounded-full bg-green-100'>
                  <PlusCircle className="size-4 text-green-500 " />
                </div>
                <div className='flex flex-col items-start justify-center ml-3'>
                  <p className="text-gray-800 text-sm font-semibold">Task created</p>
                  <p className="text-gray-500 text-xs">{new Date(task.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}</p>
                </div>
              </div>
              {task.updated_at && (
                <div className='relative z-10 flex items-center gap-2'>
                <div className='flex items-center justify-center w-8 h-8 rounded-full bg-blue-100'>
                  <PencilIcon className="size-4 text-blue-500" />
                </div>
                <div className='flex flex-col items-start justify-center ml-3'>
                  <p className="text-gray-800 text-sm font-semibold">Task updated</p>
                  <p className="text-gray-500 text-xs">{new Date(task.updated_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}</p>
                </div>
              </div>
              )}
              {task.updated_at && (
                <div className='relative z-10 flex items-center gap-2'>
                <div className='flex items-center justify-center w-8 h-8 rounded-full bg-blue-100'>
                  <User2 className="size-4 text-blue-500" />
                </div>
                <div className='flex flex-col items-start justify-center ml-3'>
                  <p className="text-gray-800 text-sm font-semibold">You assigned yourself</p>
                  <p className="text-gray-500 text-xs">{new Date(task.updated_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}</p>
                </div>
              </div>
              )}

            </div>
          </div>
          
         <div className='flex flex-col bg-white rounded-lg shadow-xs p-6 items-start gap-2'>
          <div className='flex flex-col items-start gap-2'>
            <p className="text-md font-semibold text-gray-900 mb-2">Attachments</p>
          </div>
        </div>
        </div>

        
      </div>
      {msgConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

      <h2 className="text-lg font-semibold text-gray-800">
        Delete task ?
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        Are you sure you want to delete{" "}
        <span className="font-medium text-gray-700">
          {task.title}
        </span>
        ? This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={() => setMsgConfirm(false)}
          className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
        >
          Delete
        </button>
      </div>

    </div>
  </div>
       )}
    </div>
  )
}

export default Task
