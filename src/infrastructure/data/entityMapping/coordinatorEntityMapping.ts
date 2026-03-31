import sequelize from "infrastructure/data/sequelize"
import { DataTypes } from "sequelize";
import ProfessorEntity from "./professorEntity";
import BaseEntityMapping from "./baseEntityMapping";
import { TABLE_NAMES } from "../constants/tableNames";
import ProjectEntity from "./projectEntity";

class CoordinatorEntityMapping extends BaseEntityMapping {
    declare id: number
    declare area: string
    declare startDate: Date
    declare endDate?: Date
    declare professorId: number
    declare projectId: number
}

CoordinatorEntityMapping.init(
    CoordinatorEntityMapping.buildBaseAttributes({
        area: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        professorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ProfessorEntity,
                key: "id",
            },
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: ProjectEntity,
                key: "id",
            },
        },
    }),
    {
        modelName: TABLE_NAMES.COORDINATOR,
        tableName: TABLE_NAMES.COORDINATOR,
        sequelize,
        timestamps: true,
    }
);

CoordinatorEntityMapping.belongsTo(ProfessorEntity, { as: "Professors", foreignKey: "professorId" })
CoordinatorEntityMapping.belongsTo(ProjectEntity, { as: "Projects", foreignKey: "projectId" })

export default CoordinatorEntityMapping