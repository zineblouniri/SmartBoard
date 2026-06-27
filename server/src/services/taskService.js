import { findProjectById } from "../models/projectModel.js"
import { createTask, deleteTask, findTaskById, findTasks, findTasksByProjectId, updateTask } from "../models/taskModel.js"



export const createNewTask = async({title, description, status, priority, deadline, project_id, assigned_to,owner_id}) =>{
    const existingProject = await findProjectById({project_id, owner_id})
    if(existingProject.rows.length === 0 ){
        throw new Error("Project not found")
    }
    const task = await createTask({title, description, status, priority, deadline, project_id, assigned_to})
    return task.rows[0]
}
export const getTasksByOwnerId = async ({owner_id}) => {
    const tasks = await findTasks({owner_id})
    return tasks.rows
}

export const getTasksByProjectId = async ({project_id, owner_id}) => {
    const tasks = await findTasksByProjectId({project_id, owner_id})
    return tasks.rows
}

export const getTaskByIdService = async({id, owner_id}) => {
    const task = await findTaskById({id, owner_id})
    if(task.rows.length === 0){
        throw new Error("Task not found")
    }
    return task.rows[0]
}

export const updateTaskById = async ({id, title, description, status, priority, deadline, assigned_to, owner_id}) =>{
    const existingTask = await findTaskById({id, owner_id})
    if(existingTask.rows.length === 0){
        throw new Error("Task not found")
    }
    const updatedTask = await updateTask({id, title, description, status, priority, deadline, assigned_to, owner_id})
    return updatedTask.rows[0]
}

export const deleteTaskById = async({id, owner_id}) =>{
    const existingTask = await findTaskById({id, owner_id})
    if(existingTask.rows.length === 0){
        throw new Error("Task not found")
    }
    const deletedTask = await deleteTask({id, owner_id})
    return deletedTask.rows[0]
}