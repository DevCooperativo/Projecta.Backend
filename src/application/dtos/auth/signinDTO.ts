import { AccountType } from "@/infrastructure/authentication/constants/accountType";

export class SigninDTO {
    constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly profileType: AccountType
    ) {
    }
}