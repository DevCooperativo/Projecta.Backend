import { AccountType } from "@/infrastructure/authentication/constants/accountType";

export class ChangeStudentTermInputDTO {
    constructor(
        readonly userEmail: string,
        readonly accountType: AccountType,
        readonly newTerm: number,
    ) { }
}
