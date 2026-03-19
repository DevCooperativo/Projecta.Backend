import {
    DataTypes,
    Model,
} from "sequelize";

abstract class BaseEntityMapping extends Model {
    declare id: number;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare isVisible: boolean;

    static buildBaseAttributes<T extends Record<string, unknown>>(attributes: T): T {
        const baseAttributes = {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            isVisible: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        };

        return {
            ...baseAttributes,
            ...attributes,
        } as T;
    }


}

export default BaseEntityMapping