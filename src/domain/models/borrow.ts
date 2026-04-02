import BaseModel from "domain/abstractions/BaseModel";

class Borrow extends BaseModel {
    equipmentId: number
    studentId?: number
    professorId?: number
    isStillBorrowed: boolean
    borrowDate: Date
    returnDate?: Date

    constructor(equipmentId: number, borrowDate: Date, isStillBorrowed: boolean, studentId?: number, professorId?: number, returnDate?: Date) {
        super()
        this.equipmentId = equipmentId
        this.borrowDate = borrowDate
        this.studentId = studentId
        this.professorId = professorId
        this.isStillBorrowed = isStillBorrowed
        this.returnDate = returnDate
    }
}
export default Borrow