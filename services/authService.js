import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/indexRepository.js";
import { UserError } from "../errors/index.error.js";
import 'dotenv/config';

export async function register({ username, password, birthDate }) {
  if (await userRepository.userExists(username)) {
    throw new UserError.ConflictError("Ce nom d'utilisateur est déjà utilisé");
  }

  if (!username || username.length > 255) {
    throw new UserError.BadRequestError("Le nom doit compter entre 1 et 250 caractères");
  }

  if (!password || password.length < 7) {
    throw new UserError.BadRequestError("Le mot de passe doit faire au moins 7 caractères");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser({ username, password: hashedPassword, birthDate });

  // Create token
  const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

  return { user, token };
}

export async function login({ username, password }) {
  const user = await userRepository.getUserByUsername(username);
  if (!user) {
    throw new UserError.NotFoundError("Utilisateur introuvable");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new UserError.BadRequestError("Mot de passe incorrect");
  }

  const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

  return { user, token };
}
