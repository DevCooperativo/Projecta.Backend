import BaseModel from "../abstractions/BaseModel";
class Student extends BaseModel {
    name: string
    email: string
    course: string
    registration: string
    constructor(name: string, email: string, course: string, registration: string) {
        super()
        this.name = name
        this.email = email
        this.course = course
        this.registration = registration
    }

}

export default Student