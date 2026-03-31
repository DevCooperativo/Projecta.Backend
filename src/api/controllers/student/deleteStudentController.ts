import { Request, Response } from "express";
import BaseController from "../baseController";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import { inject, injectable } from "tsyringe";
import IStudentServices from "application/interfaces/iStudentServices";
import StudentDTO from "application/dtos/professorDTO";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";
import { ValidationError } from "sequelize";

@injectable()
class DeleteStudentController implements BaseController {
    constructor(
        @inject("StudentServices")
        private readonly studentServices: IStudentServices
    ) { }
    async Handle(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as { id: number }
            CheckRequestPropertiesHelper.CheckRequired({ id })
            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            await this.studentServices.DeleteAsync(id)
            return res.status(200).json({ message: "Student successfully deleted!" })
        } catch (ex) {
            if (ex instanceof ValidationError)
                console.log(ex.errors)
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default DeleteStudentController