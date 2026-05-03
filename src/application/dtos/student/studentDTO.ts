import { ShiftsType } from "@/domain/constants/shifts";

export class StudentDTO {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly email: string,
        readonly registration: string,
        readonly birthdate: Date,
        readonly term: number,
        readonly shift: ShiftsType,
        readonly createdAt: Date,
        readonly updatedAt: Date,
        readonly isVisible: boolean) { }
}