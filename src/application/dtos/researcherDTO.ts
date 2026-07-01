class ResearcherDTO {
    id: number
    name: string
    functionName: string
    weeklyHours: number
    startDate: Date
    endDate?: Date
    projectId: number
    studentId?: number
    professorId?: number
    createdAt: Date
    updatedAt: Date
    isVisible: boolean
    constructor() { }
}
export default ResearcherDTO
