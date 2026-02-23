import { sequelize } from "infrastructure/data/sequelize";
import { DataTypes, Model } from "sequelize";
class ProfessorEntity extends Model {
    declare id: number
    declare registration: string
    declare name: string
    declare email: string
    declare createdAt: Date
    declare updatedAt: Date
    declare status: boolean
}
ProfessorEntity.init(
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: { msg: "'Email' must be a valid email" }
            }
        },


        registration: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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
    }, {
    modelName: "Professors",
    tableName: "Professors",
    sequelize,
    indexes:[{
        unique: true,
        fields:["email", "registration"]
    }]

}
)
export default ProfessorEntity