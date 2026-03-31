import { DataTypes } from "sequelize";
import sequelize from "../sequelize";
import StudentEntity from "./studentEntityMapping";
import ResearcherEntity from "./researcherEntity";
import ProfessorEntity from "./professorEntityMapping";
import ItemEntity from "./itemEntity";
import BaseEntityMapping from "./baseEntityMapping";

class BorrowEntityMapping extends BaseEntityMapping {
    declare id: number
    declare itemId: string
    declare studentId?: string
    declare researcherId?: string
    declare professorId?: string
    declare borrowDate: Date
    declare returnDate?: Date
    declare createdAt: Date
    declare updatedAt: Date
    declare isVisible: boolean
}
BorrowEntityMapping.init(
    BorrowEntityMapping.buildBaseAttributes({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        itemId: {
            type: DataTypes.INTEGER,
            references: {
                key: "id",
                model: ItemEntity
            }
        },
        studentId: {
            type: DataTypes.INTEGER,
            references: {
                key: "id",
                model: StudentEntity
            },
            allowNull: true
        },
        researcherId: {
            type: DataTypes.INTEGER,
            references: {
                key: "id",
                model: ResearcherEntity
            },
            allowNull: true
        },
        professorId: {
            type: DataTypes.INTEGER,
            references: {
                key: "id",
                model: ProfessorEntity
            },
            allowNull: true
        },
        borrowDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now()
        },
        returnDate: {
            type: DataTypes.DATE,
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
    },),
    {
        modelName: "Borrows",
        tableName: "Borrows",
        sequelize
    })

BorrowEntityMapping.belongsTo(StudentEntity, { as: "Students", foreignKey: "studentId", })
BorrowEntityMapping.belongsTo(ProfessorEntity, { as: "Professors", foreignKey: "professorId", })
BorrowEntityMapping.belongsTo(ResearcherEntity, { as: "Researchers", foreignKey: "researcherId", })
BorrowEntityMapping.belongsTo(ItemEntity, { as: "Itens", foreignKey: "itemId", })

export default BorrowEntityMapping