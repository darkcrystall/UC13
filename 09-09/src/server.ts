// conteúdo da aula 02/06 com tipagem explícita
import express, { Application, Request, Response } from "express";
import { pool } from "./database";
/* A variável app recebe a instância do express. Ou seja, dentro dele agora temos um objeto que, quando chamado, 
dá acesso a vários métodos diferentes que vamos precisar para criar nosso servidor backend */
const app: Application = express();
/* Identifica em que porta nosso servidor escutará as requisições */
const PORT: number = 3000;
/* Estamos dizendo que nosso servidor vai utilizar e se comunicar, nas requisições e respostas, usando JSON */
app.use(express.json());
/* Rotas são métodos especiais, que são chamados para fazer uma determinada requisição. Cada uma tem um métdo HTTP (GET, POST, PUT, DELETE)
O método, no express, é feito dessa forma: app.metodoHTTP("caminho", () => {}) */
/* O primeiro argumento é o caminho para executar a rota, e o segundo é a função executada quando chamamos essa rota */
/* Método GET: busca uma informação */
/* req é o objeto da requisição, e res é o objeto da resposta */
app.get("/mensagem", (req: Request, res: Response): void => {
  res.status(200).send("Mensagem");
});
app.get("/meunome", (req: Request, res: Response): void => {
  res.status(200).send("Meu nome é Eduarda");
});
/* INSERT: inserir usuários */
app.post(
  "/usuarios",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { nome, email, senha } = req.body; // essas informações vem do corpo da requisição
      const [resultado] = await pool.query(
        "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?);",
        [nome, email, senha]
      );
      // staus 201: dado criado com sucesso
      return res.status(201).json("Usuário criado com sucesso");
    } catch (error) {
      return res.status(500).json("Erro ao criar usuário: " + error);
    }
  }
);
/* SELECT: listar usuários */
app.get("/usuarios", async (req: Request, res: Response): Promise<Response> => {
  // tenta fazer a consulta no banco
  try {
    // query("consultaSQL") é um método da biblioteca do mysql2 que executa comandos SQL. Neste caso, estamos fazendo um SELECT * armazenando as informações na variável usuários
    const [usuarios] = await pool.query("SELECT * FROM usuarios;");
    // retorna o resultado com status 200 (ok) no formato JSON
    return res.status(200).json(usuarios);
  } catch (error) {
    // se der errado, mostra o erro
    // status 500 siginifca erro de servidor
    return res.status(500).json("Erro ao buscar usuários: " + error);
  }
});
/* UPDATE: atualizar usuários */
app.put(
  "/usuarios/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { nome, email, senha } = req.body; // essas informações vem do corpo da requisição
      const [resultado] = await pool.query(
        "UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?;",
        [nome, email, senha, id]
      );
      return res.status(200).json("Usuário atualizado com sucesso");
    } catch (error) {
      return res.status(500).json("Erro ao atualizar usuário: " + error);
    }
  }
);
/* DELETE: remover usuários */
app.delete(
  "/usuarios/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const [resultado] = await pool.query(
        "DELETE FROM usuarios WHERE id = ?;",
        [id]
      );
      return res.status(200).json("Usuário deletado com sucesso");
    } catch (error) {
      return res.status(500).json("Erro ao deletar usuário: " + error);
    }
  }
);
/* listen() é o método dp express para colocar nosso servidor no ar. Ele precisa que passamos dois argumentos */
/* O primeiro é a porta, e o segundo é uma função que vai ser executada quando o servidor estiver no ar */
app.listen(PORT, (): void => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});