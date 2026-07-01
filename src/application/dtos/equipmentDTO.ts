class EquipmentDTO {
    id: number
    name: string
    laboratoryId: number
    projectId: number
    equipmentCategoryId: number
    createdAt: Date
    updatedAt: Date
    isVisible: boolean
    constructor() { }
}
export default EquipmentDTO