import { DataTypes, Model } from "sequelize"
import sequelize from "../sequelize"
import ProjectEntity from "./projectEntityMapping"
import LaboratoryEntity from "./laboratoryEntity"
import EquipmentCategoryEntityMapping from "./equipmentCategoryEntityMapping"

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
        allowNull: false
    },
    laboratoryId: {
        type: DataTypes.INTEGER,
        references: {
            key: "id",
            model: LaboratoryEntity
        },
        allowNull: false
    },
    projectId: {
        type: DataTypes.INTEGER,
        references: {
            key: "id",
            model: ProjectEntity
        },
        allowNull: false
    },
    equipmentCategoryId: {
        type: DataTypes.INTEGER,
        references: {
            key: "id",
            model: EquipmentCategoryEntityMapping
        },
        allowNull: false
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
        modelName: "Equipments",
        tableName: "Equipments",
        sequelize
    })

EquipmentEntity.belongsTo(ProjectEntity, { as: "Projects", foreignKey: "projectId" })
EquipmentEntity.belongsTo(LaboratoryEntity, { as: "Laboratories", foreignKey: "laboratoryId" })
EquipmentEntity.belongsTo(EquipmentCategoryEntityMapping, { as: "EquipmentCategories", foreignKey: "equipmentCategoryId" })

export default EquipmentEntity
