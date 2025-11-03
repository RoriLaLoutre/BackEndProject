import { authService } from "../services/indexService.js";

export async function register(req, res, next) {
  try {
    const { username, password, birthDate } = req.body;
    const result = await authService.register({ username, password, birthDate });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const result = await authService.login({ username, password });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}