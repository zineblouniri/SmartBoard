import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Register from './pages/Register.jsx'
import Projects from './pages/Projects.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Tasks from './pages/Tasks.jsx'
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/projects" element={<Projects />}/>
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
