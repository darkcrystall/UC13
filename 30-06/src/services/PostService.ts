import { UserRepository } from "../repositories/UserRepository";

export const PostService = {
  async listAll() {
    return UserRepository.findAll();
  },
  async findById(id: number) {
    const post = await UserRepository.findById(id);
  },
};
