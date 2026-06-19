import mysql, { Pool } from "mysql2/promise";
// config: lida com a configuração de conexão com o banco de dados
export const db: Pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "users_db",
});