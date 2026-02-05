import { sequelize } from "@/server";
import { DataTypes } from "sequelize";
import Person from "./person";

const Student = sequelize.define(
    "Student",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            autoIncrement: true
        },
        course: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: {
                    args: [3],
                    msg: "Course should have at least 3 characters"
                },
                max: {
                    args: [100],
                    msg: "Course should have up to 100 characters"
                },
            }
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
        },
    }
)
Student.belongsTo(Person)

export default Student