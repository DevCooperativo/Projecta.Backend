export class LaboratoryDTO {
    id: number
    createdAt: Date
    updatedAt: Date
    isVisible: boolean
    name: string
    storageSpace: boolean
    maxOccupants: number
    description: string
    constructor() { }
}