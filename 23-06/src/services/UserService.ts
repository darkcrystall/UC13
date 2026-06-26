import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../errors/error-handler";
import { User } from "../models/User";
export class UserService {
  private readonly repo = new UserRepository();
  async registerUser(
    nome: string,
    email: string,
    senha: string
  ): Promise<User | null> {
    if (!nome || !email || !senha) {
      throw new AppError("Todos os campos são obrigatórios", 400);
    }
    const userAlreadyExists = await this.repo.findByEmail(email);
    if (userAlreadyExists) {
      throw new AppError("Usuário já existe", 409);
    }
    const user = new User(nome, email, senha);
    return await this.repo.create(user);
  }
  async getAllUsers(): Promise<User[] | null> {
    const users = await this.repo.findAll();
    return users;
  }
  async getUserById(id: number): Promise<User | null> {
    const user = await this.repo.findById(id);
    if (user && user == null) {
      throw new AppError("Nenhum usuário encontrado", 404);
    }
    return user;
  }
  // async updateUser(
  //   id: number,
  //   nome: string,
  //   email: string,
  //   senha: string
  // ): Promise<QueryResult> {
  //   try {
  //     const result = await this.repo.update(id, nome, email, senha);
  //     return result;
  //   } catch {
  //     throw new AppError("Erro ao atualizar o usuário", 500);
  //   }
  // }
  // async deleteUser(id: number): Promise<QueryResult> {
  //   try {
  //     const result = await this.repo.delete(id);
  //     return result;
  //   } catch {
  //     throw new AppError("Erro ao deletar o usuário", 500);
  //   }
  // }
}
