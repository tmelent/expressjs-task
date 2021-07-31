import Router from "express";
import UserController from "../controllers/UserController";
const userRouter = Router();

userRouter.get("/", UserController.getUsers);
userRouter.post("/", UserController.create);
userRouter.put("/:id", UserController.update);
userRouter.post("/login", UserController.login);

export default userRouter;
