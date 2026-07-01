import { AccountType } from "@/infrastructure/authentication/constants/accountType";

export class UpdateAdministratorInputDTO {
    constructor(
        readonly adminId: number,
        readonly userEmail: string,
        readonly accountType: AccountType,
        readonly name: string
    ) { }
}
