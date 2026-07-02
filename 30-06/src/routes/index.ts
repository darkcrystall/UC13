import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validateUser } from "../middlewares/validateUser";
export const router = Router(); // cria o objeto das rotas do express (necessário para criar as rotas)
const userController = new UserController(); // objeto da classe UserController
// USER ROUTES
// para criar uma rota, usamos o objeto router e passamos como parâmetroso caminho e o objeto do controlador que vai ser executado, e os middlewares, se necessário
router.get("/users", userController.list.bind(userController));
router.get("/users/:id", userController.getById.bind(userController));
// chamamos o middleware validateUser
// ele roda antes de criarmos o usuário, para validá-lo
router.post("/users", validateUser, userController.create.bind(userController));