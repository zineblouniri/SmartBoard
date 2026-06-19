import pool from '../config/db.js';

export const getProjects = async(req, res) => {
    try {
        const projects = await pool.query("select * from projects where owner_id = $1", [req.user.id])
        res.status(200).json(projects.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const createProject = async (req, res) => {
    const {name, description}  = req.body
    try {
        if (!name || !description) {
            return res.status(400).json({ message: "Name or description are required" });
        }
        const project = await pool.query("insert into projects (name, description , owner_id) values ($1,$2,$3) returning id, name, description, owner_id, created_at, updated_at",
        [name, description, req.user.id]
        )
        res.status(201).json(project.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const updateProject = async (req, res) => {
    const {id} = req.params
    const {name, description} = req.body
    try {
        const projectExists = await pool.query("select * from projects where id = $1 and owner_id = $2", [id, req.user.id])
        if (projectExists.rows.length === 0) {
            return res.status(404).json({ message: "Project not found" });
        }
        const project = await pool.query("update projects set name= $1, description = $2 where id = $3 and owner_id = $4 returning *",
        [name, description, id, req.user.id]
        )
        res.status(200).json(project.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteProject = async (req, res) => {
    const {id} = req.params
    try {
        const projectExists = await pool.query("select * from projects where id = $1 and owner_id = $2", [id, req.user.id])
        if (projectExists.rows.length === 0) {
            return res.status(404).json({ message: "Project not found" });
        }
        const deleteProject = await pool.query("delete from projects where id=$1 and owner_id = $2 returning *", [id, req.user.id])
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getProjectById = async (req, res) => {
    const {id} = req.params
    try {
        const project = await pool.query("select * from projects where id = $1 and owner_id = $2", [id, req.user.id])
        if (project.rows.length === 0) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}