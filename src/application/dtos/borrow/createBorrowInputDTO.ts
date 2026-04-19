export class CreateBorrowInputDTO{
    constructor(
        readonly equipmentId: number,
        readonly borrowDate: Date,
        readonly studentId?: number,
        readonly professorId?: number,
        readonly returnDate?: Date
    ){}
}