export class EquipmentAvailabilityByLaboratoryDTO {
    constructor(
        readonly laboratoryId: number,
        readonly laboratoryName: string,
        readonly equipmentName: string,
        readonly isBorrowed: boolean,
        readonly categoryId: number,
        readonly categoryDescription: string,
        readonly categoryPowerSource: string,
        readonly projectId: number,
        readonly projectName: string,
        readonly totalQuantity: number,
        readonly availableQuantity: number
    ) { }
}
