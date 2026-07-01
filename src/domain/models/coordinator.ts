import { Guard } from "@/domain/validations/guard";
import BaseModel, { IBaseModel } from "../abstractions/BaseModel";

export interface ICoordinator extends IBaseModel {
    area: string
    startDate: Date
    endDate?: Date
    professorId: number
    projectId: number
}

class Coordinator extends BaseModel implements ICoordinator {
    area: string
    startDate: Date
    endDate?: Date
    professorId: number
    projectId: number

    private constructor(area: string, startDate: Date, professorId: number, projectId: number, endDate?: Date) {
        super()
        this.area = area
        this.startDate = startDate
        this.endDate = endDate
        this.professorId = professorId
        this.projectId = projectId
    }

    static create(area: string, startDate: Date, professorId: number, projectId: number, endDate?: Date): Coordinator {
        const errors = [
            Guard.againstNullOrUndefined(area, "Area is required"),
            Guard.againstRangeLenght(area, 3, 100, "Area must be between 3 and 100 characters"),
            Guard.againstNullOrUndefined(startDate, "Start date is required"),
            Guard.againstNullOrUndefined(professorId, "Professor ID is required"),
            Guard.against(professorId != null && professorId <= 0, "Professor ID must be a positive integer"),
            Guard.againstNullOrUndefined(projectId, "Project ID is required"),
            Guard.against(projectId != null && projectId <= 0, "Project ID must be a positive integer"),
        ].filter((e): e is string => e !== null)
        this.throwDomainException(errors)
        return new Coordinator(area, startDate, professorId, projectId, endDate)
    }

    static rehydrate(id: number, area: string, startDate: Date, professorId: number, projectId: number, endDate?: Date, createdAt?: Date, updatedAt?: Date, isVisible?: boolean): Coordinator {
        const coordinator = new Coordinator(area, startDate, professorId, projectId, endDate)
        coordinator.id = id
        coordinator.createdAt = createdAt ?? new Date()
        coordinator.updatedAt = updatedAt ?? new Date()
        coordinator.isVisible = isVisible ?? true
        return coordinator
    }
}

export default Coordinator
