import { Router } from "express";
import UserController from "../controllers/UserController.js";

const router = Router();

router.post("/register", UserController.createUser);

export default router;
