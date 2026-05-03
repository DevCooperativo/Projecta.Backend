import { AccountType } from "@/infrastructure/authentication/constants/accountType";

export class UpdateStudentInputDTO {
    constructor(
        readonly userEmail: string,
        readonly accountType: AccountType,
        readonly name?: string,
        readonly birthdate?: Date,
    ) {}
}
