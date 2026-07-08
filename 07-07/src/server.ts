import express, { Application } from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import { ensureDatabaseExists } from "./config/ensure-database";
const app: Application = express();
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT;
async function initializeServer() {
  await ensureDatabaseExists();
  await AppDataSource.initialize();
  console.log("Banco conectado com sucesso");
  app.listen(PORT, () => console.log("Servidor rodando"));
}
initializeServer().catch((error) =>
  console.log("Erro ao se conectar: " + error)
);