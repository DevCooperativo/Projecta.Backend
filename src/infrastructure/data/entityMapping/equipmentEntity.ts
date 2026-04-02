import { DataTypes, Model } from "sequelize"
import sequelize from "../sequelize"
import FundingNoticeEntity from "./fundingNoticeEntityMapping"
import ProjectEntity from "./projectEntityMapping"
import LaboratoryEntity from "./laboratoryEntity"

class EquipmentEntity extends Model {
    declare id: number
    declare name: string
    declare originalValue: number
    declare fundingNoticeId: string
    declare containerId?: string
    declare laboratoryId?: string
    declare cacheLaboratoryId: string
    declare projectId: string
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
    originalValue: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    contianerId: {
        type: DataTypes.INTEGER,
        references: {
            key: "id",
            model: EquipmentEntity
        },
        allowNull: true
    },
    fundingNoticeId: {
        type: DataTypes.INTEGER,
        references: {
            key: "id",
            model: FundingNoticeEntity
        },
        allowNull: false
    },
    laboratoryId: {
        type: DataTypes.INTEGER,
        references: {
            key: "id",
            model: LaboratoryEntity
        },
        allowNull: true
    },
    cacheLaboratoryId: {
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

EquipmentEntity.belongsTo(EquipmentEntity, { as: "Equipments", foreignKey: "containerId" })
EquipmentEntity.belongsTo(ProjectEntity, { as: "Projects", foreignKey: "projectId" })
EquipmentEntity.belongsTo(FundingNoticeEntity, { as: "FundingNotices", foreignKey: "fundingNoticeId" })
EquipmentEntity.belongsTo(LaboratoryEntity, { as: "Laboratories", foreignKey: "laboratoryId" })
EquipmentEntity.belongsTo(LaboratoryEntity, { as: "Laboratories", foreignKey: "cacheLaboratoryId" })

export default EquipmentEntity
