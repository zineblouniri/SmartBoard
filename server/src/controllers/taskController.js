 
import { createNewTask, deleteTaskById, getTaskByIdService, getTasksByOwnerId, getTasksByProjectId, updateTaskById } from '../services/taskService.js';



export const getTasksProject = async (req ,res) => {
    const owner_id = req.user.id
    const project_id = req.params.projectId
    try {
        const tasks = await getTasksByProjectId({project_id, owner_id});
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getTasks = async (req ,res) => {
    const owner_id = req.user.id
    try {
        const tasks = await getTasksByOwnerId({owner_id});
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getTaskById = async (req,res) => {
    const owner_id = req.user.id
    const task_id = req.params.taskId
    try {
        const task = await getTaskByIdService({id:task_id, owner_id});
        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const createTask =  async (req,res) => {
    const {title, description, status, priority, deadline} = req.body
    const owner_id = req.user.id
    const assigned_to = req.user.id
    const project_id = req.params.projectId
    try {
        const task = await createNewTask({title, description, status, priority, deadline, project_id :project_id || null, assigned_to, owner_id});
        res.status(201).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const updateTask = async(req,res) => {
    const {title, description, status, priority, deadline} = req.body
    const owner_id = req.user.id
    const assigned_to = req.user.id
    const id = req.params.taskId
    try {
        const updatedTask = await updateTaskById({id, title, description, status, priority, deadline, assigned_to, owner_id});
        res.status(200).json(updatedTask);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteTask = async(req,res) => {
    const owner_id = req.user.id
    const taskId = req.params.taskId
    try {
        const deletedTask = await deleteTaskById({id:taskId, owner_id});
        res.status(200).json({ message: "Task deleted successfully" ,task: deletedTask});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error"});
    }
}