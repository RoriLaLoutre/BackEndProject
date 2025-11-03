import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const roleModel = sequelize.define("role", {
    role_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }});

export default roleModel;

