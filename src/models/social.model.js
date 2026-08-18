import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Social = sequelize.define(
    "Social", {
        red_secial: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    }
)
