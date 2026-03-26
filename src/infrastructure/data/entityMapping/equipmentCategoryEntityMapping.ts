import { DataTypes } from "sequelize";
import { sequelize } from "infrastructure/data/sequelize";
import { TABLE_NAMES } from "../constants/tableNames";
import BaseEntityMapping from "./baseEntityMapping";

class EquipmentCategoryEntityMapping extends BaseEntityMapping {
    declare id: number
    declare powerSource: string
    declare fragile: boolean
    declare description: string
    declare createdAt: Date
    declare updatedAt: Date
    declare isVisible: boolean
}

EquipmentCategoryEntityMapping.init(
    EquipmentCategoryEntityMapping.buildBaseAttributes({
        powerSource: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fragile: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }),
    {
        sequelize,
        modelName: "EquipmentCategory",
        tableName: TABLE_NAMES.EQUIPMENT_CATEGORY
    }
)

export default EquipmentCategoryEntityMapping