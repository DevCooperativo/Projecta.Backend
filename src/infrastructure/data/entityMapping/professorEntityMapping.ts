import { sequelize } from "infrastructure/data/sequelize";
import { DataTypes } from "sequelize";
import { TABLE_NAMES } from "../constants/tableNames";
import BaseEntityMapping from "./baseEntityMapping";
class ProfessorEntityMapping extends BaseEntityMapping {
    declare registration: string
    declare name: string
    declare email: string
    declare telephone: string
    declare coordinationId: number
}
ProfessorEntityMapping.init(
    ProfessorEntityMapping.buildBaseAttributes({
        

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                min:{
                    args: [3],
                    msg: "Name should have at least 3 characters"
                },
                max:{
                    args: [100],
                    msg: "Name should have up to 100 characters"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Emails must be unique",
                name: "unique_email"
            },
            validate: {
                isEmail: { msg: "'Email' must be a valid email" }
            }
        },
        telephone:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/,
                    msg: "'Telephone' must be a valid Brazilian phone number"
                }
            }
        },
        registration: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: "unique_registration",
                msg: "Registrations must be unique"
            }
        },
        coordinationId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                key: "id",
                model: TABLE_NAMES.COORDINATION
             }
        }
    },), {
    modelName: TABLE_NAMES.PROFESSOR,
    tableName: TABLE_NAMES.PROFESSOR,
    sequelize,
}
)

ProfessorEntityMapping.belongsTo(sequelize.models.Coordinations, { foreignKey: "coordinationId", as: "coordination" })
export default ProfessorEntityMapping