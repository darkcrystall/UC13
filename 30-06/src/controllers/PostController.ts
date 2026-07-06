import { NextFunction, Request, Response } from "express";
import { PostService } from "../services/PostService";

export class PostController {
  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await PostService.listAll();
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }
  async findByUserName(req: Request, res: Response, next: NextFunction) {
    try {
      const { userName } = req.params;
      if (typeof userName !== "string") {
        throw new Error("Nome de usuário inválido");
      }
      const posts = await PostService.findByUserName(userName);
      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, userId } = req.body;
      const post = await PostService.create({
        title,
        userId,
      });
      return res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await PostService.delete(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}