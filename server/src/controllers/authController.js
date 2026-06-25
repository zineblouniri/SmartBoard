import { loginUser, registerUser } from "../services/authService.js";



export const register = async (req, res) => {
    try {
        const {name, email , password} =req.body
        if(!name || !email || !password){
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const user = await registerUser(name, email, password)
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const {email , password} = req.body
        if(!email || !password){
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const user = await loginUser(email, password)
        res.cookie(
            "token",
            user.token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }
        )
        res.status(200).json({ message: "User logged in successfully", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}