import sequelize from "infrastructure/data/sequelize"
import { DataTypes } from "sequelize";
import StudentEntity from "./studentEntityMapping";
import ProfessorEntity from "./professorEntity";
import BaseEntityMapping from "./baseEntityMapping";
import ProjectEntity from "./projectEntity";
import { TABLE_NAMES } from "../constants/tableNames";

class ResearcherEntityMapping extends BaseEntityMapping {
    declare id: number
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
        functionName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        weeklyHours: {
            type: DataTypes.INTEGER,
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

export default ResearcherEntityMapping