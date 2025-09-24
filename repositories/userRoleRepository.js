import userRoleModel from "../models/userRoleModel.js"

export async function addRoleToUser({roleId , userId}){
    return await userRoleModel.create({idRole: roleId, idUser: userId})
}


export async function getUserRoles(userId) {
    return await Power.findAll({
      include: {
        model: UserModel,
        through: userRoleModel,
        where: { idRole: userId },
        attributes: [],
      },
    });
  }