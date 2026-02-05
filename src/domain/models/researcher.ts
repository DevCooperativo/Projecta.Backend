import { sequelize } from "@/server";
import { DataTypes } from "sequelize";
import Person from "./person";

const Researcher = sequelize.define(
    "Researcher",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            autoIncrement: true
        },


        personId: {
            type: DataTypes.UUID,
            references: {
                model: Person,
                key: "id"
            }
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

Researcher.hasOne(Person)
export default Researcher