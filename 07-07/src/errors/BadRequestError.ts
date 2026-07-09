import { AppError } from "./AppError";
export class BadRequestError extends AppError {
  constructor(readonly field: string) {
      super(`Requisição incorreta: ${field} inválido`, 409);
  }
}