import {sequelize} from "../config/db.js";
import { DataTypes } from "sequelize";

const userGameModel = sequelize.define("user_game", {
    idConfig: { type: DataTypes.UUID, primaryKey: true , allownull:false},
    idUser: { type: DataTypes.UUID, primaryKey: true , allownull:false },
    idGame: { type: DataTypes.UUID, primaryKey: true , allownull:false},
}, { timestamps: false });

export default userGameModel;
