import { UserController } from "../controllers/UserController";
import { Router } from "express";
const controller = new UserController();
const routes = Router();
routes.get("/users", controller.getAll);
export default routes;