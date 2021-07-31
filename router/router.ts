import Router from "express";
import UserController from "../controllers/UserController";
const router = Router();

router.get("/", UserController.getUsers);
router.post("/", UserController.create);
router.put("/:id", UserController.update);
router.post('/login', UserController.login)

export default router;
