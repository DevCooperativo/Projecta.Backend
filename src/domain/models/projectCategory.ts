import BaseModel from "../abstractions/BaseModel";
import { KnowledgeAreasType } from "../constants/knowledgeAreas";

class ProjectCategory extends BaseModel {
    name: string
    commerciallyRelevant: boolean
    area: KnowledgeAreasType
    description: string

    constructor(name: string, commerciallyRelevant: boolean, area: KnowledgeAreasType, description: string) {
        super()
        this.name = name
        this.commerciallyRelevant = commerciallyRelevant
        this.area = area
        this.description = description
    }
}

export default ProjectCategory