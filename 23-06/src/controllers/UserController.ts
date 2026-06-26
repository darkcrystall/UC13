import { Response, Request } from "express";
import { UserService } from "../services/UserService";
export class UserController {
  private readonly service: UserService = new UserService();
  constructor() {
    this.service = new UserService();
  }
  async getAll(req: Request, res: Response): Promise<Response> {
    const users = await this.service.getAllUsers();
    return res.status(200).json({ users });
  }
  async registerUser(req: Request, res: Response): Promise<Response> {
    const { nome, email, senha } = req.body;
    const newUser = await this.service.registerUser(nome, email, senha);
    return res
      .status(201)
      .json({ message: "Usuário criado com sucesso", newUser });
  }
}