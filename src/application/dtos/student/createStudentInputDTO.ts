import { ShiftsType } from "@/domain/constants/shifts";

export class CreateStudentInputDTO {
    constructor(
        readonly name: string,
        readonly email: string,
        readonly registration: string,
        readonly birthdate: Date,
        readonly term: number,
        readonly shift: ShiftsType
    ) {}
}
