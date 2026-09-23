import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Register from './pages/Register.jsx'
import Projects from './pages/Projects.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Tasks from './pages/Tasks.jsx'
import NewProjects from './pages/NewProjects.jsx'
import Project from './pages/Project.jsx'
import { Toaster } from 'sonner'
import { Edit } from 'lucide-react'
import EditProject from './pages/EditProject.jsx'
function App() {

  return (
    <div className="App">
       <Toaster position="top-right" />
      <Router>
        <Routes>
          
          <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/projects" element={<Projects />}/>
          <Route path="/projects/new" element={<NewProjects />}/>
          <Route path="/projects/:id/edit" element={<EditProject />}/>
          <Route path="/projects/:id" element={<Project />}/>
          <Route path="/tasks" element={<Tasks />}/>
          </Route>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
