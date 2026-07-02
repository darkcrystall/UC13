import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  // GET /users -> lista todos os users
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      // é papel do controller chamar os métodos da camada services
      const users = await UserService.listAll();
      // não usamos status, porque ele retorna 200 por padrão
      return res.json(users);
    } catch (error) {
      // next(error) joga o erro para o erroHandler, que decide o status e a mensagem dependendo do erro
      next(error);
    }
  }
  // GET /users/:id -> busca um usuário por id
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id); // pega o id pelos paraâmetros da URL
      const user = await UserService.getById(id);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  // POST /users -> cria um usuário
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.create({ name, email, password });
      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}