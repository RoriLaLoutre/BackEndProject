import userGameConfigModel from "../models/userGameConfigModel.js"



export async function createUserGameConfig(data) {

    const newConfig = await userGameConfigModel.create(data);
    return newConfig;
}

export async function getUserGameConfigById(id) {
    const config = await userGameConfigModel.findOne({ idConfig: id });
    return config || null;
}

export async function updateUserGameConfig(id, data) {
    return await userGameConfigModel.findOneAndUpdate(
        { idConfig: id },
        { $set: data },
    );
}

export async function deleteUserGameConfig(id) {
    const result = await userGameConfigModel.deleteOne({ idConfig: id });
    return result;
}
