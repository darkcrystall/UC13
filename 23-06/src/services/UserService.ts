import { QueryResult } from "mysql2";
import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../errors/error-handler";
export class UserService {
  private repo = new UserRepository();
  async registerUser(
    nome: string,
    email: string,
    senha: string
  ): Promise<QueryResult> {
    try {
      const user = await this.repo.create(nome, email, senha);
      return user;
    } catch {
      throw new AppError("Erro ao registrar o usuário", 500);
    }
  }
  async getAllUsers(): Promise<QueryResult> {
    try {
      const users = await this.repo.findAll();
      return users;
    } catch {
      throw new AppError("Erro ao buscar dados", 500);
    }
  }
  async getUserById(id: number) {
    try {
      const user = await this.repo.findById(id);
    } catch {
      throw new AppError("Erro ao encontrar o usuário", 500);
    }
  }
  async updateUser(
    id: number,
    nome: string,
    email: string,
    senha: string
  ): Promise<QueryResult> {
    try {
      const result = await this.repo.update(id, nome, email, senha);
      return result;
    } catch {
      throw new AppError("Erro ao atualizar o usuário", 500);
    }
  }
  async deleteUser(id: number): Promise<QueryResult> {
    try {
      const result = await this.repo.delete(id);
      return result;
    } catch {
      throw new AppError("Erro ao deletar o usuário", 500);
    }
  }
}