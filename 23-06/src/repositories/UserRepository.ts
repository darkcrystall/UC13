import { QueryResult } from "mysql2";
import { pool } from "../config/connection";
import { User } from "../models/User";
export class UserRepository {
  async create(
    nome: string,
    email: string,
    senha: string
  ): Promise<QueryResult> {
    const user = new User(nome, email, senha);
    const [result] = await pool.query(
      "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?);",
      [user.getNome(), user.getEmail(), user.getSenha()]
    );
    return result;
  }
  async findAll(): Promise<QueryResult> {
    const [rows] = await pool.query("SELECT * FROM users;");
    return rows;
  }
  async findById(id: number): Promise<QueryResult> {
    const result = await pool.query("SELECT * FROM users WHERE id = ?;", [id]);
    return result[0];
  }
  async update(
    id: number,
    nome: string,
    email: string,
    senha: string
  ): Promise<QueryResult> {
    const user = new User(nome, email, senha, id);
    const [result] = await pool.query(
      "UPDATE users SET nome = ?, email = ?, senha = ? WHERE id = ?;",
      [user.getNome(), user.getEmail(), user.getSenha(), user.getId()]
    );
    return result;
  }
  async delete(id: number): Promise<QueryResult> {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?;", [id]);
    return result;
  }
}