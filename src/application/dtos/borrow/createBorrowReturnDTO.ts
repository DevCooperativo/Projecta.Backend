export class CreateBorrowReturnDTO{
    constructor(
        readonly id: number,
        readonly equipmentId: number,
        readonly borrowDate: Date,
        readonly studentId?: number,
        readonly professorId?: number,
    ){}
}