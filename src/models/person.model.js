import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const personalModel = sequelize.define(
    "Person",
    {
        namePerson:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        lastname: {
            type: DataTypes.STRING(100),
            allowNull: false
        },    
    },
    {
        timestamps:false,
    }
)