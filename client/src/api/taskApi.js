import api from "./axios";

export const getTasks = async () => {
    const res = await api.get("/tasks")
    return res.data
}

export const getTasksProject = async (project_id) => {
    const res = await api.get(`/tasks/project/${project_id}`)
    return res.data
}

export const getTaskById = async (task_id) => {
    const res = await api.get(`/tasks/${task_id}`)
    return res.data
}

export const createTask = async (task) => {
    const res = await api.post(`/tasks/project/${task.project_id}`,task)
    return res.data
}

export const updateTask = async(task) => {
    const res = await api.put(`/tasks/${task.id}`,task)
    return res.data
}

export const deleteTask = async (task_id) => {
    const res = await api.delete(`/tasks/${task_id}`)
    return res.data
}