import { Router } from "express";
import { UserController } from "../controllers/UserController";
const router: Router = Router();
const controller: UserController = new UserController();
// GET route (all)
router.get("/users", (req, res): void => {
  controller.listAll(req, res);
});
// GET route (by id)
router.get("/users/:id", (req, res): void => {
  controller.getUser(req, res);
});
// POST route
router.post("/users", (req, res): void => {
  controller.createUser(req, res);
});
// PUT route
router.put("/users", (req, res): void => {
  controller.updateUser(req, res);
});
// DELETE route
router.delete("/users", (req, res): void => {
  controller.deleteUser(req, res);
});
export default router;