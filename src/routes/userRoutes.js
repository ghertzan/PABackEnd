import { Router } from "express";
import userController from "../controllers/UserController.js";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:uid", userController.getById);

export default router;
