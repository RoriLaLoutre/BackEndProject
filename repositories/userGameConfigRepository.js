import userGameConfigModel from "../models/userGameConfigModel.js"


// cette table utilise Mongoose (mongoDB)

export async function CreateUserGameConfig(data) {

    const newConfig = await userGameConfigModel.create(data);
    return newConfig;
}

export async function getUserGameConfigById(id) {
    const config = await userGameConfigModel.findOne({ idConfig: id });
    return config || null;
}

export async function updateUserGameConfig(id, data) {
    const result = await userGameConfigModel.updateOne(
      { idConfig: id },
      { $set: data }
    );
    return result;
}

export async function deleteUserGameConfig(id) {
    const result = await userGameConfigModel.deleteOne({ idConfig: id });
    return result;
}
