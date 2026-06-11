import { pool } from "./database";
import express, { Application, Request, Response } from "express";
const app: Application = express();
const PORT: number = 3000;
app.use(express.json());
// post: INSERT
app.post("/livros", async (req: Request, res: Response): Promise<Response> => {
  try {
    const { titulo, autor, ano_lancamento } = req.body;
    const [resultado] = await pool.query(
      "INSERT INTO livros (titulo, autor, ano_lancamento) VALUES (?, ?, ?);",
      [titulo, autor, ano_lancamento]
    );
      return res.status(201).json("Livro cadastrado com sucesso.");
  } catch (error) {
    return res.status(500).json("Erro ao cadastrar livro: " + error);
  }
});
// get: SELECT
app.get("/livros", async (req: Request, res: Response): Promise<Response> => {
  try {
    const [livros] = await pool.query("SELECT * FROM livros;");
    return res.status(200).json(livros);
  } catch (error) {
    return res.status(500).json("Erro ao listar os livros: " + error);
  }
});
// put: UPDATE
app.put(
  "/livros/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { titulo, autor, ano_lancamento } = req.body;
      const [resultado] = await pool.query(
        "UPDATE livros SET titulo = ?, autor = ?, ano_lancamento = ? WHERE id = ?;",
        [titulo, autor, ano_lancamento, id]
      );
    return res.status(200).json("Livro atualizado com sucesso.");
    } catch (error) {
      return res.status(500).json("Erro ao atualizar o livro: " + error);
    }
  }
);
// delete: DELETE
app.delete(
  "/livros/:id",
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const [resultado] = await pool.query(
        "DELETE FROM livros WHERE id = ?;",
        [id]
      );
      return res.status(200).json("Livro deletado com sucesso.");
    } catch (error) {
      return res.status(500).json("Erro ao deletar o livro: " + error);
    }
  }
);
// listen: inicia o servidor para escutar a porta
app.listen(PORT, (): void => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});