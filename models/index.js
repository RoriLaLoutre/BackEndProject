import gameModel from "./gameModel.js";
import roleModel from "./roleModel.js";
import userModel from "./userModel.js";
import userGameModel from "./userGameModel.js";
import userRoleModel from "./userRoleModel.js";
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
