import gameModel from "./gameModel";
import roleModel from "./roleModel";
import userModel from "./userModel";
import userGameModel from "./userGameModel";
import userRoleModel from "./userRoleModel";
const associate = () => {
  
  roleModel.belongsToMany(userModel, {
    through: userRoleModel,
    foreignKey: "id_role",
    as: "user"
  });

  userModel.belongsToMany(roleModel, {
    through: userRoleModel,
    foreignKey: "id_user",
    as: "role"
  });

  gameModel.belongsToMany(userModel, {
    through: userGameModel,
    foreignKey: "id_game",
    as: "user",
  });

  userModel.belongsToMany(gameModel, {
    through: userGameModel,
    foreignKey: "id_user",
    as: "game",
  });
};

export { associate };
