import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <div className="h-screen w-screen flex ">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 flex flex-col  bg-gray-100 overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)}/>
        <div className="overflow-y-auto flex-1  "><Outlet /></div>
      </main>
    </div>
  );
};

export default DashboardLayout;
