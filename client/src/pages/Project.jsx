import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Button from '../components/Button'
import { Calendar, Pencil, Trash2 ,Folder,
  Rocket,
  Code,
  Globe,
  ChartLine,
  Users,
  User,
  ListCheckIcon,
  ChevronDown,
  Plus,
  Search,
  CircleCheck,
  HourglassIcon,
  SquareCheck} from 'lucide-react'
import { getProject } from '../api/projectApi'
import TaskCard from '../components/TaskCard'

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
const [project , setProject] = React.useState({
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
const Icon = iconMap[project.icon];

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  return (
    <div className='bg-white h-full w-full '>
        
      <hr className='w-full mx-auto border-gray-100 '/>
      
        <div className="flex flex-col justify-between min-h-30 w-3/4 bg-white border border-gray-200 rounded-lg py-3 px-8  shadow-xs hover:shadow-md transition-shadow duration-300 ">
      <div className="flex  gap-2 items-center">
            <div className="  bg-indigo-50 rounded-lg px-7 py-7 cursor-pointer hover:border-blue-500">
                    
            <Icon  className="size-8 text-indigo-500" /></div>
                   
        <div className="flex flex-col justify-start items-start gap-1">
          <p className="text-xl font-semibold text-gray-900 ">{project.name}</p>
          <p className="text-gray-900 text-sm line-clamp-1">{project.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex justify-center items-center gap-2">
            <Calendar className="size-3 text-gray-500 mt-0.5" />
            <p className="text-gray-900 text-xs ">
              Created on {new Date(project.created_at).toLocaleString()}
            </p>
            <User className="size-3 text-gray-500 ml-3 mt-0.5" />
            <p className="text-gray-900 text-xs">You are the owner</p>
        </div>
        <div className="flex justify-end gap-2 mt-5">
          
          <Button className="border border-gray-200 py-2.5 rounded-lg  flex items-center">
            <Pencil className="text-gray-800 size-3" /><span className='text-gray-800 text-xs ml-2'>Edit Project</span>
          </Button>
          <Button className=" border border-red-200 bg-red-100/15 py-2.5 rounded-lg flex items-center">
            <Trash2 className="text-red-500 size-3" /><span className='text-red-500 text-xs ml-2' >Delete Project</span>
          </Button>
        </div>
      </div>
      <div className='flex justify-between items-center mt-5 gap-4'>
        <div className="flex justify-start items-center gap-5 border border-gray-200 rounded-lg p-3 w-full">
            <div className='border-0 rounded-full bg-blue-50 p-3'>
<ListCheckIcon className="size-4 text-blue-500 " />
            </div>
            
            <div className='flex-col gap-1'>
              <p className="font-bold text-gray-600 ">
              25
            </p>
            <p className=" text-gray-600 text-xs">
              Total Tasks
            </p>
            </div>
        </div>
        <div className="flex justify-start items-center gap-5 border border-gray-200 rounded-lg p-3 w-full">
            <div className='border-0 rounded-full bg-indigo-50 p-3'>
<CircleCheck className="size-4 text-indigo-500 " />
            </div>
            
            <div className='flex-col gap-1'>
              <p className="font-bold text-gray-600 ">
              25
            </p>
            <p className=" text-gray-600 text-xs">
              To Do
            </p>
            </div>
        </div>
        <div className="flex justify-start items-center gap-3 border border-gray-200 rounded-lg p-3 w-full">
            <div className='border-0 rounded-full bg-orange-50 p-3'>
<HourglassIcon className="size-4 text-orange-300 " />
            </div>
            
            <div className='flex-col gap-1'>
              <p className="font-bold text-gray-600 ">
              25
            </p>
            <p className=" text-gray-600 text-xs">
              In Progress
            </p>
            </div>
        </div>
        <div className="flex justify-start items-center gap-3 border border-gray-200 rounded-lg p-3 w-full">
            <div className='border-0 rounded-full bg-green-50 p-3'>
<SquareCheck className="size-4 text-green-500 " />
            </div>
            
            <div className='flex-col gap-1'>
              <p className="font-bold text-gray-600 ">
              25
            </p>
            <p className=" text-gray-600 text-xs">
              Done
            </p>
            </div>
        </div>

      </div>

    <div className="mt-2">
        <div className=" flex justify-between items-center py-2  ">
        <div>
          
          <p className="text-lg font-semibold text-gray-800">Tasks </p> 
          
        </div>
        
      </div>
      <div className="flex justify-start items-center mb-4 gap-2 relative ">
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg w-80 bg-white py-2 px-2 ">
          <Search className="size-3.5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="text-sm w-full outline-none  "
          />
        </div>
        <div className="relative w-35">
          <select
            name="Sort"
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg py-2 px-2 bg-white w-full outline-none appearance-none"
          >
            <option value="allTasks">All Tasks</option>
            <option value="completed">Completed</option>
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
        
        <NavLink
          to="/tasks/new"
          className="absolute right-0 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
        >
          <Plus className="mr-2 size-4" />{" "}
          <span className="text-sm">Add Task</span>
        </NavLink>
      </div>
      </div>
<div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
  <TaskCard/>
  <TaskCard/>
  <TaskCard/>
</div>

    </div>
      
    </div>
  )
}

export default Project
