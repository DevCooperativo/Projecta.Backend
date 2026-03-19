import BaseModel from "domain/abstractions/BaseModel";

class Borrow extends BaseModel {
    itemId: number
    studentId?: number
    professorId?: number
    startDate: Date
    endDate?: Date
    isStillBorrowed: boolean

    constructor(itemId: number, startDate: Date, isStillBorrowed: boolean = true, studentId?: number, professorId?: number, endDate?: Date) {
        super()
        this.itemId = itemId
        this.startDate = startDate
        this.isStillBorrowed = isStillBorrowed
        this.studentId = studentId
        this.professorId = professorId
        this.endDate = endDate
    }
}
export default Borrow