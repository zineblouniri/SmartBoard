import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Register from './pages/Register.jsx'
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/register" element={<Register />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
