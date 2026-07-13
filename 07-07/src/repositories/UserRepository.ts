import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";
import { CreateUserDTO } from "../schemas/user.schema";
const repo = AppDataSource.getRepository(User);
export const UserRepository = {
  async findAll() {
    return repo.find();
  },
  async findById(id: number) {
    return repo.findOne({ where: { id }, relations: { tasks: true}  });
  },
  async findByEmail(email: string) {
    return repo.findOneBy({ email });
  },
  async create(data: CreateUserDTO) {
    const user = repo.create(data);
    return repo.save(user);
  },
  async save(user: User) {
    return repo.save(user);
  },
  async delete(id: number) {
    return repo.delete(id);
  },
};