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
3.5. Cria-se a função que gera um token
```ts
export function generateToken(payload: Payload) {
    // o método sign() assina um token. precisa de três argumentos, nessa ordem: o Payload, a Signature do sistema e um objeto que contém o atributo expiresIn, que espera um valor dos segundos que o token expirará  
    return jwt.sign(payload, JWT_SECRET!, { expiresIn: Number(JWT_EXPIRES_IN) });
}
```
3.6. Cria-se a função que verifica um token
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

4. Cria-se uma função que consegue fazer uma busca única, um exemplo é buscar por e-mail.
```ts
async findByEmail(email: string) {
    return repo.findOne({ where: { email }});
}
```

5. No arquivo `UserService.ts` da camada Service:
   5.1. Adicionar uma extensão da classe `Error`, chamando-a de `UnauthorizedError`
```ts
export class UnauthorizedError extends Error {}
```
    5.2. Adicionar método de login, que valida o usuário pelo e-mail e senha desse usuário
```ts
async login(data: { email: string, password: string }) {
    const user = await UserRepository.findByEmail(data.email);
    const isCorrect = await bcrypt.compare(data.password, user.password);
    if (!isCorrect || !user) {
        throw new UnauthorizedError("Não autorizado");
    }
    const token = generateToken({ id: user.id, email: user.email });
    return { user: omitPassword(user), token };
}
```

6. No arquivo `AuthController.ts` da camada Controller: 

```ts 
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService"
```

```ts
export class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const result = await UserService.login({ email, password });
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}
```

7. Na camada Routes, divide-se as rotas de cada entidade, e separando a de autenticação das demais.
    7.1. Em `routes`, cria-se o arquivo `auth.routes.ts`, e então importa-se:
```ts
import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
```
    7.2. Cria-se o objeto `router` e `authController`:
```ts
const router = Router();
const authController = new AuthController();
```
    7.3. Cria-se a rota: 
```ts
router.post("/login", authController.login.bind(authController));
export default router;
```
    7.4. No arquivo principal `index.ts` das rotas, importamos:
```ts
import authRoutes from "./auth.routes";
const router = Router();
router.use("/auth", authRoutes);
export default router;
```