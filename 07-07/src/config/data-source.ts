import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import "reflect-metadata";
import { User } from "../models/User";
import { Task } from "../models/Task";

dotenv.config();
const { DB_HOST, DB_PORT, DB_USER, DB_PWD, DB_NAME } = process.env;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PWD,
  database: DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Task],
});