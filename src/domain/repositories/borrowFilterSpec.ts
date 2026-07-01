export class BorrowFilterSpec {
    constructor(
        readonly q?: string,
        readonly borrowerId?: number,
        readonly borrowerType?: 'professor' | 'student',
        readonly startPeriod?: Date,
        readonly endPeriod?: Date
    ) { }
}
