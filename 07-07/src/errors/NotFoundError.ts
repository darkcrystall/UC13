import { AppError } from "./AppError";
export class NotFoundError extends AppError {
  constructor(message: "Não encontrado") {
    super(message, 404);
  }
}