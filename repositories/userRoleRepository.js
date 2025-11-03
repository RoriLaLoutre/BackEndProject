import userRoleModel from "../models/userRoleModel.js"
import userModel from "../models/userModel.js";
import roleModel from "../models/roleModel.js";

export async function addRoleToUser({roleId , userId}){
    return await userRoleModel.create({idRole: roleId, idUser: userId})
}


export async function getUserRoles(userId) {
  return await roleModel.findAll({
    include: {
      model: userModel,
      through: userRoleModel,
      where: { idUser: userId },
      attributes: [],
    },
  });
}

export async function removeRoleFromUser({ roleId, userId }) {
  const deletedCount = await userRoleModel.destroy({
    where: { idUser: userId, idRole: roleId },
  });
  return deletedCount > 0;
}