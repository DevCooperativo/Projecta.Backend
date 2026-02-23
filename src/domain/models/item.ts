import sequelize from "infrastructure/data/sequelize"
import { DataTypes } from "sequelize";
import FundingNotice from "./fundingNotice";
import Laboratory from "./laboratory";
import Project from "./project";
import BaseModel from "../abstractions/BaseModel";

class Item extends BaseModel {
    name: string
    originalValue: number
    fundingNoticeId: string
    containerId?: string
    laboratoryId?: string
    cacheLaboratoryId: string
    projectId: string
    constructor(name: string, originalValue: number, fundingNoticeId: string, cacheLaboratoryId: string, projectId: string, containerId?: string, laboratoryId?: string) {
        super()
        this.name = name
        this.originalValue = originalValue
        this.fundingNoticeId = fundingNoticeId
        this.cacheLaboratoryId = cacheLaboratoryId
        this.laboratoryId = laboratoryId
        this.containerId = containerId

    }
}
export default Item