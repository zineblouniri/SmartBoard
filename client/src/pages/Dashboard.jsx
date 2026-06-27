import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
  const [projects, setProjects] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const getprojects = async() => {
    try {
      const res = await axios.get("http://localhost:8080/api/projects",  {
        withCredentials: true,
    })
      setProjects(res.data)
    } catch (error) {
      console.error(error);
    }
  }
  getprojects()
  },[])
  return (
    <div>
      <div>
        <h1>Projects : {projects.length}</h1> 
      </div>
      <div>

      </div>
      <div>
        <button onClick={() => navigate("/login")}>logout</button>
      </div>
    </div>
  )
}

export default Dashboard
