import * as env from "dotenv";
import jwt from "jsonwebtoken";
import { Payload } from "./IPayload";
env.config();
export function generateToken(payload: Payload) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN),
  });
}
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    return null;
  }
}