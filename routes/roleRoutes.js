import express from "express";
import * as roleController from "../controllers/roleController.js";

const router = express.Router();

// basic game CRUD
router.post("/", roleController.createRole); // testé
router.get("/", roleController.getAllRoles); // testé
router.get("/:id", roleController.getRoleById); // testé
router.put("/:id", roleController.updateRole); // testé
router.delete("/:id", roleController.deleteRole); // testé

export default router;
