import BaseModel from "../abstractions/BaseModel";

class Coordinator extends BaseModel {
    professorId: string
    constructor(professorId: string) {
        super()
        this.professorId = professorId
    }
}
export default Coordinator