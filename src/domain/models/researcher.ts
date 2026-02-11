import sequelize from "infrastructure/data/sequelize"
import { DataTypes } from "sequelize";
import BaseModel from "../abstractions/BaseModel";

class Researcher extends BaseModel {
    studentId?: string
    professorId?: string
    constructor(studentId?: string, professorId?: string) {
        super()
        this.studentId = studentId
        this.professorId = professorId
    }
}

export default Researcher