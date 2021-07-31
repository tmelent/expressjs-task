import Router from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.get("/user", UserController.getUsers);
router.post("/user", UserController.create);
router.put("/user/:id", UserController.update);

export default router;
