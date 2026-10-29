import React, { use, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { getProjects } from "../api/projectApi.js";
import { getTasks } from "../api/taskApi.js";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [currentProjectName, setCurrentProjectName] = useState('');
  const [currentTaskTitle, setCurrentTaskTitle] = useState('');
  const [projectCount, setProjectCount] = useState(0)
  const [taskCount, setTaskCount] = useState(0)

  useEffect(() => {
    const fetchCounts = async() => {
    try {
      const [projects,tasks] = await Promise.all([
        getProjects(),
        getTasks()
      ])
      setProjectCount(projects.length)
      setTaskCount(tasks.length)
    } catch (error) {
      console.error("Error fetching dashboard counts:", error);
    }
  }
  fetchCounts()
  },[])
  return (
    <div className="h-screen w-screen flex ">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} projectCount ={projectCount} taskCount={taskCount}/>
      <main className="flex-1 flex flex-col  bg-gray-100 overflow-hidden">
        <Navbar projectName={currentProjectName} taskTitle= {currentTaskTitle} onMenuClick={() => setSidebarOpen(!sidebarOpen)}/>
        <div className="overflow-y-auto flex-1  "><Outlet  context={{ setCurrentProjectName,setCurrentTaskTitle,projectCount,taskCount }}/></div>
      </main>
    </div>
  );
};

export default DashboardLayout;
