import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi.js";
import { CheckSquare, Folder, FolderCheck, Home, ListCheck, LogOut, Settings, SquareCheck, User, X } from "lucide-react";
import Logo from '../assets/logo.svg'
import { NavLink } from "react-router-dom";
import { getTasks } from "../api/taskApi.js";
const Sidebar = ({sidebarOpen,setSidebarOpen}) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await getProjects();
        setProjects(projects);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, []);

   useEffect(() => {
    const fetchTaskss = async () => {
      try {
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTaskss();
  }, []);

 

  
  return (
    <aside className={`lg:flex flex-col fixed lg:static top-0 left-0 z-40 px-4 bg-gray-900 text-white w-64 h-screen ${sidebarOpen ? "flex" : "hidden"} `}>
     <X size={20} className="lg:hidden absolute top-4 right-4 cursor-pointer" onClick={() => setSidebarOpen(false)} />
      <div className="flex items-center my-5">
        <img src={Logo} alt="Logo" className="w-10 h-10" />
      <div className="flex flex-col items-start justify-start">
        <h1 className="text-2xl font-semibold px-4  text-gray-200 ">
          SmartBoard
        </h1>
        <h1 className="text-sm  px-4 text-gray-300">
          AI Project Manager
        </h1>
          
      </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-6 text-gray-200 mt-10">
        
          <NavLink to="/dashboard" className={(({isActive}) => 
              `flex gap-5 items-center p-2 px-4 rounded-lg w-55 ${isActive ? "bg-blue-900/50" :""}`
          )}>
            <Home size={18} />
            <span>Dashboard</span>
          </NavLink>
        
       
          <NavLink to="/projects" className={(({isActive}) => 
              `flex gap-5 items-center p-2 px-4 rounded-lg w-55 ${isActive ? "bg-blue-900/50" :""}`
          )}>
            <Folder size={18} />
            <span>Projects</span>
          </NavLink>
        
          
          <NavLink to="/tasks" className={(({isActive}) => 
              `flex gap-5 items-center p-2 px-4 rounded-lg w-55 ${isActive ? "bg-blue-900/50" :""}`
          )}><SquareCheck size={18} /><span>Tasks</span></NavLink>
       
          <NavLink to="/profile" className={(({isActive}) => 
              `flex gap-5 items-center p-2 px-4 rounded-lg w-55 ${isActive ? "bg-blue-900/50" :""}`
          )}><User size={18} /><span>Profile</span></NavLink>
        
      </div>
      <hr className="w-3/4 mx-auto border-white/10 mt-8" />
      <div className="flex flex-col  gap-2 mt-5 mb-8">
          <p className="text-gray-400 text-md text-start mb-3 ">Workspace </p>
        
        <div className="flex items-center gap-20">
          <div className="flex flex-col items-start gap-5 ml-5">
          <div className="flex gap-3 items-center">
            <FolderCheck size={18}  />
            <p>Projects </p>
          </div>
        <div className="flex gap-3 items-center">
          <ListCheck size={18}  />
          <p>Tasks </p>
        </div>
        </div>
        <div className="flex flex-col items-start  gap-5">
          <p> {projects.length}</p>
        <p> {tasks.length}</p>
        </div>
        </div>
      </div>
      <hr className="w-3/4 mx-auto border-white/10" />
       
          <div className="mt-auto flex flex-col  gap-5 mb-8  ml-5">
          <div className="flex items-center gap-3">
            
            <NavLink to="/settings" className={(({isActive}) => 
              `flex gap-5   rounded-lg w-55 ${isActive ? "bg-blue-900/50" :""}`
            )}><Settings size={18}  /><span>Settings</span></NavLink>
          </div>
        <div className="flex gap-3 items-center">
          
          <NavLink to="/login" className={(({isActive}) => 
            `flex gap-5  rounded-lg w-55 ${isActive ? "bg-blue-900/50" :""}`
          )}  ><LogOut size={18} /><span>logout</span></NavLink>
        </div>
        </div>
       
       
      <div className="flex flex-col items-center justify-center gap-2">
        
        
      </div>
    </aside>
  );
};

export default Sidebar;
