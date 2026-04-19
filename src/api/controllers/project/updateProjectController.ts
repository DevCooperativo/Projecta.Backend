import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IProjectServices from "@/application/interfaces/iProjectServices";
import ProjectDTO from "@/application/dtos/projectDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class UpdateProjectController implements BaseController {
    constructor(
        @inject("ProjectServices")
        private readonly projectServices: IProjectServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { name, description, startDate, endDate, status, laboratoryId, projectCategoryId } = req.body
            const { id } = req.params as unknown as { id: number }
            const projectDTO: ProjectDTO = { name, description, startDate, endDate, status, laboratoryId, projectCategoryId } as ProjectDTO
            const result = await this.projectServices.UpdateAsync(id, projectDTO)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default UpdateProjectController
