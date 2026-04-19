export class BorrowDTO {
    id: number
    equipmentId: number
    studentId?: number
    professorId?: number
    isStillBorrowed: boolean
    borrowDate: Date
    returnDate?: Date
    createdAt: Date
    updatedAt: Date
    isVisible: boolean
    constructor() { }
}
