import { BorrowMetricsDTO } from "../dtos/borrow/borrowMetricsDTO"

export interface IBorrowMetricsServices {
    GetOwnMetricsAsync: () => Promise<BorrowMetricsDTO>
}
