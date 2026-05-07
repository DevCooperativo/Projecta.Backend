import BaseModel, { IBaseModel } from "@/domain/abstractions/BaseModel";
import { Guard } from "../validations/guard";

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



    static create(equipmentId: number, borrowDate: Date, studentId?: number, professorId?: number,returnDate?: Date) {
        const errors = [
            Guard.againstNullOrUndefined(equipmentId, "Equipment ID is required"),
            Guard.againstNullOrUndefined(borrowDate, "Borrow date is required"),
            (studentId === undefined && professorId === undefined) ? "Either student ID or professor ID must be provided" : null,
        ].filter((e): e is string => e !== null)
        this.throwDomainException(errors)
        return new Borrow(equipmentId, borrowDate, true, studentId, professorId, returnDate)
    }

    static rehydrate(id: number, equipmentId: number, borrowDate: Date, studentId: number | undefined, professorId: number | undefined, isStillBorrowed: boolean, returnDate: Date | undefined, createdAt: Date, updatedAt: Date, isVisible: boolean) {
        const borrow = new Borrow(equipmentId, borrowDate, isStillBorrowed, studentId, professorId, returnDate)
        borrow.id = id
        borrow.createdAt = createdAt
        borrow.updatedAt = updatedAt
        borrow.isVisible = isVisible
        return borrow
    }

    public userCanModify(userId: number, userType: "student" | "professor") {
        if (userType === "professor" && this.professorId === userId) return true
        if (userType === "student" && this.studentId === userId) return true
        return false
    }

    public changeBorrower(borrowerId: number, borrowerType: "student" | "professor") {
        const errors = [
            Guard.against(borrowerType === "professor" && borrowerId === this.professorId, "You cannot change the borrower to the same user that  it's already borrowing"),
            Guard.against(borrowerType === "student" && borrowerId === this.studentId, "You cannot change the borrower to the same user that  it's already borrowing")
        ].filter(e => e !== null)
        this.throwDomainException(errors);
        if (borrowerType === "professor") {
            this.studentId = undefined;
            this.professorId = borrowerId;
        }
        else {
            this.studentId = borrowerId;
            this.professorId = undefined;
        }
        this.updateTimestamps();
    }

    public changeEquipment(equipmentId: number) {
        const errors = [
            Guard.against(equipmentId <= 0, "Invalid equipment id")
        ].filter(e => e !== null)
        this.throwDomainException(errors)

        this.equipmentId = equipmentId;
        this.updateTimestamps()
    }


    public changeBorrowState(borrowState: boolean) {
        const errors = [
            Guard.against(borrowState === this.isStillBorrowed, "You can't change it to the same borrow state"),
        ].filter(e => e !== null)
        this.throwDomainException(errors)

        if (!borrowState) {
            this.returnDate = undefined;
        }
        else {
            this.returnDate = new Date();
        }
        this.isStillBorrowed = borrowState;
        this.updateTimestamps();
    }

    public changeBorrowDate(borrowDate: Date) {
        const errors = [
            Guard.againstFutureDate(borrowDate, "The new borrow date cannot be in the future"),
        ].filter(e => e !== null)
        this.throwDomainException(errors);
        this.borrowDate = borrowDate;
        this.updateTimestamps();
    }


    public returnBorrowedItem() {
        const errors = [
            Guard.against(!this.isStillBorrowed, "Item is already returned."),
        ].filter((e): e is string => e !== null)
        this.throwDomainException(errors)

        this.isStillBorrowed = false;
        this.returnDate = new Date()
        this.updateTimestamps()
    }
}

export default Borrow
