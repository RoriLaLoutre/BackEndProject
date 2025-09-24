import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const gameModel = sequelize.define("game", {
    game_id: {
        primaryKey: true,
        type: DataTypes.UUIDV4,
        autoIncrement: true
    },
    gameName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    gamesAgeLimit:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:false,
        defaultValue: 3
    }
    });

export default gameModel;

