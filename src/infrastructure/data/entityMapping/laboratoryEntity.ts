import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

class LaboratoryEntity extends Model {
    declare id: number
    declare name: string
    declare maxOccupants: number
    declare storageSpace: boolean
    declare description: string
    declare createdAt: Date
    declare updatedAt: Date
    declare isVisible: boolean
}

LaboratoryEntity.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    maxOccupants: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [1],
                msg: "The minimum amount of accupants is 1"
            }
        }
    },
    storageSpace: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    description: {
        type: DataTypes.TEXT,
        defaultValue: ""
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
},
    {
        modelName: "Laboratories",
        tableName: "Laboratories",
        sequelize
    })

export default LaboratoryEntity