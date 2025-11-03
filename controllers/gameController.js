import { gameService } from "../services/indexService.js";

export async function createGame(req, res, next) {
  try {
    const { gameName, gameAgeLimit } = req.body;
    const game = await gameService.createGame({ gameName, gameAgeLimit });
    res.status(201).json(game); 
  } catch (error) {
    next(error);
  }
}

export async function getGameById(req, res, next) {
  try {
    const { id } = req.params;
    const game = await gameService.getGameById(id);
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
}

export async function updateGame(req, res, next) {
  try {
    const { id } = req.params;
    const { gameName, gameAgeLimit } = req.body;
    const updatedGame = await gameService.updateGame(id, { gameName, gameAgeLimit });
    res.status(200).json(updatedGame);
  } catch (error) {
    next(error);
  }
}

export async function deleteGame(req, res, next) {
  try {
    const { id } = req.params;
    await gameService.deleteGame(id);
    res.status(204).send(); 
  } catch (error) {
    next(error);
  }
}

export async function getAllGames(req, res, next) {
  try {
    const games = await gameService.getAllGames();
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
}
