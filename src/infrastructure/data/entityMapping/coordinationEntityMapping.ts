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
                min: {
                    args: [3],
                    msg: "Area should have at least 3 characters"
                },
                max: {
                    args: [100],
                    msg: "Area should have up to 100 characters"
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
                min: {
                    args: [10],
                    msg: "Description should have at least 10 characters"
                },
                max: {
                    args: [500],
                    msg: "Description should have up to 500 characters"
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