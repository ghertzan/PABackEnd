import { Router } from "express";
import adoptionController from "../controllers/AdoptionController.js";

const router = Router();

router.post("/:pid/user/:uid", adoptionController.createAdoption);
router.get("/", adoptionController.getAllAdoptions);
router.get("/:aid", adoptionController.getAdoptionById);

export default router;
