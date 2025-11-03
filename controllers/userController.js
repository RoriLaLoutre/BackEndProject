import { userService } from "../services/indexService.js";

// === Users ===

export async function createUser(req, res, next) {
  try {
    const { username, password, birthDate } = req.body;
    const user = await userService.createUser({ username, password, birthDate });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const { username, password, birthDate } = req.body;
    const user = await userService.updateUser(id, { username, password, birthDate });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getAllUsers(req, res, next) {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

// === User ↔ Roles ===

export async function addRoleToUser(req, res, next) {
  try {
    const { idUser, idRole } = req.body;
    const result = await userService.addRoleToUser({ idUser, idRole });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function getUserRoles(req, res, next) {
  try {
    const { id } = req.params;
    const roles = await userService.getUserRoles(id);
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
}

export async function removeRoleFromUser(req, res, next) {
  try {
    const { idUser, idRole } = req.body;
    const result = await userService.removeRoleFromUser({ idUser, idRole });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

// === User ↔ Games ===

export async function addGameToUser(req, res, next) {
  try {
    const { idUser, idGame } = req.body;
    const result = await userService.addGameToUser({ idUser, idGame });
    res.status(201).json(result);
  } catch (error) {
    console.error("❌ addGameToUser error:", error);
    next(error);
  }
}

export async function getUserGames(req, res, next) {
  try {
    const { id } = req.params;
    const games = await userService.getUserGames(id);
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
}

export async function removeGameFromUser(req, res, next) {
  try {
    const { idUser, idGame } = req.body;
    const result = await userService.removeGameFromUser({ idUser, idGame });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
