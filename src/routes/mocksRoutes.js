import { Router } from "express";
import mockController from "../controllers/MockControllers.js";

const router = Router();

router.get("/mockingpets", mockController.generatePets);

router.get("/mockingusers", mockController.generateUsers);

router.post("/generateData/:users/:pets", mockController.generateData);

export default router;
