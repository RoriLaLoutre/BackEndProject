import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const gameModel = sequelize.define("game", {
    game_id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
    },
    gameName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    gameAgeLimit:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:false,
        defaultValue: 3
    }
    });

export default gameModel;

