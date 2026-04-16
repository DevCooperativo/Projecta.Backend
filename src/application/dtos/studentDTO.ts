import { ShiftsType } from "domain/constants/shifts"

class StudentDTO {
    id: number
    name: string
    email: string
    password: string
    registration: string
    birthdate: Date
    term: number
    shift: ShiftsType
    createdAt: Date
    updatedAt: Date
    isVisible: boolean
    constructor() { }
}
export default StudentDTO