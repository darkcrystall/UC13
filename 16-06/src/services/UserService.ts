import { QueryResult } from "mysql2";
import { db } from "../config/database";
import { User } from "../models/User";
export class UserService {
  // na camada service, os métodos para trabalhar com o banco de dados são desenvolvidos
  // 1. recebe os dados
  // 2. valida se os dados estão de acordo
  // 3. insere os dados no bancos
  async create(email: string, password: string): Promise<QueryResult> {
    // valida se os campos estão preenchidos
    if (email.length == 0 || password.length == 0) {
      throw new Error("Informações não podem estar vazias");
    }
    const user = new User(email, password);
    const [result] = await db.query(
      "INSERT INTO usuarios (email, password) VALUES (?, ?);",
      [user.getEmail(), user.getPassword()]
    );
    return result;
  }
}