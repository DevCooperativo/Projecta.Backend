import sequelize from "infrastructure/data/sequelize"
import { DataTypes, Model } from "sequelize";
import StudentEntity from "./studentEntity";
import ProfessorEntity from "./professorEntity";

class ResearcherEntity extends Model {
    declare id: number
    declare studentId: number
    declare professorId: number
    declare createdAt: Date
    declare updatedAt: Date
    declare status: boolean
}
ResearcherEntity.init(
    {
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
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        sequelize,
        modelName: "Researchers"
    }
)

ResearcherEntity.belongsTo(StudentEntity, { as: "Students", foreignKey: "studentId" })
ResearcherEntity.belongsTo(ProfessorEntity, { as: "Professors", foreignKey: "professorId" })

export default ResearcherEntity