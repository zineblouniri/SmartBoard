import pool from "../config/db.js";

export const createTask = ({
  title,
  description,
  status,
  priority,
  deadline,
  project_id,
  assigned_to,
  owner_id
}) => {
  return pool.query(
    `insert into tasks 
    (title, description, status, priority,deadline,project_id , assigned_to, owner_id) 
    values ($1,$2,$3,$4,$5,$6,$7,$8) returning *`,
    [
      title,
      description,
      status,
      priority,
      deadline,
      project_id || null,
      assigned_to,
      owner_id
    ],
  );
};

export const updateTask = ({
  id,
  title,
  description,
  status,
  priority,
  deadline,
  assigned_to,
  owner_id,
}) => {
  return pool.query(
    `update tasks set title=$1, description = $2, status = $3, 
    priority = $4, deadline = $5, assigned_to = $6
    where id = $7
    and owner_id = $8
     returning *`,
    [title, description, status, priority, deadline, assigned_to, id, owner_id],
  );
};

export const deleteTask = ({ id, owner_id }) => {
  return pool.query(
    `delete from tasks where id = $1 
    and  owner_id = $2
    returning *`,
    [id, owner_id],
  );
};

export const findTaskById = ({ id, owner_id }) => {
  return pool.query(
    "select tasks.* from tasks where tasks.id = $1 and tasks.owner_id = $2",
    [id, owner_id],
  );
};

export const findTasksByProjectId = ({ project_id, owner_id }) => {
  return pool.query(
    "select tasks.* from tasks where tasks.project_id = $1 and tasks.owner_id = $2",
    [project_id, owner_id],
  );
};
export const findTasks = ({ owner_id }) => {
  return pool.query(
    "select * from tasks where owner_id = $1 ",
    [owner_id],
  );
};
