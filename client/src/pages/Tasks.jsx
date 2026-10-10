import {  useEffect, useState } from "react";
import { ChevronDown, Plus, Search } from "lucide-react";
import { NavLink, useNavigate, useParams, useSearchParams } from "react-router-dom";
import TaskCardBig from "../components/TaskCardBig";
import { deleteTask, getTasks, getTasksProject } from "../api/taskApi";
import { getProjects } from "../api/projectApi";
import {toast} from 'sonner'

const Tasks = () => {
  const [tasks,setTasks] = useState([])
  const [projects,setProjects] = useState([])
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [loading, setLoading] = useState(true);

  const {projectId} = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchStatus = searchParams.get("status")
  const statusFilter = searchStatus || "all"
  
  

  
  

  useEffect(() => {
    const fetchTasks = async () => {
      
      try {
        setLoading(true)
        const res = projectId ? await getTasksProject(projectId) : await getTasks()
        
        setTasks(res)
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
      setLoading(false);
    }
    }
    fetchTasks()
  },[projectId])

  useEffect(() => {
    const fetchProjects= async () => {
      try {
        const res = await getProjects()
        setProjects(res)
        console.log("projects",res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProjects()
  },[])


  const navigate = useNavigate()

  const handleProjectChange = (e) => {
    const value = e.target.value
    if(value === "all") {
      navigate(`/tasks${searchStatus?`?status=${searchStatus}`:""}`)
    }
    else {
      navigate(`/tasks/project/${value}${searchStatus?`?status=${searchStatus}`:""}`) 
    }
    
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  }
    
  )

 

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.created_at) - new Date(a.created_at);
    }

    return new Date(a.created_at) - new Date(b.created_at);
  });

 const [taskToDelete ,setTaskToDelete] = useState(null)

 const handleDelete = async () => {
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

  return (
    <div className="px-8 mt-3">
      <div className="sticky top-0 z-10 bg-gray-100 pb-2">
        <div className=" flex justify-between items-center py-2  ">
        <div>
          
          <h1 className="text-2xl font-bold text-gray-800">Tasks 
            <span className="ml-2 text-sm font-normal text-gray-400">
  ({sortedTasks.length} of {tasks.length} tasks )
</span>
            </h1> 
          
          <p className="text-gray-500 text-sm">
            Manage and organize all your tasks in one place.
          </p>
        </div>
        <NavLink
          to={projectId ? `/tasks/project/${projectId}/new` : `/tasks/new`}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
        >
          <Plus className="mr-2 size-4" />{" "}
          <span className="text-sm">New Task</span>
        </NavLink>
      </div>
      <div className="flex justify-start items-center mb-4 gap-2 bg-gray-100">
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg w-1/4 bg-white py-2 px-2 ">
          <Search className="size-3.5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="text-sm w-full outline-none  "
          />
        </div>
        <div className="relative w-40">
          <select
            name="ProjectName"
            id="projectName"
            value={projectId || "all"}
            onChange={(e) => handleProjectChange(e)} 
            className="text-sm border border-gray-200 rounded-lg py-2 px-2 bg-white w-full outline-none appearance-none"
          >
             <option value="all">All Projects</option>
             {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
         </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
            <ChevronDown className="size-4 text-gray-400" />
          </span>
        </div>
        <div className="relative w-26">
          <select
            name="Status"
            id="status"
            value={statusFilter}
            onChange={(e) => {
              const value = e.target.value;
              if(value === "all") {
                searchParams.delete("status")
              }
              else{
                searchParams.set("status", value)
              }
              setSearchParams(searchParams)
            }}
            className="text-sm border border-gray-200 rounded-lg py-2 px-2 bg-white w-full outline-none appearance-none"
          >
            <option value="all">All Status</option>
            <option value="todo">To do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
            <ChevronDown className="size-4 text-gray-400" />
          </span>
        </div>
        <div className="relative w-26">
          <select
            name="Sort"
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg py-2 px-2 bg-white w-full outline-none appearance-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
            <ChevronDown className="size-4 text-gray-400" />
          </span>
        </div>
        
      </div>
      </div>

     
{loading ? (
  <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
    {[1, 2, 3, 4, 5, 6].map((item) => (
      <div
        key={item}
        className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>

          <div className="h-7 w-7 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Description */}
        <div className="space-y-2 mb-5">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-4/5"></div>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
          <div className="h-3 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
      ))}
  </div>
) :    tasks.length === 0 ? (
    <div className="min-h-64 flex flex-col items-center justify-center text-center">
      <p className="text-gray-700 font-medium">
        No tasks yet.
      </p>

      <p className="text-sm text-gray-500 mt-1">
        Create your first task to get started.
      </p>

      <NavLink
        to="/tasks/new"
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-lg"
      >
        Create Task
      </NavLink>
    </div>
  ) : sortedTasks.length === 0  ? (
    <div className="min-h-64 flex flex-col items-center justify-center text-center">
      <p className="text-gray-700 font-medium">
        No tasks found.
      </p>

      <p className="text-sm text-gray-500 mt-1">
        Try another search or choose a different filter.
      </p>
    </div>
  ): (
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {sortedTasks.map((task) => (
          <TaskCardBig key={task.id} task={task} onDelete={()=>setTaskToDelete(task)} />
        ))}
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
        onClick={() => handleDelete(taskToDelete.id)}
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
    
  );
};

export default Tasks;
