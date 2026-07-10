import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import { generateToken } from "../auth/jwt";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { omitPassword } from "../utils/omitPassword";
import { ConflictError } from "../errors/ConflictError";
export const UserService = {
  async listAll() {
    return UserRepository.findAll();
  },
  async getById(id: number) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    return user;
  },
  async create(data: { name: string; email: string; password: string }) {
    const alreadyInUse = await UserRepository.findByEmail(data.email);
    if (alreadyInUse) {
      throw new ConflictError("e-mail", data.email);
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await UserRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    return omitPassword(user);
  },
  async login(data: { email: string; password: string }) {
    const user = await UserRepository.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedError();
    }
    const passwordIsValid = await bcrypt.compare(data.password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedError();
    }
    const token = generateToken({ id: user.id, email: user.email });
    return { user: omitPassword(user), token };
  },
  async update(
    id: number,
    data: { name?: string; email?: string; password?: string }
  ) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new NotFoundError("usuário");
    }
    if (data.name) {
      user.name = data.name;
    }
    if (data.email) {
      user.email = data.email;
    }
    if (data.password) {
      user.password = await bcrypt.hash(data.password, 10);
    }
    const updatedUser = await UserRepository.save(user);
    return omitPassword(updatedUser);
  },
  async delete(id: number) {
    const result = await UserRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundError("usuário");
    }
  },
};