import {
    DataTypes,
    Model,
    ModelAttributes,
} from "sequelize";

abstract class BaseEntityMapping extends Model {
    declare id: number;
    declare createdAt: Date;
    declare updatedAt: Date;
    declare isVisible: boolean;

    static buildBaseAttributes<T extends ModelAttributes>(attributes: T): T {
        const baseAttributes = {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
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