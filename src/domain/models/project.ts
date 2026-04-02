import BaseModel from "../abstractions/BaseModel";

class Project extends BaseModel {
    name: string
    description: string
    startDate: Date
    endDate?: Date
    status: string
    laboratoryId: number
    projectCategoryId: number

    constructor(name: string, description: string, startDate: Date, status: string, laboratoryId: number, projectCategoryId: number, endDate?: Date) {
        super()
        this.name = name
        this.description = description
        this.startDate = startDate
        this.endDate = endDate
        this.status = status
        this.laboratoryId = laboratoryId
        this.projectCategoryId = projectCategoryId
    }
}
export default Project