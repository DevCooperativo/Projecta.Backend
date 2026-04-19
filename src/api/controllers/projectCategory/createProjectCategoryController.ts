import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IProjectCategoryServices from "@/application/interfaces/iProjectCategoryServices";
import { ProjectCategoryDTO } from "@/application/dtos/projectCategoryDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class CreateProjectCategoryController implements BaseController {
    constructor(
        @inject("ProjectCategoryServices")
        private readonly projectCategoryServices: IProjectCategoryServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { name, commerciallyRelevant, area, description } = req.body

            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const projectCategoryDTO: ProjectCategoryDTO = { name, commerciallyRelevant, area, description } as ProjectCategoryDTO
            console.log(projectCategoryDTO)
            const result = await this.projectCategoryServices.CreateAsync(projectCategoryDTO)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default CreateProjectCategoryController
