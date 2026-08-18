import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Social_Users = sequelize.define(
    "Social_Users", {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            unique: true,
            autoIncrement:true
        }
    },
    {
        timestamps:false
    }
)