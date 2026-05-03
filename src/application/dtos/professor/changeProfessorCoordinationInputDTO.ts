import { AccountType } from "@/infrastructure/authentication/constants/accountType";

export class ChangeProfessorCoordinationInputDTO {
    constructor(
        readonly userEmail: string,
        readonly profileType: AccountType,
        readonly coordinationId: number,
    ) { }
}
