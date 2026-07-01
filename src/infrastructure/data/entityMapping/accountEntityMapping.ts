import { DataTypes } from "sequelize";
import sequelize from "../sequelize";
import BaseEntityMapping from "./baseEntityMapping";
import { TABLE_NAMES } from "../constants/tableNames";

class AccountEntityMapping extends BaseEntityMapping {
    declare id: number
    declare email: string
    declare passwordHash: string
    declare createdAt: Date
    declare updatedAt: Date
    declare isVisible: boolean
}
AccountEntityMapping.init(
    AccountEntityMapping.buildBaseAttributes({
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                name: "unique_email",
                msg: "Emails must be unique"
            },
            validate: {
                isEmail: { msg: "'Email' must be a valid email" }
            }
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }),
    {
        modelName: TABLE_NAMES.ACCOUNT,
        tableName: TABLE_NAMES.ACCOUNT,
        sequelize
    }
)

export default AccountEntityMapping
