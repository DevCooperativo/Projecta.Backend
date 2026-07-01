class ProjectDTO {
    id: number
    name: string
    description: string
    startDate: Date
    endDate?: Date
    status: string
    laboratoryId: number
    projectCategoryId: number
    createdAt: Date
    updatedAt: Date
    isVisible: boolean
    participantCount?: number
    constructor() { }
}
export default ProjectDTO
