import { AccountType } from "@/infrastructure/authentication/constants/accountType";

export class CreateBorrowInputDTO {
    constructor(
        readonly equipmentId: number,
        readonly borrowDate: Date,
        readonly userEmail: string,
        readonly accountType: AccountType,
        readonly returnDate?: Date
    ) { }
}