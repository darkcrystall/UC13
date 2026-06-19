import { QueryResult } from "mysql2";
import { db } from "../config/database";
import { User } from "../models/User";
export class UserService {
  // services: os métodos para trabalhar com o banco de dados são desenvolvidos. nessa camada, as regras de negócio e validações devem ser garantidas
  // 1. recebe os dados
  // 2. valida se os dados estão de acordo
  // 3. insere os dados no banco de dados
  async create(email: string, password: string): Promise<QueryResult> {
    // valida se os campos estão preenchidos
    if (email.length == 0 || password.length == 0) {
      throw new Error("The fields cannot be empty.");
    }
    // CREATE
    const user: User = new User(email, password);
    const [result] = await db.query(
      "INSERT INTO users (email, password) VALUES (?, ?);",
      [user.getEmail(), user.getPassword()]
    );
    return result;
  }
  // READ
  async findAll(): Promise<QueryResult> {
    const [rows] = await db.query("SELECT * FROM users;");
    return rows;
  }
  // READ
  async findById(id: number): Promise<QueryResult> {
    const [rows]: any = await db.query("SELECT * FROM users WHERE id = ?;", [
      id,
    ]);
    return rows[0];
  }
  // UPDATE
  async update(
    id: number,
    email: string,
    password: string
  ): Promise<boolean> {
    const [result]: any = await db.query(
      "UPDATE users SET email = ?, password = ? WHERE id = ?;",
      [email, password, id]
    );
    return result.affectedRows > 0;
  }
  // DELETE
  async delete(id: number): Promise<boolean> {
    const [result]: any = await db.query("DELETE FROM users WHERE id = ?;", [id]);
    return result.affectedRows > 0;
  }
}