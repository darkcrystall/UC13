import { PostRepository } from "../repositories/PostRepository";
import { UserRepository } from "../repositories/UserRepository";
import { omitPassword } from "../utils/omitPassword";
export const PostService = {
  async listAll() {
    const posts = await PostRepository.findAll();
    return posts.map((post) => ({
      ...post,
      user: omitPassword(post.user),
    }));
  },
  async findByUserName(userName: string) {
    const posts = await PostRepository.findByUserName(userName);
    if (posts.length === 0) {
      throw new Error("Nenhuma postagem encontrada");
    }
    return posts.map((post) => ({
      ...post,
      user: omitPassword(post.user),
    }));
  },
  async findByPostId(id: number) {
    const post = await PostRepository.findByPostId(id);
    if (!post) {
      throw new Error("Não encontrado");
    }
    return { ...post, user: omitPassword(post.user)};
  },
  async listMyPosts(userId: number) {
    const posts = await PostRepository.findByUserId(userId);
    return posts.map((post) => omitPassword(post.user));
  },
  async create(data: { title: string; userId: number }) {
    if (!data.title || !data.userId) {
      throw new Error("É obrigatório especificar todos os campos");
    }
    const createdBy = await UserRepository.findById(data.userId);
    if (!createdBy) {
      throw new Error("Usuário inexistente");
    }
    const post = await PostRepository.create({
      title: data.title,
      user: createdBy,
    });
    return { ...post, user: omitPassword(post.user)};
  },
  async update(id: number, data: { title?: string; userId: number }) {
    const post = await PostRepository.findByPostId(id);
    if (!post) {
      throw new Error("Postagem não encontrada");
    }
    const user = await UserRepository.findById(data.userId);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    if (data.title) {
      post.title = data.title;
    }
    return await PostRepository.update(id, { title: data.title, user: user });
  },
  async delete(id: number) {
    const result = await PostRepository.delete(id);
    if (result.affected === 0) {
      throw new Error("Postagem não encontrada");
    }
  },
};