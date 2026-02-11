import sequelize from "infrastructure/data/sequelize"
import { DataTypes } from "sequelize";
import BaseModel from "../abstractions/BaseModel";

class Laboratory extends BaseModel {
    name: string
    maxOccupants: number
    constructor(name: string, maxOccupants: number) {
        super()
        this.name = name
        this.maxOccupants = maxOccupants
    }
}
export default Laboratory