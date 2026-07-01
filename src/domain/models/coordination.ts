import BaseModel from "../abstractions/BaseModel";

class Coordination extends BaseModel {
    area: string;
    block: string;
    description: string;
    constructor(area: string, block: string, description: string) {
        super()
        this.area = area
        this.block = block
        this.description = description
    }
}
export default Coordination