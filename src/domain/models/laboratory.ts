import { sequelize } from "@/server";
import { DataTypes } from "sequelize";

const Laboratory = sequelize.define(
    "Laboratory",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        maxOccupants: {
            type: DataTypes.INTEGER,
            validate: {
                min: {
                    args: [1],
                    msg: "The minimum amount of occupants is 1"
                }
            }
        },



        // Default properties
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }
)
export default Laboratory