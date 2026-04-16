import BaseModel from "../abstractions/BaseModel";

class Laboratory extends BaseModel {
    name: string
    storageSpace: boolean
    maxOccupants: number
    description: string
    professorId: number

    constructor(name: string, maxOccupants: number, professorId: number, storageSpace: boolean = false, description: string = "") {
        super()
        this.name = name
        this.storageSpace = storageSpace
        this.maxOccupants = maxOccupants
        this.description = description
        this.professorId = professorId
    }
}
export default Laboratory