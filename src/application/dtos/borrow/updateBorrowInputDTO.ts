export class UpdateBorrowInputDTO {
    constructor(
        readonly equipmentId: number,
        readonly borrowDate: Date,
        readonly isStillBorrowed: boolean,
        readonly studentId?: number,
        readonly professorId?: number,
        readonly returnDate?: Date
    ) {}
}
