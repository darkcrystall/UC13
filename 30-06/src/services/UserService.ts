import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import { omitPassword } from "../utils/omitPassword";
// a camada Service é responsável por chamar os métodos do repository e cuidar das validações das nossas regras de negócio (ex: um usuário precisa de um email válido, etc)
// aqui estamos criando uma classe de erro que extende a classe Error. Isso é para permitir que, mais tarde, o Controller identifique o tipo de erro de uma forma mais clara
export class NotFoundError extends Error {}
export const UserService = {
  // como para listar não precisamos validar nada, aqui só chamamos o método repository, pois o controller não pode se comunicar diretamente com o repository, apenas com a service
  async listAll() {
    return UserRepository.findAll();
  },
  async getById(id: number) {
    const user = await UserRepository.findById(id);
    // aqui vai nossa primeira validação: se não encontrarmos um user com esse id, ele não existe. se não existe, lança um erro
    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }
    // se encontrou, não cai no "if", então podemos usar o return e retornar o user
    return user;
  },
  async create(data: { name: string; email: string; password: string }) {
    // este método gera uma senha criptografada
    const hashedPassword = await bcrypt.hash(data.password, 10);
    // isso gera um objeto que é assim:
    /* const user = {
        name: "Usuário",
        email: "email@teste.com",
        password: "senhaComHash"
    } */
    const user = await UserRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    // chamamos o método de repository para salvar esse user no banco
    return omitPassword(user);
  },
};