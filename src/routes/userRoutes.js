import { Router } from "express";
import userController from "../controllers/UserController.js";

const router = Router();

router.get("/", userController.getAllUsers);

export default router;
