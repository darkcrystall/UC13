import express, { Application } from "express";
import router from "./routes/UserRoutes";
const app: Application = express();
app.use(express.json());
app.use(router);
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
});