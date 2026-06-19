import express, { Application } from "express";
import router from "./routes/UserRoutes";
const PORT: number = 3000;
const app: Application = express();
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});