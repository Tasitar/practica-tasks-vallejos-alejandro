import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { user } from "./user.model.js";

export const Task = sequelize.define (
    'Task',
    {
        title: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        
        isComplete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        user_id: {
            model: "Users",
            key:"key",
        }
    },
    {
        timestamps: false,
    }
)
Task.belongsTo(user,{foreignKey:"user_id", as: "user"})

