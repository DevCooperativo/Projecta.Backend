import { DataTypes } from "sequelize";
import sequelize from "../sequelize";
import StudentEntity from "./studentEntityMapping";
import ResearcherEntity from "./researcherEntityMappping";
import ProfessorEntity from "./professorEntityMapping";
import EquipmentEntity from "./equipmentEntity";
import BaseEntityMapping from "./baseEntityMapping";

class BorrowEntityMapping extends BaseEntityMapping {
    declare id: number
    declare equipmentId: string
    declare studentId?: string
    declare professorId?: string
    declare borrowDate: Date
    declare returnDate?: Date
    declare isStillBorrowed: boolean
    declare createdAt: Date
    declare updatedAt: Date
    declare isVisible: boolean
}
BorrowEntityMapping.init(
    BorrowEntityMapping.buildBaseAttributes({
        equipmentId: {
            type: DataTypes.INTEGER,
            references: {
                key: "id",
                model: EquipmentEntity
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
        isStillBorrowed:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        returnDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
    },),
    {
        modelName: "Borrows",
        tableName: "Borrows",
        sequelize
    })

BorrowEntityMapping.belongsTo(StudentEntity, { as: "Students", foreignKey: "studentId", })
BorrowEntityMapping.belongsTo(ProfessorEntity, { as: "Professors", foreignKey: "professorId", })
BorrowEntityMapping.belongsTo(ResearcherEntity, { as: "Researchers", foreignKey: "researcherId", })
BorrowEntityMapping.belongsTo(EquipmentEntity, { as: "Equipments", foreignKey: "equipmentId", })

export default BorrowEntityMapping