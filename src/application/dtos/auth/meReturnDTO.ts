import { AccountType } from "@/infrastructure/authentication/constants/accountType";

export class MeReturnDTO {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly email: string,
        public readonly profileType: AccountType
    ) { }
}