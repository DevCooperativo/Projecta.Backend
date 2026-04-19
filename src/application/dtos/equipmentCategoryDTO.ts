import { EquipmentPowerSourcesType } from "@/domain/constants/equipmentPowerSources";

export class EquipmentCategoryDTO {
    id: number
    createdAt: Date
    updatedAt: Date
    isVisible: boolean
    powerSource: EquipmentPowerSourcesType
    fragile: boolean
    description: string
    constructor() { }
}