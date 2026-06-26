import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/connection";
import { User } from "../models/User";

interface IUserRow extends RowDataPacket {
  id: number;
  nome: string;
  email: string;
  senha: string;
}
export class UserRepository {
  async findAll(): Promise<User[] | null> {
    const [rows] = await pool.query<IUserRow[]>("SELECT * FROM users;");
    if (rows.length === 0) {
      return null;
    }
    return rows.map(
      (user) => new User(user.nome, user.email, user.senha, user.id)
    );
  }
  async findById(id: number): Promise<User | null> {
    const [result] = await pool.query<IUserRow[]>(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    if (result.length === 0) {
      return null;
    }
    const user = result[0];
    return new User(
      user.nome,
      user.email,
      user.senha,
      user.id
    );
  }
  async findByEmail(email: string): Promise<User | null> {
    const [result] = await pool.query<IUserRow[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (result.length === 0) {
      return null;
    }
    const user = result[0];
    return new User(
      user.nome,
      user.email,
      user.senha,
      user.id
    );
  }
  async create(user: User): Promise<User | null> {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?);",
      [user.getNome(), user.getEmail(), user.getSenha()]
    );
    if (result.affectedRows === 0) {
      return null;
    }
    return new User(
      user.getNome(),
      user.getEmail(),
      user.getSenha(),
      result.insertId
    );
  }
  async update(user: User): Promise<User | null> {
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE users SET nome = ?, email = ?, senha = ? WHERE id = ?;",
      [user.getNome(), user.getEmail(), user.getSenha(), user.getId()]
    );
    if (result.affectedRows === 0) {
      return null;
    }
    return new User(
      user.getNome(),
      user.getEmail(),
      user.getSenha(),
      user.getId()
    );
  }
  async delete(id: number): Promise<Boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM users WHERE id = ?;",
      [id]
    );
    return result.affectedRows > 0;
  }
}