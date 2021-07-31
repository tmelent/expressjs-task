import Router from "express";
import FileController from "../controllers/FileController";

const fileRouter = Router();

fileRouter.post("/", FileController.upload);
fileRouter.get("/:name", FileController.download);
export default fileRouter;
