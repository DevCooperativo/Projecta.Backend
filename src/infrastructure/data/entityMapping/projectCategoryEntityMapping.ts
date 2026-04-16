import { DataTypes } from "sequelize";
import { sequelize } from "infrastructure/data/sequelize";
import { TABLE_NAMES } from "../constants/tableNames";
import BaseEntityMapping from "./baseEntityMapping";
import { KnowledgeAreas } from "domain/constants/knowledgeAreas";

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
            allowNull: false,
            validate: {
                min: {
                    args: [3],
                    msg: "Name should have at least 3 characters"
                },
                max: {
                    args: [100],
                    msg: "Name should have up to 100 characters"
                },
                notEmpty: {
                    args: true,
                    msg: "Name cannot be empty"
                }
            }
        },
        commerciallyRelevant: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        area: {
            type: DataTypes.ENUM(...Object.values(KnowledgeAreas)),
            allowNull: false,
            validate: {
                isIn: {
                    args: [Object.values(KnowledgeAreas)],
                    msg: "Area must be one of the predefined knowledge areas"
                }
            }
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
        modelName: "ProjectCategory",
        tableName: TABLE_NAMES.PROJECT_CATEGORY
    }
)

export default ProjectCategoryEntityMapping