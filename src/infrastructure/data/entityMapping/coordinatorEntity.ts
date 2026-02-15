import sequelize from "infrastructure/data/sequelize"
import { DataTypes, Model, Sequelize } from "sequelize";
import ProfessorEntity from "./professorEntity";
class CoordinatorEntity extends Model {
    declare id: number
    declare professorId: string
    declare createdAt: Date
    declare updatedAt: Date
    declare status: boolean
}
CoordinatorEntity.init(
    {
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
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        modelName: 'Coordinators',
        sequelize
    }
);
CoordinatorEntity.belongsTo(ProfessorEntity, { as: "Professors", foreignKey: "professorId" })

export default CoordinatorEntity