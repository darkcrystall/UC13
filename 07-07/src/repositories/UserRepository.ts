import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";
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
  async create(data: any) {
    const user = repo.create(data);
    return repo.save(user);
  },
  async save(user: User) {
    return repo.save(user);
  },
  async delete(user: User) {
    return repo.remove(user);
  },
};