import sequelize from "@/infrastructure/data/sequelize"
import { DataTypes } from "sequelize";
import ProfessorEntity from "./professorEntityMapping";
import BaseEntityMapping from "./baseEntityMapping";
import { TABLE_NAMES } from "../constants/tableNames";
import ProjectEntity from "./projectEntityMapping";

class CoordinatorEntityMapping extends BaseEntityMapping {
    declare id: number
    declare area: string
    declare startDate: Date
    declare endDate?: Date
    declare professorId: number
    declare projectId: number
}

CoordinatorEntityMapping.init(
    CoordinatorEntityMapping.buildBaseAttributes({
        area: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: {
                    args: [3],
                    msg: "Area should have at least 3 characters"
                },
                max: {
                    args: [100],
                    msg: "Area should have up to 100 characters"
                },
                notEmpty: {
                    args: true,
                    msg: "Area cannot be empty"
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
        professorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ProfessorEntity,
                key: "id",
            },
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ProjectEntity,
                key: "id",
            },
        },
    }),
    {
        modelName: TABLE_NAMES.COORDINATOR,
        tableName: TABLE_NAMES.COORDINATOR,
        sequelize,
        timestamps: true,
    }
);

CoordinatorEntityMapping.belongsTo(ProfessorEntity, { as: "Professors", foreignKey: "professorId" })
CoordinatorEntityMapping.belongsTo(ProjectEntity, { as: "Projects", foreignKey: "projectId" })
ProjectEntity.hasMany(CoordinatorEntityMapping, { as: "Coordinators", foreignKey: "projectId" })

export default CoordinatorEntityMapping