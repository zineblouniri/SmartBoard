import api from "./axios";

export const getProjects = async() => {
    const res = await api.get("/projects")
    return res.data
}

export const getProject = async(project_id) => {
    const res = await api.get(`/projects/${project_id}`)
    return res.data
}

export const createProject = async (project ) => {
    const res = await api.post('/projects', project)
    return res.data
}

export const updateProject = async (project) => {
    const res = await api.put(`/projects/${project.id}`, project)
    return res.data
}

export const deleteProject = async (project_id) => {
    const res = await api.delete(`/projects/${project_id}`)
    return res.data
}