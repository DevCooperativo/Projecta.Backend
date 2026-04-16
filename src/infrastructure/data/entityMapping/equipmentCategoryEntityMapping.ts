import { DataTypes } from "sequelize";
import { sequelize } from "infrastructure/data/sequelize";
import { TABLE_NAMES } from "../constants/tableNames";
import BaseEntityMapping from "./baseEntityMapping";
import { EquipmentPowerSources } from "domain/constants/equipmentPowerSources";

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
            type: DataTypes.ENUM(...Object.values(EquipmentPowerSources)),
            allowNull: false,
            validate: {
                isIn: {
                    args: [Object.values(EquipmentPowerSources)],
                    msg: "Power source must be one of the predefined options"
                }
            }
        },
        fragile: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                min: {
                    args: [10],
                    msg: "Description should have at least 10 characters"
                },
                max: {
                    args: [500],
                    msg: "Description should have up to 500 characters"
                },
                notEmpty: {
                    args: true,
                    msg: "Description cannot be empty"
                }
            }
        }
    }),
    {
        sequelize,
        modelName: "EquipmentCategory",
        tableName: TABLE_NAMES.EQUIPMENT_CATEGORY
    }
)

export default EquipmentCategoryEntityMapping