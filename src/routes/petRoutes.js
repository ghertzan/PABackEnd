import { Router } from "express";
import petController from "../controllers/PetController.js";

const router = Router();

router.post("/", petController.createPet);
router.get("/", petController.getAllPets);
router.get("/:pid", petController.getPetById);
router.put("/:pid", petController.updatePet);
router.delete("/:id", petController.deletePet);

export default router;
