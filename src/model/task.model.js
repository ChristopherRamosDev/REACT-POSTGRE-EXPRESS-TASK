import { pool } from "../db.js"
export const createTaskModel = async (title, description, user_id) => {
    const result = await pool.query(
        "INSERT INTO tasks (title, description,user_id) VALUES ($1, $2,$3) RETURNING *",
        [title, description, user_id]
    );
    return result.rows[0]
}