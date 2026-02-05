import { sequelize } from "@/server";
import { DataTypes } from "sequelize";
import Professor from "./professor";

const Coordinator = sequelize.define(
    'Coordinator',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        


        professorId: {
            type: DataTypes.UUID,
            references: {
                model: Professor,
                key: "id"
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
    },
    {
        // Other model options go here
    },

);
Coordinator.hasOne(Professor)
export default Coordinator