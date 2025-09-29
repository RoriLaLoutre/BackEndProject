import userGameModel from "../models/userGameModel.js"
import userModel from "../models/userModel.js";
import gameModel from "../models/gameModel.js";
import { v4 as uuidv4 } from "uuid";
import CreateUserGameConfig from "../repositories/userGameConfigRepository.js";


export async function addGameToUser({ userId, gameId}){
    const configId = uuidv4();
    try{
      const usergame = await userGameModel.create({idConfig: configId, idUser: userId , idGame: gameId})
      const userGameConfig = await CreateUserGameConfig({ idConfig: configId }); // création directe d'une config à l'ajout d'un jeu
    } catch (error) {
      console.error('Unable to add data to one of the two table', error);
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