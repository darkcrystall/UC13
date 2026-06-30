import express, { Application } from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
import { error } from "console";
const app: Application = express();
dotenv.config();
const PORT = process.env.PORT;
AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado com sucesso");
    app.listen(PORT, () => {
      console.log("Servidor rodando");
    });
  })
  .catch((error) => console.log("Erro ao conectar ao banco: " + error));