
import { getProjectsByOwnerId,addProject,updateProjectById,deleteProjectById,getProjectById } from "../services/projectService.js";

export const getProjects = async(req, res) => {
    const owner_id = req.user.id;
    try {
        const projects = await getProjectsByOwnerId({owner_id})
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const createProject = async (req, res) => {
    const {name, description}  = req.body
    const owner_id = req.user.id;
    try {
        if (!name ) {
            return res.status(400).json({ message: "Name is required" });
        }
        const project = await addProject({name, description,owner_id});
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateProject = async (req, res) => {
    const project_id = req.params.id;
    const {name, description} = req.body
    const owner_id = req.user.id;
    try {
        if (!name ) {
            return res.status(400).json({ message: "Name is required" });
        }
        const project = await updateProjectById({project_id, name, description, owner_id});
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteProject = async (req, res) => {
    const project_id = req.params.id;
    const owner_id = req.user.id;
    try {
        const deletedProject = await deleteProjectById({project_id, owner_id});
         res.status(200).json({ message: "Project deleted successfully", project: deletedProject });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getProject = async (req, res) => {
    const project_id = req.params.id;
    const owner_id = req.user.id;
    try {
        const project = await getProjectById({project_id, owner_id});
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}