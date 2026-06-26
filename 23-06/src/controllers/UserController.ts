import { Response, Request } from "express";
import { UserService } from "../services/UserService";
import { AppError } from "../errors/error-handler";
export class UserController {
  private service: UserService = new UserService();
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.service.getAllUsers();
      return res.status(200).json({ users });     
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Erro inesperado" });
      }
    }
  }
}