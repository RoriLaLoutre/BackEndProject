import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const userModel = sequelize.define("user", {
    user_id: {
        primaryKey: true,
        type: DataTypes.UUIDV4,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
    }});

export default userModel;

