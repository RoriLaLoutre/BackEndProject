import { ConfigError } from "../errors/index.error.js";
import { userGameConfigRepository } from "../repositories/indexRepository.js";


export async function createUserGameConfig(data){
    if(!data.idConfig){
        throw new ConfigError.BadRequestError("les données nécessaires à la création de la config ne sont pas réunis");
    }
    return await userGameConfigRepository.createUserGameConfig(data)
}

export async function getUserGameConfigById(id){
    const userGameConfig = await userGameConfigRepository.getUserGameConfigById(id)
    if(!userGameConfig){
        throw new ConfigError.NotFoundError("config introuvable");  
    }
    return userGameConfig
}

export async function updateUserGameConfig(id, data){
    if(!id){
        throw new ConfigError.BadRequestError("l'id est requis");
    }
    return await userGameConfigRepository.updateUserGameConfig(id, data)
}


export async function deleteUserGameConfig(id){
    const gameConfig = await userGameConfigRepository.getUserGameConfigById(id)
    if (!gameConfig){
        throw new ConfigError.NotFoundError("la config n'existe pas");
    }
    return await userGameConfigRepository.deleteUserGameConfig(id)
}