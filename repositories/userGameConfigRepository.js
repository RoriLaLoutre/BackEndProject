import userGameConfigModel from "../models/userGameConfigModel.js"

export async function CreateUserGameConfig(data) {
  try {
    if (!data.idConfig) {
      throw new Error("creation de gameConfig impossinle, besoin d'un idConfig");
    }

    const newConfig = await userGameConfigModel.create(data);
    return newConfig;
  } catch (error) {
    console.error("Erreur lors de la création d'une GameConfig :", error);
    throw error;
  }
}

export async function getUserGameConfigById(id) {
  try {
    const config = await userGameConfigModel.findOne({ idConfig: id });
    return config || null;
  } catch (error) {
    console.error("Erreur lors de la récupération d'une GameConfig :", error);
    throw error;
  }
}

export async function updateUserGameConfig(id, data) {
  try {
    const result = await userGameConfigModel.updateOne(
      { idConfig: id },
      { $set: data }
    );
    return result;
  } catch (error) {
    console.error("Erreur lors de la mise à jour d'une GameConfig :", error);
    throw error;
  }
}

export async function deleteUserGameConfig(id) {
  try {
    const result = await userGameConfigModel.deleteOne({ idConfig: id });
    return result;
  } catch (error) {
    console.error("Erreur lors de la suppression d'une GameConfig :", error);
    throw error;
  }
}
