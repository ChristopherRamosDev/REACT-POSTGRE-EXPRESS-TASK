// task.controller.js
import { pool } from "../db.js";
import { sendStatus } from "../libs/requestHandler.js";
import { createTaskModel } from "../model/task.model.js";

export const getAllTasks = async (req, res, next) => {
    console.log(req._sesion);
    const result = await pool.query('SELECT * FROM tasks WHERE user_id=$1', [req._sesion]);
    return sendStatus(res, 200, "", result.rows);
};
export const getTask = async (req, res) => {
    const id = req.params.id
    const result = await pool.query('SELECT * FROM tasks WHERE id=$1', [id])
    if (result.rows.length < 1) return sendStatus(res, 404, 'No existe tarea con ese id')
    return sendStatus(res, 200, "", result.rows[0])
}
export const createTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const result = await createTaskModel(title, description, req._sesion)
        return res.json(result)
    } catch (error) {
        if (error.code === '23505') {
            return sendStatus(res, 409, 'Tarea ya creada')
        }
        next(error)
    }
}
export const updateTask = async (req, res) => {
    const id = req.params.id
    const { title, description } = req.body
    if (title == undefined || description == undefined) return sendStatus(res, 409, "Faltan title y description")
    const result = await pool.query("UPDATE tasks set title = $1 ,description = $2 WHERE id = $3", [title, description, id])
    if (result.rowCount === 0) return sendStatus(res, 404, "El id no existe")
    return sendStatus(res, 200, "Actualizado correctamente")
}
export const deleteTask = async (req, res) => {
    const id = req.params.id
    const result = await pool.query("DELETE FROM tasks WHERE id=$1", [id])
    if (result.rowCount === 0) return sendStatus(res, 404, 'No existe tarea con ese id')
    return sendStatus(res, 200, "Eliminado correctamente")
}