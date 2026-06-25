import express, { Application } from "express";
import routes from "./routes/UserRoutes";
const app: Application = express();
app.use(express.json()); // define que a API utiliza JSON (API REST)
app.use("/api", routes);
const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});