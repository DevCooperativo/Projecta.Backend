export class BorrowDTO {
    constructor(
        readonly id: number,
        readonly equipmentId: number,
        readonly isStillBorrowed: boolean,
        readonly borrowDate: Date,
        readonly isVisible: boolean,
        readonly createdAt: Date,
        readonly updatedAt: Date,
        readonly studentId?: number,
        readonly professorId?: number,
        readonly returnDate?: Date,
    ) { }
}