import { Guard } from "@/domain/validations/guard";
import BaseModel, { IBaseModel } from "../abstractions/BaseModel";

export interface IProject extends IBaseModel {
    name: string
    description: string
    startDate: Date
    endDate?: Date
    status: string
    laboratoryId: number
    projectCategoryId: number
}

class Project extends BaseModel implements IProject {
    name: string
    description: string
    startDate: Date
    endDate?: Date
    status: string
    laboratoryId: number
    projectCategoryId: number

    private constructor(name: string, description: string, startDate: Date, status: string, laboratoryId: number, projectCategoryId: number, endDate?: Date) {
        super()
        this.name = name
        this.description = description
        this.startDate = startDate
        this.endDate = endDate
        this.status = status
        this.laboratoryId = laboratoryId
        this.projectCategoryId = projectCategoryId
    }

    static create(name: string, description: string, startDate: Date, status: string, laboratoryId: number, projectCategoryId: number, endDate?: Date): Project {
        const errors = [
            Guard.againstNullOrUndefined(name, "Name is required"),
            Guard.againstRangeLenght(name, 3, 100, "Name must be between 3 and 100 characters"),
            Guard.againstNullOrUndefined(description, "Description is required"),
            Guard.againstRangeLenght(description, 10, 500, "Description must be between 10 and 500 characters"),
            Guard.againstNullOrUndefined(startDate, "Start date is required"),
            Guard.againstNullOrUndefined(status, "Status is required"),
            Guard.againstNullOrUndefined(laboratoryId, "Laboratory ID is required"),
            Guard.against(laboratoryId != null && laboratoryId <= 0, "Laboratory ID must be a positive integer"),
            Guard.againstNullOrUndefined(projectCategoryId, "Project category ID is required"),
            Guard.against(projectCategoryId != null && projectCategoryId <= 0, "Project category ID must be a positive integer"),
        ].filter((e): e is string => e !== null)
        this.throwDomainException(errors)
        return new Project(name, description, startDate, status, laboratoryId, projectCategoryId, endDate)
    }

    static rehydrate(id: number, name: string, description: string, startDate: Date, status: string, laboratoryId: number, projectCategoryId: number, endDate?: Date, createdAt?: Date, updatedAt?: Date, isVisible?: boolean): Project {
        const project = new Project(name, description, startDate, status, laboratoryId, projectCategoryId, endDate)
        project.id = id
        project.createdAt = createdAt ?? new Date()
        project.updatedAt = updatedAt ?? new Date()
        project.isVisible = isVisible ?? true
        return project
    }

    update(name: string, description: string, startDate: Date, status: string, laboratoryId: number, projectCategoryId: number, endDate?: Date) {
        const errors = [
            Guard.againstNullOrUndefined(name, "Name is required"),
            Guard.againstRangeLenght(name, 3, 100, "Name must be between 3 and 100 characters"),
            Guard.againstNullOrUndefined(description, "Description is required"),
            Guard.againstRangeLenght(description, 10, 500, "Description must be between 10 and 500 characters"),
            Guard.againstNullOrUndefined(startDate, "Start date is required"),
            Guard.againstNullOrUndefined(status, "Status is required"),
            Guard.againstNullOrUndefined(laboratoryId, "Laboratory ID is required"),
            Guard.against(laboratoryId != null && laboratoryId <= 0, "Laboratory ID must be a positive integer"),
            Guard.againstNullOrUndefined(projectCategoryId, "Project category ID is required"),
            Guard.against(projectCategoryId != null && projectCategoryId <= 0, "Project category ID must be a positive integer"),
        ].filter((e): e is string => e !== null)
        this.throwDomainException(errors)
        this.name = name
        this.description = description
        this.startDate = startDate
        this.status = status
        this.laboratoryId = laboratoryId
        this.projectCategoryId = projectCategoryId
        this.endDate = endDate
        this.updateTimestamps()
    }
}

export default Project
