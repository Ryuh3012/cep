import pkg from "pg";
import { dbName, dbPassword, dbPort, dbUrl, dbUser } from "../config/config.mjs";
const { Pool } = pkg;

export const connectdb = new Pool({
    host: dbUrl,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    port: dbPort,
});

connectdb.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      console.log(result.rows);
    });
  });
