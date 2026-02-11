import sequelize from "infrastructure/data/sequelize"
import { DataTypes, Model } from "sequelize";

class StudentEntity extends Model {
    declare id: number
    declare course: string
    declare registration: string
    declare createdAt: Date
    declare updatedAt: Date
    declare status: boolean
}
StudentEntity.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        course: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: {
                    args: [3],
                    msg: "Course should have at least 3 characters"
                },
                max: {
                    args: [100],
                    msg: "Course should have up to 100 characters"
                },
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
        },
    },
    {
        sequelize,
        modelName: "Students"
    }
)

export default StudentEntity