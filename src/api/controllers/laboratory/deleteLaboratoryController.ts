import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import ILaboratoryServices from "application/interfaces/iLaboratoryServices";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";
import { ValidationError } from "sequelize";

@injectable()
class DeleteLaboratoryController implements BaseController {
    constructor(
        @inject("LaboratoryServices")
        private readonly laboratoryServices: ILaboratoryServices
    ) { }
    async Handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as unknown as { id: number }
            CheckRequestPropertiesHelper.CheckRequired({ id })
            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            await this.laboratoryServices.DeleteAsync(id)
            return res.status(200).json({ message: "Laboratory successfully deleted!" })
        } catch (ex) {
            if (ex instanceof ValidationError)
                console.log(ex.errors)
            next(ex)
        }
    }

}
export default DeleteLaboratoryController
