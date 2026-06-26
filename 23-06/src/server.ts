import express, { Application } from "express";
import routes from "./routes/UserRoutes";
import { errorMiddleware } from "./middlewares/ErrorMiddleware";
const app: Application = express();
app.use(express.json()); // define que a API utiliza JSON (API REST)
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);
app.use(errorMiddleware);
const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});