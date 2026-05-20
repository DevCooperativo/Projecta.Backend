import { AccountType } from "@/infrastructure/authentication/constants/accountType"

export class UserContextDTO {
    constructor(
        readonly email: string,
        readonly accountTypes: AccountType[],
        readonly currentAccountType: AccountType
    ) {}
}
