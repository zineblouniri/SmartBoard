import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { getProjects } from "../api/projectApi.js";
import ProjectCard from "../components/ProjectCard.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import { getCurrentUser } from "../api/authApi.js";
import Button from "../components/Button.jsx";
import dashboardHero from "../assets/dashboard-hero.svg";
import checkList from "../assets/checklist.svg";
import folderIcon from "../assets/folder-icon.svg";
import taskIcon from "../assets/tasks-icon.svg";
import {  ArrowRight } from "lucide-react";
const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
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
    const getUser = async () => {
      try {
        const res = await getCurrentUser()
        setUser(res.user)
        console.log(res.user)
      } catch (error) {
        console.error(error);
      }
    };
    getUser()
  },[])
  return (
    
     <div className="px-8">
      <div className="flex md:flex-row flex-col md:justify-between  w-full items-center">
         <div className="flex flex-col text-center gap-3 md:text-left md:items-start items-center">
    <h1 className="text-lg font-bold text-indigo-600">
      Good afternoon, {user && user.name} !
    </h1>
    <p className="md:text-5xl text-4xl font-semibold text-gray-900 mt-1">
      Welcome to your dashboard
    </p>
    <p className="text-lg  text-gray-600 mt-1">
      Manage your projects and tasks efficiently from one place.
    </p>
    
  </div>
      
      <img src={dashboardHero} alt="Dashboard Hero" className="w-120 h-70 " />
    </div>
      
      
      
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
  
  <div className="flex justify-between border border-gray-200 p-4 mt-2 bg-gray-50 rounded-xl shadow-xs">
    <div className="flex justify-between gap-8">
       <img src={folderIcon} alt="" className="text-indigo-600" />
       <div>
        <div>
      <h2 className="font-bold text-gray-600 mt-2">
      Total Projects
    </h2>
    <h2 className="font-bold text-indigo-600 md:text-3xl text-2xl">
      {projects.length}
    </h2>
    <p className="text-gray-500 md:text-md text-sm">Across all workspaces</p>
    </div>
       </div>
    </div>
    
    <div className="relative ">
      <NavLink to="/projects">
        <ArrowRight className="text-indigo-600 absolute bottom-0 right-0 rounded-xl bg-gray-100 hover:bg-gray-200 p-2 h-8 md:w-12 w-8 " />
      </NavLink>
    </div>
  </div>

  <div className="flex justify-between border border-gray-200 p-4 mt-2 bg-gray-50 rounded-xl shadow-xs">
    <div className="flex justify-between gap-8">
       <img src={taskIcon} alt="" className="text-indigo-600" />
       <div>
        <div>
      <h2 className="font-bold text-gray-600 mt-2">
      Total Tasks
    </h2>
    <h2 className="font-bold text-indigo-600 md:text-3xl text-2xl">
      {projects.length}
    </h2>
    <p className="text-gray-500 text-sm md:text-md">All tasks assigned</p>
    </div>
       </div>
    </div>
    
    <div className="relative ">
      <NavLink to="/tasks">
        <ArrowRight className="text-indigo-600 absolute bottom-0 right-0 rounded-xl bg-gray-100 hover:bg-gray-200 p-2 h-8 md:w-12 w-8" />
      </NavLink>
    </div>
  </div>
  
</div>
      
   

   <div className="flex flex-col md:flex-row items-center justify-center md:gap-24 gap-10 border border-violet-100 rounded-xl pl-4 mt-5 bg-violet-50">
    
<img src={checkList} alt="" className="w-48 h-48"/>
    
     <div>
    <h1 className="text-lg text-center font-semibold text-gray-800">
      Stay organized and productive
    </h1>
    
    <p className="text-lg text-center  text-gray-600 mt-1">
      Use Projects to organize your work and tasks to get things done
    </p>
    
  </div>
  
    <Button className="bg-violet-600 hover:bg-violet-700 px-5 md:mb-0 mb-10" onClick={() => navigate("/projects")}>+ New Project</Button>
      
  
   </div>

     </div>
    
  );
};

export default Dashboard;
