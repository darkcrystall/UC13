import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";
// um repository (repositório) é um objeto do TypeORM que contém várias funções necessárias para trabalhar com o banco de dados.
// Pegamos o repositório padrão do TypeORM para a entidade User.
// Esse repositório já sabe fazer find, save, delete, etc, mas vamos
// "envelopar" ele em funções com nomes que fazem mais sentido para as
// regras do nosso projeto.
const repo = AppDataSource.getRepository(User);
export const UserRepository = {
  // vamos criar os métodos que fazem o CRUD do usuário
  // busca todos os usuários
  async findAll() {
    // o método find() vem do TypeORM. Ele procura algo em uma tabela, aceita como parâmetro um objeto com opções para essa busca. Nesse caso, estamos buscando também os posts relacionados a um usuário, ou seja, quando buscarmos um usuário qualquer, o servidor também vai retornar no JSON todos os posts que pertencem a ele. Aqui, retorna todos os usuários com todos os seus posts
    return repo.find({ relations: ["posts"] });
  },
  async findById(id: number) {
    return repo.findOne({ where: { id }, relations: ["posts"] });
  },
  async create(data: User) {
    // cria o usuário
    const user = repo.create(data);
    // salva o usuário o banco
    return repo.save(user);
  },
};