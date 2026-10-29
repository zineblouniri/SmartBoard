import  { useEffect, useState } from 'react'
import { NavLink, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import Button from '../components/Button'
import { Calendar, Pencil, Trash2 ,Folder,
  Rocket,
  Code,
  Globe,
  ChartLine,
  Users,
  User,
  ListCheckIcon,
  Plus,
  Search,
  CircleCheck,
  HourglassIcon,
  SquareCheck,
  EllipsisVertical} from 'lucide-react'
import { deleteProject, getProject } from '../api/projectApi'
import TaskCard from '../components/TaskCard'
import { toast } from 'sonner'
import { deleteTask, getTasksProject, updateTask } from '../api/taskApi'

const Project = () => {
const {id} = useParams()
const iconMap = {
  folder: Folder,
  rocket: Rocket,
  code: Code,
  globe: Globe,
  chart: ChartLine,
  users: Users,
};

const [project , setProject] =useState({
    name : '',
    description : '',
    icon : "folder"
})
useEffect(() => {
    const fetchProjectById = async (id) => {
      try {
        const project = await getProject(id);
        console.log("project:",project)
        setProject(project);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjectById(id);
  }, [id]);

const {setCurrentProjectName} = useOutletContext()
  useEffect(() => {
  setCurrentProjectName(project.name || '');
}, [project.name, setCurrentProjectName]);
const navigate = useNavigate()
const [msgConfirm, setMsgConfirm] = useState(false)
  const handleDelete = async() => {
    try {
      await deleteProject(id)
      setMsgConfirm(false)
      toast.success("Project deleted successfully")
      navigate("/projects")
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete project")
    }

  }


const Icon = iconMap[project.icon];

  

  const [tasks, setTasks] = useState([])
    useEffect(() => {
      const getTasks = async () => {
        try {
        const res = await getTasksProject(id)
        setTasks(res)
        console.log(res);
        } catch (error) {
          console.log(error);
        }
      }
      getTasks()
    },[id])

    const [taskToDelete, setTaskToDelete] = useState(null)
  const handleDeleteTask = async () => {
    try {
      await deleteTask(taskToDelete.id)
          setTasks(tasks.filter((task) => task.id !== taskToDelete.id))
          toast.success("Task deleted successfully")
          setTaskToDelete(null)
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task")
    }
  }


    const [searchValue, setSearchValue] = useState("");

   
      const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      
    

    const todoTasks =  filteredTasks.filter((task) => task.status === "todo");
    const inProgressTasks =  filteredTasks.filter((task) => task.status === "in_progress");
    const doneTasks =  filteredTasks.filter((task) => task.status === "done");

    const onStatusChange = async (task) => {
          try {
            const newStatus = task.status === "done" ? "todo" : "done"
            const updatedTask = await updateTask({...task,status :newStatus})
            setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? updatedTask : t)))
            console.log("Task updated successfully:", updatedTask);

          } catch (error) {
            console.error(error);
          }
        }

    const changeStatus = async (task, newStatus) => {
      try {
        const updatedTask = await updateTask({...task, status: newStatus});
        setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? updatedTask : t)))
      } catch (error) {
        console.error(error);
      }
    }

    const [openMenu, setOpenMenu] = useState(false)
    const show = false

  return (
    <div className='relative bg-white h-screen w-full '>
        
      <hr className='w-full mx-auto border-gray-100 '/>
      
        <div className="flex flex-col justify-between min-h-30 lg:w-3/4 w-full bg-white  lg:py-2 py-4 px-8  ">
      <div className="flex  gap-3 items-center relative ">
            <div className="  bg-indigo-50 rounded-lg lg:p-7 p-5 cursor-pointer hover:border-blue-500">
                    
            <Icon  className="size-8 text-indigo-500" /></div>
                   
        <div className="flex flex-col justify-start items-start gap-1">
          <p className="lg:text-xl text-md font-semibold text-gray-900 ">{project.name}</p>
          <p className="text-gray-900 text-sm line-clamp-1">{project.description}</p>
        </div>
        <EllipsisVertical className="absolute top-1 right-0 size-6 text-gray-700 ml-auto hover:cursor-pointer lg:hidden" onClick={() => setOpenMenu(prev => !prev)} />
        {openMenu && (
          <div className="absolute top-6 right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className='flex flex-col '>
           <NavLink to={`/projects/${project.id}/edit`} className="py-2.5 px-4 rounded-lg  flex items-center">
            <Pencil className="text-gray-800 size-3" /><span className='text-gray-800 text-xs ml-2'>Edit Project</span>
          </NavLink>
          <Button onClick={() => setMsgConfirm(true)} className="  bg-red-100/15 py-2.5 rounded-lg flex items-center">
            <Trash2 className="text-red-500 size-3" /><span className='text-red-500 text-xs ml-2' >Delete Project</span>
          </Button>
          
          </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex justify-center items-center gap-2">
            <Calendar className="size-3 text-gray-500 mt-0.5" />
            <p className="text-gray-900 text-xs ">
              Created on {new Date(project.created_at).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}
            </p>
            <User className="size-3 text-gray-500 ml-3 mt-0.5" />
            <p className="text-gray-900 text-xs">You are the owner</p>
        </div>
        <div className={`lg:flex justify-end gap-2 mt-3 ${show ? "flex" : "hidden"}`}>
          
          <NavLink to={`/projects/${project.id}/edit`} className="border border-gray-200 py-2.5 px-4 rounded-lg  flex items-center">
            <Pencil className="text-gray-800 size-3" /><span className='text-gray-800 text-xs ml-2'>Edit Project</span>
          </NavLink>
          <Button onClick={() => setMsgConfirm(true)} className=" border border-red-200 bg-red-100/15 py-2.5 rounded-lg flex items-center">
            <Trash2 className="text-red-500 size-3" /><span className='text-red-500 text-xs ml-2' >Delete Project</span>
          </Button>
        </div>
      </div>
      <div className='flex lg:flex-row flex-col justify-start items-center mt-2 gap-4 w-full'>
        <div className='flex justify-center items-center gap-4 w-full'>
          <div className="flex justify-start items-center gap-5 border border-gray-200 rounded-lg p-3 w-full">
            <div className='border-0 rounded-full bg-blue-50 p-3'>
<ListCheckIcon className="size-4 text-blue-500 " />
            </div>
            
            <div className='flex-col gap-1'>
              <p className="font-bold text-gray-600 text-center ">
              {tasks.length}
            </p>
            <p className=" text-gray-600 text-xs text-center">
              Total Tasks
            </p>
            </div>
        </div>
        <div className="flex justify-start items-center gap-5 border border-gray-200 rounded-lg p-3 w-full">
            <div className='border-0 rounded-full bg-indigo-50 p-3'>
<CircleCheck className="size-4 text-indigo-500 " />
            </div>
            
            <div className='flex-col gap-1 items-center'>
              <p className="font-bold text-gray-600 text-center ">
              {todoTasks.length}
            </p>
            <p className=" text-gray-600 text-xs text-center">
              To Do
            </p>
            </div>
        </div>
        </div>
        
        <div className='flex justify-center items-center gap-4 w-full'>
          <div className="flex justify-start items-center gap-3 border border-gray-200 rounded-lg p-3 w-full">
            <div className='border-0 rounded-full bg-orange-50 p-3'>
<HourglassIcon className="size-4 text-orange-300 " />
            </div>
            
            <div className='flex-col gap-1 items-center'>
              <p className="font-bold text-gray-600 text-center">
              {inProgressTasks.length}
            </p>
            <p className=" text-gray-600 text-xs text-center">
              In Progress
            </p>
            </div>
        </div>
        <div className="flex justify-start items-center gap-3 border border-gray-200 rounded-lg p-3 w-full">
            <div className='border-0 rounded-full bg-green-50 p-3'>
<SquareCheck className="size-4 text-green-500 " />
            </div>
            
            <div className='flex-col gap-1 items-center'>
              <p className="font-bold text-gray-600 text-center ">
              {doneTasks.length}
            </p>
            <p className=" text-gray-600 text-xs text-center">
              Done
            </p>
            </div>
        </div>
        </div>

      </div>

    <div className="mt-2">
        <div className="flex justify-between items-center py-2  ">
        
          
          <p className="text-lg font-semibold text-gray-800">Tasks </p> 
          <NavLink
          to={`/tasks/project/${project.id}/new`}
          className="  bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg flex items-center"
        >
          <Plus className="mr-2 size-4" />{" "}
          <span className="text-xs">Add Task</span>
        </NavLink>
          
        
        
        
      </div>
      
        <div className="sticky top-0 z-10 flex items-center mb-4 gap-2 border border-gray-200 rounded-lg w-80 bg-white py-2 px-2 ">
          <Search className="size-3.5 text-gray-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search tasks..."
            className="text-sm w-full outline-none  "
          />
        </div>
        
        
      
      </div>
<div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
  <TaskCard status={"To Do"} tasks={todoTasks} statusValue={"todo"} projectId={id} onStatusChange={onStatusChange} changeStatus={changeStatus} onDelete={setTaskToDelete} />
  <TaskCard status={"In Progress"} tasks={inProgressTasks} statusValue={"in_progress"} projectId={id} onStatusChange={onStatusChange} changeStatus={changeStatus} onDelete={setTaskToDelete} />
  <TaskCard status={"Done"} tasks={doneTasks} statusValue={"done"} projectId={id} onStatusChange={onStatusChange} changeStatus={changeStatus} onDelete={setTaskToDelete} />
  
</div>

    </div>
    
    <div className="lg:absolute right-80 top-0 bottom-0 w-px bg-gray-100" />

      {msgConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 m-4">

      <h2 className="text-lg font-semibold text-gray-800">
        Delete project ?
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        Are you sure you want to delete{" "}
        <span className="font-medium text-gray-700">
          {project.name}
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

       {taskToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

      <h2 className="text-lg font-semibold text-gray-800">
        Delete Task ?
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        Are you sure you want to delete{" "}
        <span className="font-medium text-gray-700">
          {taskToDelete.title}
        </span>
        ? This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={() => setTaskToDelete(null)}
          className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>

        <button
        onClick={() => handleDeleteTask(taskToDelete.id)}
          type="button"
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

export default Project
