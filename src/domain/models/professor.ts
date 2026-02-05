import { sequelize } from "@/server";
import { DataTypes } from "sequelize";
import Person from "./person";

const Professor = sequelize.define(
    "Professor",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            autoIncrement: true
        },

        registration: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        personId: {
            type: DataTypes.UUID,
            references: {
                model: Person,
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
    }
)
Professor.belongsTo(Person)
export default Professor