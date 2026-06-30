import express, { Application } from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "./config/data-source";
const app: Application = express();
dotenv.config();
const PORT = process.env.PORT; // pega o valor da variável PORT do .env
// iniciatilize() é um método do TypeORM que abre a conexão com o banco usando a configurações que usamos no data-source. Ele também carrega as entidades e executa a criação das tabelas
// then() -> a função dentro dele será executada se der certo
// catch() -> a função dentro roda se houver erro
AppDataSource.initialize().then(() => {
    console.log("Banco conectado com sucesso");
    app.listen(PORT, () => {
        console.log("Servidor rodando")
    });
}).catch((error) => console.log("Erro ao conectar com o banco: " + error));