import { AccountTypeType } from "infrastructure/authentication/constants/accountType"

export class SigninReturnDTO {
    constructor(public readonly email: string, public readonly token: string, public readonly accountType: AccountTypeType) {

    }
}