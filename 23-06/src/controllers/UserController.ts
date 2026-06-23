import { Response, Request } from "express";
import { UserService } from "../services/UserService";
export class UserController {
  async getAll(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ users: "" });
  }
}