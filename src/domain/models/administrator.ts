import BaseModel from "../abstractions/BaseModel";

class Administrator extends BaseModel {
    email: string

    constructor(email: string) {
        super()
        this.email = email
    }
}

export default Administrator