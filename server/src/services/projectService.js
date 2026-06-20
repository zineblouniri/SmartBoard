
import {createProject,findProjectById,updateProject, deleteProject,findProjects} from '../models/projectModel.js'
export const addProject = async (name, description, owner_id) => {
    const project = await createProject(name, description, owner_id);
    return project.rows[0]
}

export const getProjectsByOwnerId = async (owner_id) => {
    const projects = await findProjects(owner_id);
    return projects.rows
}

export const getProjectById = async (id, owner_id) => {
    const project = await findProjectById(id, owner_id);
    if(project.rows.length ===0 ){
        throw new Error("Project not found")
    }
    return project.rows[0]
}

export const updateProjectById =  async (id, name, description, owner_id) => {
    const project = await findProjectById(id, owner_id);
    if(project.rows.length === 0) {
        throw new Error("Project not found")
    }
    const updatedProject = await updateProject(id, name , description,  owner_id)
    return updatedProject.rows[0]
}

export const deleteProjectById = async (id, owner_id) => {
    const project = await findProjectById(id, owner_id);
    if(project.rows.length === 0) {
        throw new Error("Project not found")
    }
    const deletedProject = await deleteProject(id, owner_id)
    return deletedProject.rows[0]
}