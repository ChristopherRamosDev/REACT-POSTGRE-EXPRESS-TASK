import pg from "pg";

export const pool = new pg.Pool({
    port: 5432,
    host: 'localhost',
    user: 'postgres',
    password: '123456',
    database:'task-api-react'
})

pool.on('connect', () => {
    console.log('bd ok');
})

