import BaseModel from "../abstractions/BaseModel";

class ProjectCategory extends BaseModel {
    name: string
    commerciallyRelevant: boolean
    area: string
    description: string

    constructor(name: string, commerciallyRelevant: boolean, area: string, description: string) {
        super()
        this.name = name
        this.commerciallyRelevant = commerciallyRelevant
        this.area = area
        this.description = description
    }
}

export default ProjectCategory