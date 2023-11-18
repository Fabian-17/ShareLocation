import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

export const Travel = sequelize.define('Travel', {
    coordenate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})