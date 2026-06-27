import api from "./axios";

export const getProjects = async() => {
    const res = await api.get("/projects")
    return res.data
}

export const getProject = async(id) => {
    const res = await api.get(`/projects/${id}`)
    return res.data
}

export const createProject = async (name, description ) => {
    const res = await api.post('/projects', {name, description})
    return res.data
}

export const updateProject = async (id, name, description) => {
    const res = await api.put(`/projects/${id}`, {name, description})
    return res.data
}

export const deleteProject = async (id) => {
    const res = await api.delete(`/projects/${id}`)
    return res.data
}