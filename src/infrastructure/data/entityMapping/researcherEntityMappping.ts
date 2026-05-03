import sequelize from "@/infrastructure/data/sequelize"
import { DataTypes } from "sequelize";
import StudentEntity from "./studentEntityMapping";
import ProfessorEntity from "./professorEntityMapping";
import BaseEntityMapping from "./baseEntityMapping";
import ProjectEntity from "./projectEntityMapping";
import { TABLE_NAMES } from "../constants/tableNames";

class ResearcherEntityMapping extends BaseEntityMapping {
    declare id: number
    declare name: string
    declare functionName: string
    declare weeklyHours: number
    declare startDate: Date
    declare endDate?: Date
    declare projectId: number
    declare studentId?: number
    declare professorId?: number
}

ResearcherEntityMapping.init(
    ResearcherEntityMapping.buildBaseAttributes({
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
        functionName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: {
                    args: [3],
                    msg: "Function name should have at least 3 characters"
                },
                max: {
                    args: [100],
                    msg: "Function name should have up to 100 characters"
                },
                notEmpty: {
                    args: true,
                    msg: "Function name cannot be empty"
                }
            }
        },
        weeklyHours: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: [1],
                    msg: "Weekly hours should be at least 1"
                },
                max: {
                    args: [44],
                    msg: "Weekly hours should be at most 44"
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
        projectId: {
            type: DataTypes.INTEGER,
            references: {
                model: ProjectEntity,
                key: "id",
            },
            allowNull: false,
        },
        studentId: {
            type: DataTypes.INTEGER,
            references: {
                model: StudentEntity,
                key: "id"
            },
            allowNull: true
        },
        professorId: {
            type: DataTypes.INTEGER,
            references: {
                model: ProfessorEntity,
                key: "id"
            },
            allowNull: true
        },
    }),
    {
        modelName: TABLE_NAMES.RESEARCHER,
        tableName: TABLE_NAMES.RESEARCHER,
        sequelize,
        timestamps: true,
    }
)

ResearcherEntityMapping.belongsTo(ProjectEntity, { as: "Projects", foreignKey: "projectId" })
ResearcherEntityMapping.belongsTo(StudentEntity, { as: "Students", foreignKey: "studentId" })
ResearcherEntityMapping.belongsTo(ProfessorEntity, { as: "Professors", foreignKey: "professorId" })
ProjectEntity.hasMany(ResearcherEntityMapping, { as: "Researchers", foreignKey: "projectId" })

export default ResearcherEntityMapping