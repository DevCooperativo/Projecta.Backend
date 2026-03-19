import BaseModel from "../abstractions/BaseModel";

class Researcher extends BaseModel {
    functionName: string
    weeklyHours: number
    startDate: Date
    endDate?: Date
    projectId: number
    studentId?: number
    professorId?: number

    constructor(functionName: string, weeklyHours: number, startDate: Date, projectId: number, studentId?: number, professorId?: number, endDate?: Date) {
        super()
        this.functionName = functionName
        this.weeklyHours = weeklyHours
        this.startDate = startDate
        this.projectId = projectId
        this.studentId = studentId
        this.professorId = professorId
        this.endDate = endDate
    }
}

export default Researcher