import mysql, { Pool } from "mysql2/promise";
export const pool: Pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "meu_db",
});