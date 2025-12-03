import { Router } from "express";
import petController from "../controllers/PetController.js";

const router = Router();

router.post("/", petController.create);
router.get("/", petController.getAll);
router.get("/:pid", petController.getById);
router.put("/:pid", petController.update);
router.delete("/:id", petController.delete);

export default router;
