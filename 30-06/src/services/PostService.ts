import { PostRepository } from "../repositories/PostRepository";
import { UserRepository } from "../repositories/UserRepository";
export const PostService = {
  async listAll() {
    return PostRepository.findAll();
  },
  async findByUserName(userName: string) {
    const result = await PostRepository.findByUserName(userName);
    if (result.length === 0) {
      throw new Error("Nenhuma postagem encontrada");
    }
    return result;
  },
  async create(data: { title: string; userId: number }) {
    const createdBy = await UserRepository.findById(data.userId);
    if (!createdBy) {
      throw new Error("Usuário inexistente");
    }
    return PostRepository.create({ title: data.title, user: createdBy });
  },
  async delete(id: number) {
    const result = await PostRepository.delete(id);
    if (result.affected === 0) {
      throw new Error("Postagem não encontrada");
    }
  },
};