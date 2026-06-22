export class BorrowDTO {
    constructor(
        readonly id: number,
        readonly equipmentId: number,
        readonly isStillBorrowed: boolean,
        readonly borrowDate: Date,
        readonly isVisible: boolean,
        readonly createdAt: Date,
        readonly updatedAt: Date,
        readonly student: { id: number; name: string } | null,
        readonly professor: { id: number; name: string } | null,
        readonly returnDate?: Date,
    ) { }
}