import sequelize from "infrastructure/data/sequelize"
import { DataTypes } from "sequelize";
import BaseModel from "../abstractions/BaseModel";

class Project extends BaseModel {
    name: string
    amountEarned: number
    constructor(name: string, amountEarned: number) {
        super()
        this.name = name
        this.amountEarned = amountEarned
    }
}
export default Project