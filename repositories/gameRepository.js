import gameModel from "../models/gameModel.js";

export async function createGame({ gameName, gamesAgeLimit }) {
  const game = await gameModel.create({ gameName, gamesAgeLimit });
  return game;
}

export async function getGameById(id) {
  if (!game) {
    return null;
  }
  return await gameModel.findByPk(id);
}

export async function updtateGame(id, values) {
  const game = await getGameById(id);
  if (!game) {
    return null;
  }
  return await game.update(values);
}

export async function deleteGame(id) {
  const game = await getGameById(id);
  if (!game) {
    return null;
  }

  return await game.destroy()
}

export async function getAllGames() {
  return await gameModel.findAll();
}

export async function gameExists(gameName) {
  const game = await gameModel.findOne({ where: { gameName } });
  return Boolean(game);
}

