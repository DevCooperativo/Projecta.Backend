class CreateProjectReturnDTO {
    id: number
    name: string
    description: string
    startDate: Date
    endDate?: Date
    status: string
    laboratoryId: number
    projectCategoryId: number
    createdAt: Date
    constructor() {}
}

export default CreateProjectReturnDTO
