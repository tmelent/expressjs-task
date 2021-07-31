import { NextFunction, Request, Response } from "express";

/**
 * Middleware: Выводит скорость выполнения HTTP запроса в консоль
 */
export function logFunctionExecutionTime(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const label = `[${req.method}] ${req.path}`;
  console.time(label);
  res.on("finish", () => {
    console.timeEnd(label);
  });
  next();
}
