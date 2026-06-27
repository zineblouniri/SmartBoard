import {findUserByEmail, createUser} from "../models/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async ({name, email, password}) => {
    const existingUser = await findUserByEmail({email});
    if (existingUser.rows.length > 0) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user =  await createUser({name, email, hashedPassword});
    return user.rows[0];
}

export const loginUser = async({email, password}) => {
    const user = await findUserByEmail({email});
    if(user.rows.length ===0){
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password)
    if(!isMatch){
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign({id:user.rows[0].id}, process.env.JWT_SECRET, {expiresIn:"1d"});
    return {token, name:user.rows[0].name, email:user.rows[0].email};
}