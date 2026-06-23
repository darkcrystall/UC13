import express, { Application } from "express";
const app: Application = express();
app.use(express.json()); // define que a API utiliza JSON (API REST)
const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});