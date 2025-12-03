import { Router } from "express";
import adoptionController from "../controllers/AdoptionController.js";

const router = Router();

router.post("/:pid/user/:uid", adoptionController.create);
router.get("/", adoptionController.getAll);
router.get("/:aid", adoptionController.getById);

export default router;
