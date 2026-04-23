import { ShiftsType } from "@/domain/constants/shifts";

export class UpdateStudentInputDTO {
    constructor(
        readonly creatorId: number,
        readonly name: string,
        readonly registration: string,
        readonly birthdate: Date,
        readonly term: number,
        readonly shift: ShiftsType
    ) {}
}
