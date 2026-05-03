import { AccountType } from "@/infrastructure/authentication/constants/accountType";

export class UpdateProfessorInputDTO {
    constructor(
        readonly userEmail: string,
        readonly accountType: AccountType,
        readonly name: string,
        readonly registration: string,
        readonly telephone?: string,
    ) { }
}
