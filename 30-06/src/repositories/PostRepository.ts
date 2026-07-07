import { AppDataSource } from "../config/data-source";
import { Post } from "../models/Post";
import { User } from "../models/User";
const repo = AppDataSource.getRepository(Post);
export const PostRepository = {
  async findAll() {
    return repo.find({ relations: ["user"] });
  },
  async findById(id: number) {
    return repo.findOne({ where: { id } });
  },
  async findByUserName(userName: string) {
    return repo.find({
      where: { user: { name: userName } },
      relations: ["user"],
    });
  },
  async create(data: { title: string; user: User }) {
    const post = repo.create(data);
    return repo.save(post);
  },
  async update(id: number, data: { title?: string; user: User }) {
    return repo.update(id, data);
  },
  async delete(id: number) {
    return repo.delete(id);
  },
};