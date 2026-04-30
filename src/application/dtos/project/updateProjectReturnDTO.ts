class UpdateProjectReturnDTO {
    id: number
    name: string
    description: string
    startDate: Date
    endDate?: Date
    status: string
    laboratoryId: number
    projectCategoryId: number
    updatedAt: Date
    constructor() {}
}

export default UpdateProjectReturnDTO
