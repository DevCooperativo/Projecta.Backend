import sequelize from "infrastructure/data/sequelize"
import { DataTypes } from "sequelize";
import BaseEntityMapping from "./baseEntityMapping";
import { Shifts, ShiftsType } from "domain/constants/shifts";
import { TABLE_NAMES } from "../constants/tableNames";

class StudentEntityMapping extends BaseEntityMapping {
    declare id: number
    declare course: string
    declare registration: string
    declare createdAt: Date
    declare updatedAt: Date
    declare isVisible: boolean
    declare shift: ShiftsType
}
StudentEntityMapping.init(
    StudentEntityMapping.buildBaseAttributes({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: {
                    args: [3],
                    msg: "Name should have at least 3 characters"
                },
                max: {
                    args: [100],
                    msg: "Name should have up to 100 characters"
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: "unique_email",
                msg: "Emails must be unique"
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: "Email must be valid"
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
        birthdate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: {
                    args: true,
                    msg: "Birthdate must be a valid date"
                },
                isBefore: {
                    args: new Date().toISOString().split("T")[0],
                    msg: "Birthdate must be in the past"
                }
            }
        },
        term: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    args: [1],
                    msg: "Term should be at least 1"
                }
            }
        },
        shift: {
            type: DataTypes.ENUM(...Object.values(Shifts)),
            allowNull: false
        }
    }),
    {
        sequelize,
        modelName: TABLE_NAMES.STUDENT,
        tableName: TABLE_NAMES.STUDENT
    }
)

export default StudentEntityMapping