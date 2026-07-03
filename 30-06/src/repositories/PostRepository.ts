import { AppDataSource } from "../config/data-source";
import { Post } from "../models/Post";
import { UserRepository } from "./UserRepository";
const repo = AppDataSource.getRepository(Post);
export const PostRepository = {
  async findAll() {
    return repo.find({ relations: ["users"] });
  },
  async findByUser(id: number) {
    const posts = await UserRepository.findById(id);
    return repo.findOne({ where: { id }, relations: ["users"] });
  },
  async create(data: { title: string }) {
    const post = repo.create(data);
    return repo.save(post);
  },
  async delete(id: number) {
    return repo.delete(id);
  },
};