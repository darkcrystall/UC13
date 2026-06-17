import { Request, Response } from "express";
import { UserService } from "../services/UserService";
export class UserController {
  private service: UserService = new UserService();
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ mensagem: "Both fields are required." });
      }
      await this.service.create(email, password);
      return res.status(201).json({ message: "Sucess: user created." });
    } catch (error) {
      return res.status(500).json({ message: "Error: " + error });
    }
  }
  async listAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.service.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Error: " + error });
    }
  }
  async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const user = await this.service.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Error: " + error });
    }
  }
  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const { email, password } = req.body;
      const result = await this.service.update(id, email, password);
      if (!result) {
        return res.status(400).json({ message: "Cannot update this user." });
      }
      return res.status(200).json({ message: "Sucess: user updated." });
    } catch (error) {
      return res.status(500).json({ message: "Error: " + error });
    }
  }
  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      const result = await this.service.delete(id);
      if (!result) {
        return res.status(400).json({ message: "Cannot delete this user." });
      }
      return res.status(200).json({ message: "Sucess: user deleted." });
    } catch (error) {
      return res.status(500).json({ message: "Error: " + error });
    }
  }
}