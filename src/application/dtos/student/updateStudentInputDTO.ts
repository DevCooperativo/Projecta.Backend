import { ShiftsType } from "@/domain/constants/shifts";

export class UpdateStudentInputDTO {
    constructor(
        readonly name: string,
        readonly email: string,
        readonly registration: string,
        readonly birthdate: Date,
        readonly term: number,
        readonly shift: ShiftsType
    ) {}
}
