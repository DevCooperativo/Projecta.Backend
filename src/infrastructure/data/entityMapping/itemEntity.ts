import { DataTypes, Model } from "sequelize"
import sequelize from "../sequelize"
import FundingNoticeEntity from "./fundingNoticeEntityMapping"
import ProjectEntity from "./projectEntity"
import LaboratoryEntity from "./laboratoryEntity"

class ItemEntity extends Model {
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
ItemEntity.init({
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
            model: ItemEntity
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
        modelName: "Items",
        tableName: "Items",
        sequelize
    })

ItemEntity.belongsTo(ItemEntity, { as: "Itens", foreignKey: "containerId" })
ItemEntity.belongsTo(ProjectEntity, { as: "Projects", foreignKey: "projectId" })
ItemEntity.belongsTo(FundingNoticeEntity, { as: "FundingNotices", foreignKey: "fundingNoticeId" })
ItemEntity.belongsTo(LaboratoryEntity, { as: "Laboratories", foreignKey: "laboratoryId" })
ItemEntity.belongsTo(LaboratoryEntity, { as: "Laboratories", foreignKey: "cacheLaboratoryId" })

export default ItemEntity