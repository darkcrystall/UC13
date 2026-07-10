import { NextFunction, Request, Response } from "express";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { BadRequestError } from "../errors/BadRequestError";
export function validateUserCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = createUserSchema.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(`${result.error}`);
  }
  next();
}
export function validateUserUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = updateUserSchema.safeParse(req.body);
  if (!result.success) {
    throw new BadRequestError(`${result.error}`);
  }
  next();
}