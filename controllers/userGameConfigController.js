import { userGameConfigService } from "../services/indexService.js";

// export async function createUserGameConfig(req, res, next) {
//   try {
//     const data = req.body;
//     const newConfig = await userGameConfigService.createUserGameConfig(data);
//     res.status(201).json(newConfig);
//   } catch (error) {
//     next(error);
//   }
// }

export async function getUserGameConfigById(req, res, next) {
  try {
    const { id } = req.params;
    const config = await userGameConfigService.getUserGameConfigById(id);
    res.status(200).json(config);
  } catch (error) {
    next(error);
  }
}

export async function updateUserGameConfig(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    const updated = await userGameConfigService.updateUserGameConfig(id, data);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
}

export async function deleteUserGameConfig(req, res, next) {
  try {
    const { id } = req.params;
    await userGameConfigService.deleteUserGameConfig(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}