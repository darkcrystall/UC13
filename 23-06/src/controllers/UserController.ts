import { Response, Request } from "express";
import { UserService } from "../services/UserService";
import { AppError } from "../errors/error-handler";
export class UserController {
  private service: UserService;
  async getAll(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const users = await this.service.getAllUsers();
      return res.status(200).json({ users });     
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      }
    }
  }
}