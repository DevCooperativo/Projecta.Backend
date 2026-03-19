import BaseModel from "../abstractions/BaseModel";
class Professor extends BaseModel{
    name: string
    email: string
    telephone?: string
    registration: string
    coordinationId?: number

    constructor(name: string, email: string, registration:string, telephone: string = "", coordinationId?: number){
        super()
        this.name= name
        this.email = email
        this.telephone = telephone
        this.registration = registration
        this.coordinationId = coordinationId
    }
}
export default Professor