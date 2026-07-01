import { DataTypes, Model } from "sequelize"
import sequelize from "../sequelize"
import ProjectEntity from "./projectEntityMapping"
import LaboratoryEntity from "./laboratoryEntity"
import EquipmentCategoryEntityMapping from "./equipmentCategoryEntityMapping"
import { TABLE_NAMES } from "../constants/tableNames"

class EquipmentEntity extends Model {
    declare id: number
    declare name: string
    declare laboratoryId: number
    declare projectId: number
    declare equipmentCategoryId: number
    declare createdAt: Date
    declare updatedAt: Date
    declare isVisible: boolean
}
EquipmentEntity.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3, 100],
                msg: "Name should have between 3 and 100 characters"
            },
            notEmpty: {
                msg: "Name cannot be empty"
            }
        }
    },
    laboratoryId: {
        type: DataTypes.INTEGER,
        references: {
            key: "id",
            model: LaboratoryEntity
        },
        allowNull: false,
        validate: {
            isInt: {
                msg: "Laboratory ID must be an integer"
            },
            min: {
                args: [1],
                msg: "Laboratory ID must be greater than 0"
            }
        }
    },
    projectId: {
        type: DataTypes.INTEGER,
        references: {
            key: "id",
            model: ProjectEntity
        },
        allowNull: false,
        validate: {
            isInt: {
                msg: "Project ID must be an integer"
            },
            min: {
                args: [1],
                msg: "Project ID must be greater than 0"
            }
        }
    },
    equipmentCategoryId: {
        type: DataTypes.INTEGER,
        references: {
            key: "id",
            model: EquipmentCategoryEntityMapping
        },
        allowNull: false,
        validate: {
            isInt: {
                msg: "Equipment category ID must be an integer"
            },
            min: {
                args: [1],
                msg: "Equipment category ID must be greater than 0"
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
    isVisible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
    {
        modelName: TABLE_NAMES.EQUIPMENTS,
        tableName: TABLE_NAMES.EQUIPMENTS,
        sequelize
    })

EquipmentEntity.belongsTo(ProjectEntity, { as: "Projects", foreignKey: "projectId" })
EquipmentEntity.belongsTo(LaboratoryEntity, { as: "Laboratories", foreignKey: "laboratoryId" })
EquipmentEntity.belongsTo(EquipmentCategoryEntityMapping, { as: "EquipmentCategories", foreignKey: "equipmentCategoryId" })

export default EquipmentEntity
