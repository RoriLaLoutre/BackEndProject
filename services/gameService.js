import {gameRepository} from "../repositories/indexRepository.js";
import { GameError } from "../errors/index.error.js";


export async function createGame({ gameName, gameAgeLimit }) {

    if (await gameRepository.gameExists(gameName)){
        throw new GameError.ConflictError("Impossible de l'ajouter, le jeu existe déja.")
    }
    if (!gameName || gameName.length > 255){
        throw new GameError.BadRequestError("Impossible d'ajouter le jeu, le nom doit compter entre 1 et 250 caractères")
    }

    const game = await gameRepository.createGame({ gameName, gameAgeLimit });

    return game;
}

export async function getGameById(id) {
  const game =  await gameRepository.getGameById(id);

  if (!game){
    throw new GameError.NotFoundError("le jeu n'existe pas")
  }

  return {
    id : game.id,
    gameName : game.gameName,
    gameAgeLimit: game.gameAgeLimit
  }
}


export async function updateGame(id, { gameName, gameAgeLimit }) {
    if (await gameRepository.gameExists(gameName)){
        throw new GameError.ConflictError("Impossible de changer pour ce nom, celui-ci est déja pris")
    }
    if (!gameName || gameName.length > 255){
        throw new GameError.BadRequestError("Impossible d'ajouter le jeu, le nom doit compter entre 1 et 250 caractères")
    }
    if (gameAgeLimit > 18){
        throw new GameError.BadRequestError("La limite maximum est de 18 ans")
    }

  const game = await gameRepository.updateGame(id, {
    gameName,
    gameAgeLimit,
  });

  return game;
}


export async function deleteGame(id){
    if (!await getGameById(id)){
        throw new GameError.NotFoundError("le jeu n'existe pas");
    }

    return (await gameRepository.deleteGame(id));
}

export async function getAllGames(){
    return await gameRepository.getAllGames()

}
