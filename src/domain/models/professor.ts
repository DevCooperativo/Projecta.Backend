import BaseModel from "../abstractions/BaseModel";
class Professor extends BaseModel{
    name: string
    email: string
    registration: string
    constructor(name: string, email: string, registration:string){
        super()
        this.name= name
        this.email = email
        this.registration = registration
    }
}
export default Professor