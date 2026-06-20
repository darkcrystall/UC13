import { Request, Response } from "express";
import { UserService } from "../services/UserService";
// controllers: cria os métodos a serem chamadas pelas rotas. aqui, o status do servidor é enviado, as requisições recebidas e as respostas enviadas. depende da camada services
export class UserController {
  private service: UserService = new UserService();
  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        // 400: BAD REQUEST (requisição mal formada)
        return res.status(400).json({ mensagem: "Both fields are required." });
      }
      await this.service.create(email, password);
      // 201: CREATED (criado com sucesso)
      return res.status(201).json({ message: "Sucess: user created." });
    } catch (error) {
      // 500: INTERNAL SERVER ERROR (erro interno do servidor)
      return res.status(500).json({ message: "Error: " + error });
    }
  }
  async listAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.service.findAll();
      // 200: OK (resposta bem sucedida)
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
        // 404: NOT FOUND (não encontrado)
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

      if (!id) {
        return res.status(400).json({ message: "ID is required to update." });
      }

      if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty." });
       }

      const { email, password } = req.body;

      if (!id || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const result = await this.service.update(id, email, password);
      if (!result) {
        return res.status(404).json({ message: "Cannot update this user: user does not exist." });
      }
      return res.status(200).json({ message: "Sucess: user updated." });
    } catch (error) {
      return res.status(500).json({ message: "Error: " + error });
    }
  }
  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const id: number = Number(req.params.id);
      if (!id) {
        return res.status(400).json({ message: "ID is required to delete." });
      }
      const result = await this.service.delete(id);
      if (!result) {
        return res.status(404).json({ message: "Cannot delete this user." });
      }
      // 204: NO CONTENT (sucesso, mas resposta sem corpo)
      return res.status(204).send({ message: "Sucess: user deleted."});
    } catch (error) {
      return res.status(500).json({ message: "Error: " + error });
    }
  }
}