import { sequelize } from "@/server";
import { DataTypes } from "sequelize";

const Project = sequelize.define(
    "Project",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amountEarned: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
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

export default Project