import { ConfigError } from "../errors/index.error.js";
import { userGameConfigRepository } from "../repositories/indexRepository.js";


export async function CreateUserGameConfig(data){
    if(!data.id){
        throw new ConfigError.BadRequestError("les données nécessaires à la création de la config ne sont pas réunis");
    }
    return await userGameConfigRepository.CreateUserGameConfig(data)
}

export async function getUserGameConfiById(id){
    const userGameConfig = await userGameConfigRepository.getUserGameConfigById(id)
    if(!userGameConfig){
        throw new ConfigError.NotFoundError("config introuvable");  
    }
    return userGameConfig
}

export async function updateUserGameConfig(id, data){
    if(!data.id){
        throw new ConfigError.BadRequestError("les données nécessaires à la création de la config ne sont pas réunis");
    }
     await userGameConfigRepository.updateUserGameConfig(id, data)
}


export async function deleteUserGameConfig(id){
    const gameConfig = await userGameConfigRepository.getUserGameConfigById(id)
    if (!gameConfig){
        throw new ConfigError.NotFoundError("la config n'existe pas");
    }
    return await userGameConfigRepository.deleteUserGameConfig(id)
}