import { AccountType } from "@/infrastructure/authentication/constants/accountType";

export class ReturnBorrowInputDTO {
    constructor(
        readonly userEmail: string,
        readonly accountType: AccountType,
        readonly borrowId: number,
    ) { }
}