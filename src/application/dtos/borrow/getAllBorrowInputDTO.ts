export class GetAllBorrowInputDTO {
    constructor(
        readonly q?: string,
        readonly user?: { id: number; type: 'professor' | 'student' },
        readonly startPeriod?: Date,
        readonly endPeriod?: Date
    ) { }
}