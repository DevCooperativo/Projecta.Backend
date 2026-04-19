import BaseModel, { IBaseModel } from "@/domain/abstractions/BaseModel";
import { Guard } from "../validations/guard";
import DomainException from "../exceptions/domainException";

export interface IBorrow extends IBaseModel {
    equipmentId: number
    studentId?: number
    professorId?: number
    isStillBorrowed: boolean
    borrowDate: Date
    returnDate?: Date
}

class Borrow extends BaseModel implements IBorrow {
    equipmentId: number
    studentId?: number
    professorId?: number
    isStillBorrowed: boolean
    borrowDate: Date
    returnDate?: Date

    private constructor(equipmentId: number, borrowDate: Date, isStillBorrowed: boolean, studentId?: number, professorId?: number, returnDate?: Date) {
        super()
        this.equipmentId = equipmentId
        this.borrowDate = borrowDate
        this.studentId = studentId
        this.professorId = professorId
        this.isStillBorrowed = isStillBorrowed
        this.returnDate = returnDate
    }
    static create(equipmentId: number, borrowDate: Date, studentId?: number, professorId?: number, isStillBorrowed: boolean = true, returnDate?: Date) {
        Guard.againstNullOrUndefined(equipmentId, "Equipment ID is required")
        Guard.againstNullOrUndefined(borrowDate, "Borrow date is required")
        if (studentId === undefined && professorId === undefined) {
            throw new DomainException("Missing data", "Either student ID or professor ID must be provided")
        }

        return new Borrow(equipmentId, borrowDate, isStillBorrowed, studentId, professorId, returnDate)
    }
    static rehydrate(id: number, equipmentId: number, borrowDate: Date, studentId: number | undefined, professorId: number | undefined, isStillBorrowed: boolean, returnDate: Date | undefined, createdAt: Date, updatedAt: Date, isVisible: boolean) {
        const borrow = new Borrow(equipmentId, borrowDate, isStillBorrowed, studentId, professorId, returnDate)
        borrow.id = id
        borrow.createdAt = createdAt
        borrow.updatedAt = updatedAt
        borrow.isVisible = isVisible
        return borrow
    }
}
export default Borrow