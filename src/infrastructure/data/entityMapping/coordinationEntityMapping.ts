import sequelize from "infrastructure/data/sequelize"
import { DataTypes } from "sequelize";
import BaseEntityMapping from "./baseEntityMapping";
import { TABLE_NAMES } from "../constants/tableNames";


class CoordinationEntityMapping extends BaseEntityMapping {
    declare id: number
}
CoordinationEntityMapping.init(
    CoordinationEntityMapping.buildBaseAttributes({
        area: {
            type: DataTypes.STRING,
            allowNull: false
        },
        block: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }),
    {
        modelName: TABLE_NAMES.COORDINATION,
        sequelize
    }
);

export default CoordinationEntityMapping