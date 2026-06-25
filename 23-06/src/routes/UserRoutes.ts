import { UserController } from "../controllers/UserController";
import { Router } from "express";
const controller = new UserController();
const routes = Router();
routes.get("/users", (req, res) => {
  controller.getAll(req, res);
});
export default routes;