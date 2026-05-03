import { Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IProjectServices from "@/application/interfaces/iProjectServices";
import CreateProjectInputDTO from "@/application/dtos/project/createProjectInputDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class CreateProjectController implements BaseController {
    constructor(
        @inject("ProjectServices")
        private readonly projectServices: IProjectServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const { name, description, startDate, endDate, status, laboratoryId, projectCategoryId, coordinators, researchers } = req.body
            const dto = new CreateProjectInputDTO()
            dto.name = name
            dto.description = description
            dto.startDate = startDate
            dto.endDate = endDate
            dto.status = status
            dto.laboratoryId = laboratoryId
            dto.projectCategoryId = projectCategoryId
            dto.coordinators = coordinators
            dto.researchers = researchers
            const result = await this.projectServices.CreateAsync(dto)
            return res.status(201).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default CreateProjectController
