import { KnowledgeAreasType } from "domain/constants/knowledgeAreas";

export class ProjectCategoryDTO {
    id: number
    createdAt: Date
    updatedAt: Date
    isVisible: boolean
    name: string
    commerciallyRelevant: boolean
    area: KnowledgeAreasType
    description: string
    constructor() { }
}