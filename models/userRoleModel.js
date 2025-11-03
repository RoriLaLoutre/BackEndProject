import {sequelize} from "../config/db.js";
import { DataTypes } from "sequelize";

const userRoleModel = sequelize.define("user_role", {
  idRole: { type: DataTypes.INTEGER, primaryKey: true , allownull:false },
  idUser: { type: DataTypes.UUID, primaryKey: true , allownull:false},
}, { timestamps: false });

export default userRoleModel;
