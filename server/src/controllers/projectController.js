
import { getProjectsByOwnerId,addProject,updateProjectById,deleteProjectById,getProjectById } from "../services/projectService.js";

export const getProjects = async(req, res) => {
    try {
        const projects = await getProjectsByOwnerId(req.user.id)
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const createProject = async (req, res) => {
    const {name, description}  = req.body
    try {
        if (!name ) {
            return res.status(400).json({ message: "Name is required" });
        }
        const project = await addProject(name, description, req.user.id);
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateProject = async (req, res) => {
    const {id} = req.params
    const {name, description} = req.body
    try {
        if (!name ) {
            return res.status(400).json({ message: "Name is required" });
        }
        const project = await updateProjectById(id, name, description, req.user.id);
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteProject = async (req, res) => {
    const {id} = req.params
    try {
        const deletedProject = await deleteProjectById(id, req.user.id);
         res.status(200).json({ message: "Project deleted successfully", project: deletedProject });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getProject = async (req, res) => {
    const {id} = req.params
    try {
        const project = await getProjectById(id, req.user.id);
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}