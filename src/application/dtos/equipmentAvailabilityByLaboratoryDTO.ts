export class EquipmentAvailabilityByLaboratoryDTO {
    constructor(
        readonly laboratoryId: number,
        readonly laboratoryName: string,
        readonly equipmentName: string,
        readonly categoryId: number,
        readonly categoryDescription: string,
        readonly categoryPowerSource: string,
        readonly totalQuantity: number,
        readonly availableQuantity: number
    ) { }
}
