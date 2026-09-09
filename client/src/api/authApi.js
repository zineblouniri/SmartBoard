import api from "./axios";

export const register = async( formData) => {
    const res = await api.post("/auth/register", formData)
    return res.data
}

export const login = async( formData) => {
    const res = await api.post("/auth/login", formData)
    return res.data
}

export const getCurrentUser = async (formData) => {
    const res = await api.get("/auth/me", formData)
    return res.data
}