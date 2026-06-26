import { Response, Request } from "express";
import { UserService } from "../services/UserService";
import { AppError } from "../errors/error-handler";
export class UserController {
  private readonly service: UserService = new UserService();
  constructor() {
    this.service = new UserService();
  }
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.service.getAllUsers();
      return res.status(200).json({ users });
    } catch (err) {
      return res.status(err instanceof AppError ? err.statusCode : 500).json({
        message:
          err instanceof AppError ? err.message : "Erro interno do servidor",
      });
    }
  }
  async registerUser(req: Request, res: Response): Promise<Response> {
    const { nome, email, senha } = req.body;
    try {
      const newUser = await this.service.registerUser(nome, email, senha);
      return res
        .status(201)
        .json({ message: "Usuário criado com sucesso", newUser });
    } catch (err) {
      console.error(err);
      return res.status(err instanceof AppError ? err.statusCode : 500).json({
        message:
          err instanceof AppError ? err.message : "Erro interno do servidor",
      });
    }
  }
}