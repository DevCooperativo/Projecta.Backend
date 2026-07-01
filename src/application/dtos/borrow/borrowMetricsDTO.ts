export class BorrowMetricsDTO {
    constructor(
        readonly total: number,
        readonly active: number,
        readonly finished: number
    ) { }
}
