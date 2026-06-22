import sequelize from "@/infrastructure/data/sequelize"
import { DataTypes } from "sequelize";
import { TABLE_NAMES } from "../constants/tableNames";
import BaseEntityMapping from "./baseEntityMapping";
import LaboratoryEntity from "./laboratoryEntity";
import ProjectCategoryEntityMapping from "./projectCategoryEntityMapping";

class ProjectEntityMapping extends BaseEntityMapping {
    declare id: number
    declare name: string
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
            validate: {
                len: {
                    args: [3, 100],
                    msg: "Name should have between 3 and 100 characters"
                },
                notEmpty: {
                    args: true,
                    msg: "Name cannot be empty"
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [10, 500],
                    msg: "Description should have between 10 and 500 characters"
                },
                notEmpty: {
                    args: true,
                    msg: "Description cannot be empty"
                }
            }
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: {
                    args: true,
                    msg: "Start date must be a valid date"
                }
            }
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: {
                    args: true,
                    msg: "End date must be a valid date"
                }
            }
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Status cannot be empty"
                }
            }
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