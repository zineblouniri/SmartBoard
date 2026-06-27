import pool from "../config/db.js";

export const createProject =  ({name, description,owner_id}) => {
    return pool.query("insert into projects (name, description, owner_id) values ($1,$2,$3) returning *",
        [name, description, owner_id]
    )
}

export const findProjectById =  ({id, owner_id}) => {
    return  pool.query("select * from projects where id = $1 and owner_id = $2", [id, owner_id])
}

export const findProjects =  ({owner_id}) => {
    return  pool.query("select * from projects where owner_id = $1 order by created_at desc", [owner_id])
}


export const updateProject = ({id, name, description, owner_id}) => {
    return  pool.query("update projects set name=$1, description = $2 where id = $3 and owner_id = $4 returning *",
        [name, description, id, owner_id]
    )
}

export const deleteProject = ({id, owner_id}) => {
    return  pool.query("delete from projects where id = $1 and owner_id = $2 returning *" ,[id, owner_id])
}