import sequelize from "infrastructure/data/sequelize"
import { DataTypes } from "sequelize";
import { TABLE_NAMES } from "../constants/tableNames";
import BaseEntityMapping from "./baseEntityMapping";
import LaboratoryEntity from "./laboratoryEntity";
import ProjectCategoryEntityMapping from "./projectCategoryEntityMapping";

class ProjectEntityMapping extends BaseEntityMapping {
    declare id: number
    declare name: string
    declare fundingNotice: string
    declare description: string
    declare startDate: Date
    declare endDate?: Date
    declare status: string
    declare laboratoryId: number
    declare projectCategoryId: number
}

ProjectEntityMapping.init(
    ProjectEntityMapping.buildBaseAttributes({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fundingNotice: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        laboratoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: LaboratoryEntity,
                key: "id",
            },
        },
        projectCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ProjectCategoryEntityMapping,
                key: "id",
            },
        },
    }),
    {
        modelName: TABLE_NAMES.PROJECT,
        tableName: TABLE_NAMES.PROJECT,
        sequelize,
        timestamps: true,
    }
)

ProjectEntityMapping.belongsTo(LaboratoryEntity, { as: "Laboratories", foreignKey: "laboratoryId" })
ProjectEntityMapping.belongsTo(ProjectCategoryEntityMapping, { as: "ProjectCategories", foreignKey: "projectCategoryId" })

export default ProjectEntityMapping