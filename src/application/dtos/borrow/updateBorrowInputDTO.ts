import { AccountType } from "@/infrastructure/authentication/constants/accountType";

export class UpdateBorrowInputDTO {
    constructor(
        readonly userEmail: string,
        readonly accountType: AccountType,
        readonly equipmentId: number,
        readonly borrowDate: Date,
        readonly isStillBorrowed: boolean,
        readonly studentId?: number,
        readonly professorId?: number,
        readonly returnDate?: Date
    ) { }
}
