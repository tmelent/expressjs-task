import { Request, Response } from "express";
import UserService from "../services/UserService";
import { formatError } from "../utils/formatError";
class UserController {
  /**
   * Возвращает данные из файла users.json
   * @param req Request
   * @param res Response
   */
  async getUsers(_: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json(formatError(error.message, 500));
    }
  }

  async create(req: Request, res: Response) {
    try {
      const user = await UserService.create(req.body);
      res.json(user);
    } catch (error) {
      if (
        error.message.toLowerCase().includes("неверно") ||
        error.message.toLowerCase().includes("существует")
      ) {
        res.status(400).json(formatError(error.message, 400));
      } else {
        res.status(500).json(formatError(error.message, 500));
      }
    }
  }
  async update(req: Request, res: Response) {
    try {
      const user = await UserService.update(req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json(formatError(error.message, 400));
    }
  }
}
export default new UserController();
