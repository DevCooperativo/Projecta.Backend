import { AccountType } from "@/infrastructure/authentication/constants/accountType";

export class UpdateProfileInputDTO {
    constructor(
        readonly userEmail: string,
        readonly accountType: AccountType,
        readonly name?: string,
        readonly birthdate?: Date,
        readonly registration?: string,
        readonly telephone?: string,
    ) { }
}
