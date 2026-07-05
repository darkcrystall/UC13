import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validateUser } from "../middlewares/validateUser";
import { validateUserFields } from "../middlewares/validateUserFields";
import { validateId } from "../middlewares/validateId";
export const router = Router(); // cria o objeto das rotas do express (necessário para criar as rotas)
const userController = new UserController(); // objeto da classe UserController
// USER ROUTES
// para criar uma rota, usamos o objeto router e passamos como parâmetroso caminho e o objeto do controlador que vai ser executado, e os middlewares, se necessário
// .bind(userController) garante que o "this" dentro do método continue apontando pra instância certa quando o Express chamar essa função
router.get("/users", userController.list.bind(userController));
router.get(
  "/users/:id",
  validateId,
  userController.getById.bind(userController)
);
// validateUser roda primeiro: se os dados estiverem inválidos, a requisição já é interrompida ali, sem nem chegar ao Controller
router.post(
  "/users",
  validateUser,
  validateUserFields,
  userController.create.bind(userController)
);
router.put(
  "/users/:id",
  validateId,
  validateUserFields,
  userController.update.bind(userController)
);
router.delete(
  "/users/:id",
  validateId,
  userController.delete.bind(userController)
);