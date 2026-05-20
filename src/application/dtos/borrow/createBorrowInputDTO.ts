export class CreateBorrowInputDTO {
    constructor(
        readonly equipmentId: number,
        readonly borrowDate: Date,
        readonly returnDate?: Date
    ) {}
}
