import { sequelize } from "@/server";
import { DataTypes } from "sequelize";
import FundingNotice from "./fundingNotice";
import Project from "./Project";
import Laboratory from "./Laboratory";

const Item = sequelize.define(
    'Item',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        originalValue: {
            type: DataTypes.DOUBLE,
            allowNull: false,

        },
        fundingNoticeId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: FundingNotice,
                key: "id"
            }
        },
        containerId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                key: "id"
            }
        },
        laboratoryId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: Laboratory,
                key: "id"
            }
        },
        cacheLaboratoryId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Laboratory,
                key: "id"
            }
        },
        projectId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: Project,
                key: "id"
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
Item.belongsTo(FundingNotice)
Item.belongsTo(Item)
Item.belongsTo(Laboratory)
Item.belongsTo(Project)
export default Item