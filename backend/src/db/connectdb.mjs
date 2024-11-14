import pkg from "pg";
const { Pool } = pkg;

export const serve = new Pool({
    host: "localhost",
    user: "postgres",
    password: "0000",
    database: "proyect",
    port: "5432",
});

