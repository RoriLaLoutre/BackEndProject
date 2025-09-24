import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const userRoleModel = sequelize.define("user_role", {
  idRole: { type: DataTypes.INTEGER, primaryKey: true , allownull:false },
  idUser: { type: DataTypes.UUIDV4, primaryKey: true , allownull:false},
}, { timestamps: false });

export default userRoleModel;
