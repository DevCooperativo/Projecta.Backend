import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";
import StudentEntity from "./studentEntity";
import ResearcherEntity from "./researcherEntity";
import ProfessorEntity from "./professorEntity";
import ItemEntity from "./itemEntity";

class BorrowEntity extends Model {
    declare id: number
    declare itemId: string
    declare studentId?: string
    declare researcherId?: string
    declare professorId?: string
    declare borrowDate: Date
    declare returnDate?: Date
    declare createdAt: Date
    declare updatedAt: Date
    declare status: boolean
}
BorrowEntity.init({
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
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
},
    {
        modelName: "Borrows",
        tableName: "Borrows",
        sequelize
    })

BorrowEntity.belongsTo(StudentEntity, { as: "Students", foreignKey: "studentId", })
BorrowEntity.belongsTo(ProfessorEntity, { as: "Professors", foreignKey: "professorId", })
BorrowEntity.belongsTo(ResearcherEntity, { as: "Researchers", foreignKey: "researcherId", })
BorrowEntity.belongsTo(ItemEntity, { as: "Itens", foreignKey: "itemId", })

export default BorrowEntity