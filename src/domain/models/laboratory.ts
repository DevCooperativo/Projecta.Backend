import BaseModel from "../abstractions/BaseModel";

class Laboratory extends BaseModel {
    name: string
    storageSpace: boolean
    maxOccupants: number
    description: string

    constructor(name: string, maxOccupants: number, storageSpace: boolean = false, description: string = "") {
        super()
        this.name = name
        this.storageSpace = storageSpace
        this.maxOccupants = maxOccupants
        this.description = description
    }
}
export default Laboratory