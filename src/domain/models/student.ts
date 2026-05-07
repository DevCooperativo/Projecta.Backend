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
        const errors = [
            Guard.againstNullOrUndefined(name, "Name is required"),
            Guard.againstRangeLenght(name, 3, 100, "Name must be between 3 and 100 characters long"),
            Guard.againstNullOrUndefined(email, "Email is required"),
            Guard.againstRegularExpression(email, /^\S+@\S+\.\S+$/, "Email is invalid"),
            Guard.againstNullOrUndefined(registration, "Registration is required"),
            Guard.againstNullOrUndefined(birthdate, "Birthdate is required"),
            Guard.againstInvalidDateFormat(birthdate, "Birthdate is invalid. Must be in the format YYYY-MM-DD"),
            Guard.againstFutureDate(birthdate, "Birthdate cannot be in the future"),
            Guard.againstNullOrUndefined(term, "Term is required"),
            Guard.againstNullOrUndefined(shift, "Shift is required"),
            Guard.against(!Object.values(Shifts).includes(shift), `The student's shift is not a valid shift (${Object.values(Shifts).join(", ")})`)
        ].filter((e): e is string => e !== null)
        this.throwDomainException(errors);
        return new Student(name, email, registration, birthdate, term, shift)
    }

    public updatePersonalData(name?: string, birthdate?: Date) {
        const errors = [
            Guard.against((name !== undefined && name !== null) && (name.length < 3 || name.length > 100), "Name must be between 3 and 100 characters long"),
            Guard.againstInvalidDateFormat(birthdate, "Birthdate is invalid. Must be in the format YYYY-MM-DD"),
            Guard.againstFutureDate(birthdate, "Birthdate cannot be in the future"),
        ].filter((e): e is string => e !== null)
        this.throwDomainException(errors);
        this.name = name ?? this.name;
        this.birthdate = birthdate ?? this.birthdate;
        this.updateTimestamps();
    }

    public changeShift(newShift: ShiftsType) {
        const errors = [
            Guard.againstNullOrUndefined(newShift, "The new shift is required"),
            Guard.against(!Object.values(Shifts).includes(newShift), `The new shift is not a valid shift (${Object.values(Shifts).join(", ")})`)
        ].filter(e => e !== null)
        this.throwDomainException(errors)

        this.shift = newShift;
        this.updateTimestamps()
    }
    public changeTerms(newTerm: number) {
        const errors = [
            Guard.againstNullOrUndefined(newTerm, "The new term is required"),
            Guard.against(newTerm <= 0, "The new term must be a valid term")
        ].filter(e => e !== null)
        this.throwDomainException(errors)
        this.term = newTerm
        this.updateTimestamps()
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
