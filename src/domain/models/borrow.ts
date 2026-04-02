import BaseModel from "domain/abstractions/BaseModel";

class Borrow extends BaseModel {
    equipmentId: number
    studentId?: number
    professorId?: number
    researcherId?: number
    borrowDate: Date
    returnDate?: Date

    constructor(equipmentId: number, borrowDate: Date, studentId?: number, professorId?: number, researcherId?: number, returnDate?: Date) {
        super()
        this.equipmentId = equipmentId
        this.borrowDate = borrowDate
        this.studentId = studentId
        this.professorId = professorId
        this.researcherId = researcherId
        this.returnDate = returnDate
    }
}
export default Borrow