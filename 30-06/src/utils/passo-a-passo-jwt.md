### JWT

JWT significa JSON Web Token. Ele é um código gerado e salvo no navegador que guarda as informações de um usuário `{ id: 1, email: "teste@teste.com" }`.
Ele serve para guardar as informações de qual usuário está logado. Assim, não precisamos fazer requisições sem pedir para que logue novamente toda vez. Também podemos garantir que um usuário crie, atualize, delete posts apenas para si mesmo.

O token em si é dividido em três partes. As mais importantes são as duas últimas: o Payload e a Signature. 
O Payload é a parte do meio, onde fica armazenada as informações do usuário.
A Signature é a terceira parte, onde fica armazenadda o "segredo", que é um código que é único por sistema. Ele garante que aquele token pertence a um sistema específico.

Para utilizá-lo:

1. É necessário instalar as dependências:
```bash
npm i jsonwebtoken
npm i @types/jsonwebtoken
```

2. Criar o arquivo `jwt.ts` na pasta `utils`

3. Dentro desse arquivo:
3.1. Importar os módulos necessários 
```ts
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
```
3.2. Carregar as váriaveis do .env, para o objeto process.env
```ts
dotenv.config();
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
``` 
3.3. No env., é necessário ter as variáveis correspondentes
```ts
// variáveis
JWT_SECRET=chave // senha para criar a signature
JWT_EXPIRES_IN=86400 // tempo em segundos que o token expirará
```
3.4. No arquivo `jwt.ts`, teremos a interface Payload que determina o que a chave esperará receber nesse campo
```ts
interface Payload { id: number; email: string }
```
3.5. Criação da função que gera um token
```ts
export function generateToken(payload: Payload) {
    // o método sign() assina um token. precisa de três argumentos, nessa ordem: o Payload, a Signature do sistema e um objeto que contém o atributo expiresIn, que espera um valor dos segundos que o token expirará  
    return jwt.sign(payload, JWT_SECRET!, { expiresIn: Number(JWT_EXPIRES_IN) });
}
```
3.6. Criação a função que verifica um token
```ts
export function verifyToken() {
    try {
        // o método verify() irá analisar o token. precisa de dois argumentos, nessa ordem: o token e a Signature do sistema
        return jwt.verify(token, JWT_SECRET!);
    } catch {
        return null;
    }
}
```