import pool from '../config/db.js';

export const getTasks = async (req ,res) => {
    try {
        const tasks = await pool.query("select * from tasks where project_id = $1 order by created_at desc", [req.params.projectId]);
        res.status(200).json(tasks.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getTaskById = async (req,res) => {
    try {
        const task = await pool.query("select * from tasks where id=$1 and project_id = $2", [req.params.taskId, req.params.projectId]);
        if (task.rows.length === 0) {
        return res.status(404).json({
            message: "Task not found"
        });
}
        res.status(200).json(task.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const createTask =  async (req,res) => {
    const {title, description, status, priority, deadline} = req.body
    try {
        const task = await pool.query("insert into tasks (title, description, status, priority, deadline, project_id, assigned_to) values ($1,$2,$3,$4,$5,$6,$7) returning *", [title, description, status, priority, deadline, req.params.projectId, req.user.id]);
        res.status(201).json(task.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const updateTask = async(req,res) => {
    const {title, description, status, priority, deadline} = req.body

    try {
        const existingTask = await pool.query("select * from tasks where id = $1 and project_id = $2", [req.params.taskId, req.params.projectId]);
        if (existingTask.rows.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        const updatedTask = await pool.query("update tasks set title=$1, description = $2, status = $3, priority = $4, deadline = $5 where id = $6 and project_id = $7 returning *", [title, description, status, priority, deadline, req.params.taskId, req.params.projectId]);
        res.status(200).json(updatedTask.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteTask = async(req,res) => {
    try {
        const existingTask = await pool.query("select * from tasks where id = $1 and project_id = $2", [req.params.taskId, req.params.projectId]);
        if (existingTask.rows.length === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        const deletedTask = await pool.query("delete from tasks where id = $1 and project_id = $2 returning *", [req.params.taskId, req.params.projectId]);
        res.status(200).json({ message: "Task deleted successfully" ,task: deletedTask.rows[0]});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}