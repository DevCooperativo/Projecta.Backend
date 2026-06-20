import { AccountType } from "@/infrastructure/authentication/constants/accountType"

export class SigninReturnDTO {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly token: string,
        public readonly accountType: AccountType
    ) {}
}