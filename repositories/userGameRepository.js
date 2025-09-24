import userGameModel from "../models/userGameModel.js"

export async function addGameToUser({ configId, userId, gameId}){
    return await userGameModel.create({idConfig: configId, idUser: userId , idGame: gameId})
}


export async function getUserGames(userId) {
    return await Power.findAll({
      include: {
        model: UserModel,
        through: userGameModel,
        where: { idRole: userId },
        attributes: [],
      },
    });
  }