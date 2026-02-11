import sequelize from "infrastructure/data/sequelize"
import { DataTypes, Model } from "sequelize";
class ProjectEntity extends Model {
    declare id: number
    declare name: string
    declare amountEarned: number
    declare createdAt: Date
    declare updatedAt: Date
    declare status: boolean
}
ProjectEntity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amountEarned: {
            type: DataTypes.DOUBLE,
            allowNull: false,
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
        modelName: "Projects"
    }
)
export default ProjectEntity