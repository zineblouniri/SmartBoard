import axios from 'axios'
import React from 'react'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:8080/api/auth/register", {name, email, password})
            console.log(res.data);
            navigate("/login")
        } catch (error) {
            console.error(error);
        }
    } 

  return (
    <div>
      <div>
        <form action="" onSubmit={handleSubmit}>
            <div>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-100 rounded-xl px-2 py-1 outline-none " />
                <input type="email" placeholder="Usename" value={email} onChange={(e) => setEmail(e.target.value)} className="border border-gray-100 rounded-xl px-2 py-1 outline-none " />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-100 rounded-xl px-2 py-1 outline-none " />
            </div>
            <button type="submit" className="bg-blue-500 px-2 py-1 rounded-xl">Register</button>
            <p>Already have an account? <a href="/login">Login</a></p>
        </form>
      </div>
    </div>
  )
}

export default Register
