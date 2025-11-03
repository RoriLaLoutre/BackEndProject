import express from "express";
import * as userController from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { authorizeSelfOrAdmin } from "../middlewares/authSelfOrAdminMiddlewares.js";

const router = express.Router();

// basic user CRUD
// router.post("/", userController.createUser); // testé  mais remplacé par register dans la logique d'authentification
router.get("/",authenticateToken,authorizeSelfOrAdmin, userController.getAllUsers); // testé
router.get("/:id",authenticateToken,authorizeSelfOrAdmin, userController.getUserById); // testé
router.put("/:id",authenticateToken,authorizeSelfOrAdmin, userController.updateUser); // testé
router.delete("/:id",authenticateToken,authorizeSelfOrAdmin, userController.deleteUser); //testé

router.use(authenticateToken);

// User AND Roles
router.post("/roles",authenticateToken,authorizeSelfOrAdmin, userController.addRoleToUser);
router.get("/:id/roles",authenticateToken,authorizeSelfOrAdmin, userController.getUserRoles);
router.delete("/roles",authenticateToken,authorizeSelfOrAdmin, userController.removeRoleFromUser);

// User AND Games
router.post("/games",authenticateToken,authorizeSelfOrAdmin, userController.addGameToUser);
router.get("/:id/games",authenticateToken,authorizeSelfOrAdmin, userController.getUserGames);
router.delete("/games",authenticateToken,authorizeSelfOrAdmin, userController.removeGameFromUser);

export default router;