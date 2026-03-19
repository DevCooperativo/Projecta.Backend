import { sequelize } from "infrastructure/data/sequelize";
import { DataTypes } from "sequelize";
import { TABLE_NAMES } from "../constants/tableNames";
import BaseEntityMapping from "./baseEntityMapping";
class ProfessorEntityMapping extends BaseEntityMapping {
    declare id: number
    declare registration: string
    declare name: string
    declare email: string
    declare createdAt: Date
    declare updatedAt: Date
    declare isVisible: boolean
}
ProfessorEntityMapping.init(
    ProfessorEntityMapping.buildBaseAttributes({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: { msg: "'Email' must be a valid email" }
            }
        },


        registration: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },


        // Default properties
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        isVisible: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },), {
    modelName: TABLE_NAMES.PROFESSOR,
    tableName: TABLE_NAMES.PROFESSOR,
    sequelize,
    timestamps: true
}
)
export default ProfessorEntityMapping