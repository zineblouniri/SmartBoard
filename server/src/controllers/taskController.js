 
import { createNewTask, deleteTaskById, getTaskByIdService, getTasksByOwnerId, getTasksByProjectId, updateTaskById } from '../services/taskService.js';



export const getTasksProject = async (req ,res) => {
    try {
        const tasks = await getTasksByProjectId(req.params.projectId, req.user.id);
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getTasks = async (req ,res) => {
    try {
        const tasks = await getTasksByOwnerId(req.user.id);
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getTaskById = async (req,res) => {
    try {
        const task = await getTaskByIdService(req.params.taskId, req.user.id);
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
    try {
        const task = await createNewTask(title, description, status, priority, deadline, req.params.projectId, assigned_to, owner_id);
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
    try {
        const updatedTask = await updateTaskById(req.params.taskId, title, description, status, priority, deadline, assigned_to, owner_id);
        res.status(200).json(updatedTask);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteTask = async(req,res) => {
    try {
        const deletedTask = await deleteTaskById(req.params.taskId, req.user.id);
        res.status(200).json({ message: "Task deleted successfully" ,task: deletedTask});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}