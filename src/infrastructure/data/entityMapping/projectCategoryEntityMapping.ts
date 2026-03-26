import { DataTypes } from "sequelize";
import { sequelize } from "infrastructure/data/sequelize";
import { TABLE_NAMES } from "../constants/tableNames";
import BaseEntityMapping from "./baseEntityMapping";

class ProjectCategoryEntityMapping extends BaseEntityMapping {
    declare id: number
    declare name: string
    declare commerciallyRelevant: boolean
    declare area: string
    declare description: string
    declare createdAt: Date
    declare updatedAt: Date
    declare isVisible: boolean
}

ProjectCategoryEntityMapping.init(
    ProjectCategoryEntityMapping.buildBaseAttributes({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        commerciallyRelevant: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        area: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }),
    {
        sequelize,
        modelName: "ProjectCategory",
        tableName: TABLE_NAMES.PROJECT_CATEGORY
    }
)

export default ProjectCategoryEntityMapping