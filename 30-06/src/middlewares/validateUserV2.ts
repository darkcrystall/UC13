import { Request, Response, NextFunction } from "express";
import { updateUserSchema } from "../schemas/UserSchema";

export function validateUserV2(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = updateUserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues.map((issue) => issue.message),
    });
  }
  next();
}