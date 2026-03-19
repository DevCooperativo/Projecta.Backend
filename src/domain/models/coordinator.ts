import BaseModel from "../abstractions/BaseModel";

class Coordinator extends BaseModel {
    area?: string
    startDate?: Date
    endDate?: Date
    professorId: string
    projectId?: string

    constructor(professorId: string, projectId?: string, area?: string, startDate?: Date, endDate?: Date) {
        super()
        this.professorId = professorId
        this.projectId = projectId
        this.area = area
        this.startDate = startDate
        this.endDate = endDate
    }
}
export default Coordinator