import sequelize from "infrastructure/data/sequelize"
import { DataTypes } from "sequelize";
import ProfessorEntity from "./professorEntity";
import BaseEntityMapping from "./baseEntityMapping";
class CoordinatorEntityMapping extends BaseEntityMapping {
    declare id: number
    declare professorId: string
    declare createdAt: Date
    declare updatedAt: Date
    declare isVisible: boolean
}
CoordinatorEntityMapping.init(
    CoordinatorEntityMapping.buildBaseAttributes({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        professorId: {
            type: DataTypes.INTEGER,
            references: {
                model: ProfessorEntity,
                key: "id",
            }
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
        modelName: 'Coordinators',
        sequelize
    }
);
CoordinatorEntityMapping.belongsTo(ProfessorEntity, { as: "Professors", foreignKey: "professorId" })

export default CoordinatorEntityMapping