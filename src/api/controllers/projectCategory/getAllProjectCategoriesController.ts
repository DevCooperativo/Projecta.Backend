import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IProjectCategoryServices from "@/application/interfaces/iProjectCategoryServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
class GetAllProjectCategoriesController implements BaseController {
    constructor(
        @inject("ProjectCategoryServices")
        private readonly projectCategoryServices: IProjectCategoryServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const result = await this.projectCategoryServices.GetAllAsync()
            return res.status(200).json(ResponseBuilder.success("Success", "OK", 200, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default GetAllProjectCategoriesController
