import { NextFunction, Request, Response } from "express";
import { formatError } from "../utils/formatError";
import jwt from "jsonwebtoken";
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  // Получение заголовка с токеном
  const authHeader = req.headers.authorization;

  // Возвращение ошибки из middleware
  const returnAuthError = () =>
    res.status(403).json(formatError("Авторизация не пройдена", 403));

  if (!authHeader) {
    returnAuthError();
  } else {
    jwt.verify(
      authHeader.split(" ")[1],
      process.env.JWT_SECRET || "J1598y3*SF*!7351591!*!@*#(asdhfjasdjkig238",
      {
        algorithms: ["HS256"],
      },
      (error, _) => {
        if (error) {
          console.log(error);
          returnAuthError();
        } else {
          next();
        }
      }
    );
  }
};
