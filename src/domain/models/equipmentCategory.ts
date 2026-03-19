import BaseModel from "../abstractions/BaseModel";

class EquipmentCategory extends BaseModel {
    powerSource: string
    fragile: boolean
    description: string

    constructor(powerSource: string, fragile: boolean, description: string) {
        super()
        this.powerSource = powerSource
        this.fragile = fragile
        this.description = description
    }
}

export default EquipmentCategory