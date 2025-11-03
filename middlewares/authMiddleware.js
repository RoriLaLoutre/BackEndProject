import jwt from "jsonwebtoken";
import { UserError } from "../errors/index.error.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UserError.UnauthorizedError("Token manquant ou invalide");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    throw new UserError.UnauthorizedError("Token invalide ou expiré");
  }
}