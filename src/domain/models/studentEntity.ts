import BaseModel from "../abstractions/BaseModel";
class Student extends BaseModel {
    name: string
    email: string
    registration: string
    birthdate: Date
    term: number
    shift: string

    constructor(name: string, email: string, registration: string, birthdate: Date, term: number, shift: string) {
        super()
        this.name = name
        this.email = email
        this.registration = registration
        this.birthdate = birthdate
        this.term = term
        this.shift = shift
    }

}

export default Student