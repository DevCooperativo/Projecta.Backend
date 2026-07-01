import { DataTypes } from "sequelize";
import sequelize from "../sequelize";
import BaseEntityMapping from "./baseEntityMapping";
import { TABLE_NAMES } from "../constants/tableNames";

class AdministratorEntityMapping extends BaseEntityMapping {
    declare id: number
    declare name: string
    declare email: string
    declare createdAt: Date
    declare updatedAt: Date
    declare isVisible: boolean
}
AdministratorEntityMapping.init(
    AdministratorEntityMapping.buildBaseAttributes({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 100],
                    msg: "Name must have between 3 and 100 characters"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                name: "unique_email",
                msg: "Emails must be unique"
            },
            validate: {
                isEmail: { msg: "'Email' must be a valid email" }
            }
        },
    },),
    {
        modelName: TABLE_NAMES.ADMINISTRATOR,
        tableName: TABLE_NAMES.ADMINISTRATOR,
        sequelize
    })

export default AdministratorEntityMapping