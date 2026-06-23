import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("") 
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post("http://localhost:8080/api/auth/login", {email, password})
        console.log(res.data);
        navigate("/dashboard")
    }
  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col items-center justify-center">
        <h1>Login</h1>
        <div className="flex flex-col items-center">
            <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border borer-gray-100 rounded-xl px-2 py-1 outline-none " />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="bg-blue-500 px-2 py-1 rounded_xl">Login</button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default Login
