import { Request, Response } from "express";
import BaseController from "../baseController";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import { inject, injectable } from "tsyringe";
import IProjectServices from "application/interfaces/iProjectServices";
import ProjectDTO from "application/dtos/projectDTO";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";

@injectable()
class CreateProjectController implements BaseController {
    constructor(
        @inject("ProjectServices")
        private readonly projectServices: IProjectServices
    ) { }
    async Handle(req: Request, res: Response) {
        try {
            const { name, fundingNotice, description, startDate, status, laboratoryId, projectCategoryId } = req.body
            CheckRequestPropertiesHelper.CheckRequired({ name, fundingNotice, description, startDate, status, laboratoryId, projectCategoryId })
            const projectDTO: ProjectDTO = { name, fundingNotice, description, startDate, status, laboratoryId, projectCategoryId } as ProjectDTO
            const result = await this.projectServices.CreateAsync(projectDTO)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default CreateProjectController
