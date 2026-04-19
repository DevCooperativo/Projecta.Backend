import BaseModel from "../abstractions/BaseModel";
import { Shifts, ShiftsType } from "../constants/shifts";
import { Guard } from "../validations/guard";
class Student extends BaseModel {
    name: string
    email: string
    registration: string
    birthdate: Date
    term: number
    shift: ShiftsType

    private constructor(name: string, email: string, registration: string, birthdate: Date, term: number, shift: ShiftsType) {
        super()
        this.name = name
        this.email = email
        this.registration = registration
        this.birthdate = birthdate
        this.term = term
        this.shift = shift
    }

    static create(name: string, email: string, registration: string, birthdate: Date, term: number, shift: ShiftsType): Student {
        Guard.againstNullOrUndefined(name, "Name is required")
        Guard.againstRangeLenght(name, 3, 100, "Name must be between 3 and 100 characters long")
        Guard.againstNullOrUndefined(email, "Email is required")
        Guard.againstRegularExpression(email, /^\S+@\S+\.\S+$/, "Email is invalid")
        Guard.againstNullOrUndefined(registration, "Registration is required")
        Guard.againstNullOrUndefined(birthdate, "Birthdate is required")
        Guard.againstInvalidDateFormat(birthdate, "Birthdate is invalid. Must be in the format YYYY-MM-DD")
        Guard.againstFutureDate(birthdate, "Birthdate cannot be in the future")
        Guard.againstNullOrUndefined(term, "Term is required")
        Guard.againstNullOrUndefined(shift, "Shift is required")
        Guard.againstValueSet(shift, Shifts, "Shift must be a valid shift")
        return new Student(name, email, registration, birthdate, term, shift)
    }

    update(id: number, name: string, email: string, registration: string, birthdate: Date, term: number, shift: ShiftsType): Student {
        Guard.againstNullOrUndefined(id, "Id is required")
        Guard.againstNullOrUndefined(name, "Name is required")
        Guard.againstRangeLenght(name, 3, 100, "Name must be between 3 and 100 characters long")
        Guard.againstNullOrUndefined(email, "Email is required")
        Guard.againstRegularExpression(email, /^\S+@\S+\.\S+$/, "Email is invalid")
        Guard.againstNullOrUndefined(registration, "Registration is required")
        Guard.againstNullOrUndefined(birthdate, "Birthdate is required")
        Guard.againstInvalidDateFormat(birthdate, "Birthdate is invalid. Must be in the format YYYY-MM-DD")
        Guard.againstFutureDate(birthdate, "Birthdate cannot be in the future")
        Guard.againstNullOrUndefined(term, "Term is required")
        Guard.againstNullOrUndefined(shift, "Shift is required")
        Guard.againstValueSet(shift, Shifts, "Shift must be a valid shift")
        this.name = name
        this.email = email
        this.registration = registration
        this.birthdate = birthdate
        this.term = term
        this.shift = shift
        return this
    }

    public static rehydrate(id: number, name: string, email: string, registration: string, birthdate: Date, term: number, shift: ShiftsType, createdAt: Date, updatedAt: Date, isVisible: boolean): Student {
        const student = new Student(name, email, registration, birthdate, term, shift)
        student.id = id
        student.createdAt = createdAt
        student.updatedAt = updatedAt
        student.isVisible = isVisible
        return student
    }
}

export default Student