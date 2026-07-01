import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";
import ProfessorEntityMapping from "./professorEntityMapping";

class LaboratoryEntity extends Model {
    declare id: number
    declare name: string
    declare maxOccupants: number
    declare storageSpace: boolean
    declare description: string
    declare professorId: number
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
        allowNull: false,
        validate: {
            len: {
                args: [3, 100],
                msg: "Name should have between 3 and 100 characters"
            },
            notEmpty: {
                msg: "Name cannot be empty"
            }
        }
    },
    maxOccupants: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [1],
                msg: "The minimum amount of occupants is 1"
            },
            isInt: {
                msg: "Max occupants must be an integer"
            }
        }
    },
    storageSpace: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
        validate: {
            len: {
                args: [10, 500],
                msg: "Description should have between 10 and 500 characters"
            },
            notEmpty: {
                msg: "Description cannot be empty"
            }
        }
    },
    professorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ProfessorEntityMapping,
            key: "id"
        },
        validate: {
            isInt: {
                msg: "Professor ID must be an integer"
            },
            min: {
                args: [1],
                msg: "Professor ID must be greater than 0"
            }
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
},
    {
        modelName: "laboratories",
        tableName: "laboratories",
        sequelize
    })

LaboratoryEntity.belongsTo(ProfessorEntityMapping, { as: "Professors", foreignKey: "professorId" })

export default LaboratoryEntity