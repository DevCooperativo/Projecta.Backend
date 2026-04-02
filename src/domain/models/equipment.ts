import BaseModel from "../abstractions/BaseModel";

class Equipment extends BaseModel {
    name: string
    laboratoryId: number
    projectId: number
    equipmentCategoryId: number

    constructor(name: string, laboratoryId: number, projectId: number, equipmentCategoryId: number) {
        super()
        this.name = name
        this.laboratoryId = laboratoryId
        this.projectId = projectId
        this.equipmentCategoryId = equipmentCategoryId
    }
}
export default Equipment
