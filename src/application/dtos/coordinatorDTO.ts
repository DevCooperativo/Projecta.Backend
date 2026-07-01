class CoordinatorDTO {
    id: number
    area: string
    startDate: Date
    endDate?: Date
    professorId: number
    projectId: number
    createdAt: Date
    updatedAt: Date
    isVisible: boolean
    constructor() { }
}
export default CoordinatorDTO