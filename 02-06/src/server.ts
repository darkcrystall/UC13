// importa a pasta express
import express from "express";
/* cria o objeto express, através dele teremos acesso a métodos que nos permitem criar o nosso servidor */
const app = express();
// variável da porta
const PORTA = 3000;
/* aqui informamos que nosso servidor vai receber e enviar dados em JSON */
app.use(express.json());
/* cria a nossa primeira rota: rotas são funções que ao serem chamadas solicitam uma requisição */
// get: rota para solicitar uma informação
// rotas precisam de pelo menos dois parâmetros: o primeiro é o caminho, e o segundo é uma função que é chamada quando a rota é acessada
// essa função também precisa de dois parâmetros: req e res (request e response)
app.get("/servidor", (req, res) => {
    // res.status(200) significa que o servidor vai enviar um código de sucesso 
    // .send("message") é o que envia a resposta
    res.status(200).send("Servidor rodando");
});
/* listen: inicia o servidor, pra ele rodar */
// a função precisa de dois parâmetros: o primeiro é a porta, e o segundo é uma função que será chamada quando o servidor rodar
app.listen(PORTA, () => {
    console.log("O servidor está no ar");
});
// cria rota que retorna o nome
app.get("/nome", (req, res) => {
    res.status(200).send("Eduarda");
});