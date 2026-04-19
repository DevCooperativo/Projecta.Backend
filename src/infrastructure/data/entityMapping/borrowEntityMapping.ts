import { DataTypes } from "sequelize";
import sequelize from "../sequelize";
import StudentEntity from "./studentEntityMapping";
import ProfessorEntity from "./professorEntityMapping";
import EquipmentEntity from "./equipmentEntity";
import BaseEntityMapping from "./baseEntityMapping";
import { TABLE_NAMES } from "../constants/tableNames";

class BorrowEntityMapping extends BaseEntityMapping {
    declare id: number
    declare equipmentId: number
    declare studentId?: number
    declare professorId?: number
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
            allowNull: true
        },
    },),
    {
        modelName: TABLE_NAMES.BORROW,
        tableName: TABLE_NAMES.BORROW,
        sequelize
    })

BorrowEntityMapping.belongsTo(StudentEntity, { as: "Students", foreignKey: "studentId", })
BorrowEntityMapping.belongsTo(ProfessorEntity, { as: "Professors", foreignKey: "professorId", })
BorrowEntityMapping.belongsTo(EquipmentEntity, { as: "Equipments", foreignKey: "equipmentId", })

export default BorrowEntityMapping