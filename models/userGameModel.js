import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const userGameModel = sequelize.define("user_game", {
    idConfig: { type: DataTypes.UUIDV4, primaryKey: true , allownull:false},
    idUser: { type: DataTypes.UUIDV4, primaryKey: true , allownull:false },
    idGame: { type: DataTypes.UUIDV4, primaryKey: true , allownull:false},
}, { timestamps: false });

export default userGameModel;
