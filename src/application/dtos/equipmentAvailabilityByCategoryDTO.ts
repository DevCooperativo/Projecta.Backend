export class EquipmentAvailabilityByCategoryDTO {
    constructor(
        readonly categoryId: number,
        readonly categoryDescription: string,
        readonly categoryPowerSource: string,
        readonly equipmentName: string,
        readonly laboratoryId: number,
        readonly laboratoryName: string,
        readonly totalQuantity: number,
        readonly availableQuantity: number
    ) { }
}
