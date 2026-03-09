import { Router } from "express";
import passport from "passport";
import mockController from "../controllers/MockControllers.js";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }));

router.get("/mockingpets", mockController.generatePets);
router.get("/mockingusers", mockController.generateUsers);
router.post("/generateData/:users/:pets", mockController.generateData);

export default router;
