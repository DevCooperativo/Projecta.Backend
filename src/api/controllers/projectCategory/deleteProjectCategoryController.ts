import { Request, Response } from "express";
import BaseController from "../baseController";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import { inject, injectable } from "tsyringe";
import IProjectCategoryServices from "application/interfaces/iProjectCategoryServices";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";
import { ValidationError } from "sequelize";

@injectable()
class DeleteProjectCategoryController implements BaseController {
    constructor(
        @inject("ProjectCategoryServices")
        private readonly projectCategoryServices: IProjectCategoryServices
    ) { }
    async Handle(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as { id: number }
            CheckRequestPropertiesHelper.CheckRequired({ id })
            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            await this.projectCategoryServices.DeleteAsync(id)
            return res.status(200).json({ message: "Project category successfully deleted!" })
        } catch (ex) {
            if (ex instanceof ValidationError)
                console.log(ex.errors)
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default DeleteProjectCategoryController
