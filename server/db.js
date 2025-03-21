import pkg from 'pg';
const { Pool } = pkg;

export const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "web_midterm",
    password: "12345",
    port: 5432,
});
