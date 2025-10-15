import { userGameConfigRepository } from "../repositories/indexRepository.js";
export async function CreateUserGameConfig(data){
    const gameConfig = await userGameConfigRepository.CreateUserGameConfig(data)
}