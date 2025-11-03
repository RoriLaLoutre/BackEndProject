import express from "express";
import * as gameController from "../controllers/gameController.js";

const router = express.Router();

// basic game CRUD
router.post("/", gameController.createGame); // testé
router.get("/", gameController.getAllGames); // testé
router.get("/:id", gameController.getGameById); // testé
router.put("/:id", gameController.updateGame); // testé
router.delete("/:id", gameController.deleteGame); // testé

export default router;