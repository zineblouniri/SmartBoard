import pool from "../config/db.js";

export const findUserByEmail = async ({email}) => {
    return await pool.query("select * from users where email = $1", [email])
}

export const createUser = async ({name , email, password}) => {
    return await pool.query("insert into users (name, email, password) values ($1,$2,$3) returning *",
        [name, email, password]
     )
}