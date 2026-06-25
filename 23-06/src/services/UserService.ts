import { QueryResult } from "mysql2";
import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "../errors/error-handler";
import { User } from "../models/User";
export class UserService {
  private repo = new UserRepository();
  async registerUser(
    nome: string,
    email: string,
    senha: string
  ): Promise<User | null> {
    try {
      const userAlreadyExists = this.repo.findByEmail(email);
      if (userAlreadyExists != null) {
        throw new AppError("E-mail já cadastrado", 409); // 409: CONFLICT
      }
      const user: User = new User(nome, email, senha);
      const newUser = await this.repo.create(user);
      if (newUser == null) {
        throw new AppError("Erro ao cadastrar usuário", 500);
      }
      return newUser;
    } catch {
      throw new AppError("Algo deu errado", 500);
    }
  }
  async getAllUsers(): Promise<User[] | null> {
    try {
      const users = await this.repo.findAll();
      if (users && users == null) {
        throw new AppError("Nenhum usuário cadastrado", 404);
      }
      return users;
    } catch {
      throw new AppError("Erro ao buscar dados", 500);
    }
  }
  async getUserById(id: number): Promise<User| null> {
    try {
      const user = await this.repo.findById(id);
      if (user && user == null) {
        throw new AppError("Nenhum usuário encontrado", 404);
      }
      return user;
    } catch {
      throw new AppError("Erro ao encontrar o usuário", 500);
    }
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