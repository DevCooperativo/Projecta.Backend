import { sequelize } from "@/server";
import { DataTypes } from "sequelize";
import Item from "./item";
import Person from "./person";

const Borrow = sequelize.define(
    "Borrow",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            autoIncrement: true
        },

        itemId: {
            type: DataTypes.UUID,
            references: {
                model: Item,
                key: "id"
            }
        },

        personId: {
            type: DataTypes.UUID,
            references: {
                model: Person,
                key: "id"
            }
        },

        borrowDate: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
            allowNull: false
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: true,
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

Borrow.hasOne(Item)
Borrow.hasOne(Person)
export default Borrow