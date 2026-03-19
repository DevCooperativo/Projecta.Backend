import sequelize from "infrastructure/data/sequelize"
import { DataTypes } from "sequelize";
import StudentEntity from "./studentEntityMapping";
import ProfessorEntity from "./professorEntity";
import BaseEntityMapping from "./baseEntityMapping";

class ResearcherEntityMapping extends BaseEntityMapping {
    declare id: number
    declare studentId: number
    declare professorId: number
    declare createdAt: Date
    declare updatedAt: Date
    declare isVisible: boolean
}
ResearcherEntityMapping.init(
    ResearcherEntityMapping.buildBaseAttributes({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
    }),
    {
        sequelize,
        modelName: "Researchers"
    }
)

ResearcherEntityMapping.belongsTo(StudentEntity, { as: "Students", foreignKey: "studentId" })
ResearcherEntityMapping.belongsTo(ProfessorEntity, { as: "Professors", foreignKey: "professorId" })

export default ResearcherEntityMapping