import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IProjectCategoryServices from "@/application/interfaces/iProjectCategoryServices";
import { ValidationError } from "sequelize";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class DeleteProjectCategoryController implements BaseController {
    constructor(
        @inject("ProjectCategoryServices")
        private readonly projectCategoryServices: IProjectCategoryServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { id } = req.params as unknown as { id: number }
            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            await this.projectCategoryServices.DeleteAsync(id)
            return res.status(200).json({ message: "Project category successfully deleted!" })
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default DeleteProjectCategoryController
