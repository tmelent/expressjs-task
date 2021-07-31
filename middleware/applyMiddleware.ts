import express, { Express } from "express";
import userRouter from "../router/user";
import fileRouter from "../router/file";
import { logFunctionExecutionTime } from "../middleware/logFunctionExecutionTime";
import { isAuth } from "../middleware/isAuth";
import fileUpload from "express-fileupload";

/**
 * Применяет middleware к app
 * @param app Express instance
 */
const applyMiddleware = (app: Express) => {
  app.use(express.json());
  app.use(fileUpload({}));
  app.use(express.static("uploads"));
  app.use(logFunctionExecutionTime);
  app.use("/api/user", isAuth);
  app.use("/api/user", userRouter);
  app.use("/api/file", fileRouter);
};
export default applyMiddleware;
