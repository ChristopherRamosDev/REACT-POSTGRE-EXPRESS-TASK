import { pool } from "../db.js";
import bcrypt from 'bcrypt'
import { sendStatus } from "../libs/requestHandler.js";
import { createAccessToken } from "../libs/jwt.js";
import md5 from "md5";
export const signIng = async (req, res) => {
    const { email, password } = req.body
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email])
    if (result.rowCount === 0) return sendStatus(res, 404, "Usuario no existente")
    const validPassword = await bcrypt.compare(password, result.rows[0].password)
    console.log(result.rows[0]);
    if (!validPassword) return sendStatus(res, 404, "Usuario no existente")
    const token = await createAccessToken({ id: result.rows[0].id })
    res.cookie("token", token, {
        // httpOnly: true,
        //secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return res.send(result.rows[0])
}
export const signUp = async (req, res) => {
    const { name, email, password } = req.body
    const avatar = `https://www.gravatar.com/avatar/${md5(email)}`
    const hasPass = await bcrypt.hash(password, 10)
    const result = await pool.query("INSERT INTO users(name,email,password,avatar) VALUES($1,$2,$3,$4) RETURNING *", [name, email, hasPass, avatar])
    if (result.rowCount === 0) return sendStatus(res, 409, "No se pudo insertar")
    const token = await createAccessToken({ id: result.rows[0].id })
    res.cookie("token", token, {
        // httpOnly: true,
        //secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return res.send(result.rows[0])
}
export const signOut = async (req, res) => {
    res.clearCookie('token')
    return sendStatus(res, 200, "Sesion finalizada")
}
export const profile = async (req, res) => {
    const result = await pool.query("SELECT * FROM USERS where id=$1", [req._sesion])
    return sendStatus(res, 200, "", result.rows[0])
}