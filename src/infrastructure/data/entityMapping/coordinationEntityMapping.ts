import sequelize from "@/infrastructure/data/sequelize"
import { DataTypes } from "sequelize";
import BaseEntityMapping from "./baseEntityMapping";
import { TABLE_NAMES } from "../constants/tableNames";


class CoordinationEntityMapping extends BaseEntityMapping {
    declare id: number
    declare area: string
    declare block: string
    declare description: string
}
CoordinationEntityMapping.init(
    CoordinationEntityMapping.buildBaseAttributes({
        area: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 100],
                    msg: "Area should have between 3 and 100 characters"
                },
                notEmpty: {
                    args: true,
                    msg: "Area cannot be empty"
                }
            }
        },
        block: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Block cannot be empty"
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [10, 500],
                    msg: "Description should have between 10 and 500 characters"
                },
                notEmpty: {
                    args: true,
                    msg: "Description cannot be empty"
                }
            }
        }
    }),
    {
        modelName: TABLE_NAMES.COORDINATION,
        tableName: TABLE_NAMES.COORDINATION,
        sequelize,
        timestamps: true,
    }
);

export default CoordinationEntityMapping