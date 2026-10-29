import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";
import Projects from "./pages/Projects.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Tasks from "./pages/Tasks.jsx";
import NewProjects from "./pages/NewProjects.jsx";
import NewTask from "./pages/NewTask.jsx";
import Project from "./pages/Project.jsx";
import { Toaster } from "sonner";
import EditProject from "./pages/EditProject.jsx";
import EditTask from "./pages/EditTask.jsx";
import Task from "./pages/Task.jsx";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/Profile.jsx";
function App() {
  return (
    <div className="App">
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/new" element={<NewProjects />} />
            <Route path="/projects/:id/edit" element={<EditProject />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/project/:projectId" element={<Tasks />} />
            <Route path="/tasks/project/:project_id/new" element={<NewTask />} />
            <Route path="/tasks/new" element={<NewTask />} />
            <Route path="/tasks/:id/edit" element={<EditTask />} />
            <Route path="/tasks/:id" element={<Task />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
