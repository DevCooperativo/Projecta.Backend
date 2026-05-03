class UpdateProjectInputDTO {
    id: number
    name: string
    description: string
    startDate: Date
    endDate?: Date
    status: string
    laboratoryId: number
    projectCategoryId: number
    coordinators?: Array<{ professorId: number; area: string; startDate: Date; endDate?: Date }>
    researchers?: Array<{ name: string; functionName: string; weeklyHours: number; startDate: Date; endDate?: Date; studentId?: number; professorId?: number }>
    constructor() {}
}

export default UpdateProjectInputDTO
