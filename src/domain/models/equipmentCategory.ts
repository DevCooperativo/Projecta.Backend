import BaseModel from "../abstractions/BaseModel";
import { EquipmentPowerSourcesType } from "domain/constants/equipmentPowerSources";

class EquipmentCategory extends BaseModel {
    powerSource: EquipmentPowerSourcesType
    fragile: boolean
    description: string

    constructor(powerSource: EquipmentPowerSourcesType, fragile: boolean, description: string) {
        super()
        this.powerSource = powerSource
        this.fragile = fragile
        this.description = description
    }
}

export default EquipmentCategory