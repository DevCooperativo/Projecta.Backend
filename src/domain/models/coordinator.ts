import BaseModel from "../abstractions/BaseModel";

class Coordinator extends BaseModel {
    area: string
    startDate: Date
    endDate?: Date
    professorId: number
    projectId: number

    constructor(area: string, startDate: Date, professorId: number, projectId: number, endDate?: Date) {
        super()
        this.area = area
        this.startDate = startDate
        this.endDate = endDate
        this.professorId = professorId
        this.projectId = projectId
    }
}
export default Coordinator