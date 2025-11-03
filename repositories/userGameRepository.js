import userGameModel from "../models/userGameModel.js"
import userModel from "../models/userModel.js";
import gameModel from "../models/gameModel.js";
import { v4 as uuidv4 } from "uuid";
import {createUserGameConfig , deleteUserGameConfig} from "../repositories/userGameConfigRepository.js";



export async function addGameToUser({ userId, gameId }) {
  const configId = uuidv4();

  try {
    const userGame = await userGameModel.create({
      idConfig: configId,
      idUser: userId,
      idGame: gameId,
    });

    await createUserGameConfig({ idConfig: configId });

    return userGame;
  } catch (error) {
    console.error("Unable to add game + config:", error);
    throw error;
  }
}

export async function getUserGames(userId) {
  return await gameModel.findAll({
    include: {
      model: userModel,
      through: userGameModel,
      where: { idUser: userId },
      attributes: [],
    },
  });
}

export async function removeGameFromUser({ userId, gameId }) {
  try {
    const link = await userGameModel.findOne({ where: { idUser : userId, idGame : gameId} });
    if (!link) {
      throw new Error("Ce jeu n'est pas associé à cet utilisateur");
    }

    const { idConfig } = link;

    await deleteUserGameConfig(idConfig);

    await userGameModel.destroy({ where: { idUser:userId, idGame: gameId } });

    return { message: "Jeu retiré avec succès" };
  } catch (error) {
    console.error("Impossible de retirer le jeu et la config du jeu:", error);
    throw error;
  }
}