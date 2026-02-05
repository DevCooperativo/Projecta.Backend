import { sequelize } from "@/server";
import { DataTypes } from "sequelize";

const FundingNotice = sequelize.define(
    "FundingNotice",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fundingAgency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        noticeCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        individualValue: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            validate: {
                min: {
                    args: [0],
                    msg: "Individual value must be greater than 0"
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
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }
)
export default FundingNotice