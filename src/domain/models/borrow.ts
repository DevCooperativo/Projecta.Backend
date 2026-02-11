import BaseModel from "domain/abstractions/BaseModel";

class Borrow extends BaseModel {
    itemId: string
    studentId?: string
    researcherId?: string
    professorId?: string
    personId: string
    borrowDate: Date
    returnDate: Date
    constructor() {
        super()
    }
}
export default Borrow