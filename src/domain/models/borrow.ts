import BaseModel from "domain/abstractions/BaseModel";

class Borrow extends BaseModel {
    itemId: number
    studentId?: number
    professorId?: number
    researcherId?: number
    borrowDate: Date
    returnDate?: Date

    constructor(itemId: number, borrowDate: Date, studentId?: number, professorId?: number, researcherId?: number, returnDate?: Date) {
        super()
        this.itemId = itemId
        this.borrowDate = borrowDate
        this.studentId = studentId
        this.professorId = professorId
        this.researcherId = researcherId
        this.returnDate = returnDate
    }
}
export default Borrow