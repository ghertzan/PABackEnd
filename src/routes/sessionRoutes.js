import { Router } from "express";
import UserController from "../controllers/UserController.js";
import SessionController from "../controllers/Session.controller.js";
import passport from "passport";
const router = Router();

router.post("/register", UserController.createUser);
router.post("/login", passport.authenticate("login"), SessionController.login);
router.delete("/logout", SessionController.logout);
router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	SessionController.current
);

export default router;
