export class UpdateBorrowReturnDTO {
    constructor(
        readonly id: number,
        readonly equipmentId: number,
        readonly borrowDate: Date,
        readonly isStillBorrowed: boolean,
        readonly studentId?: number,
        readonly professorId?: number,
        readonly returnDate?: Date
    ) {}
}
