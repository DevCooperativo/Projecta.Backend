import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IStudentServices from "application/interfaces/iStudentServices";
import StudentDTO from "application/dtos/studentDTO";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";
import { ValidationError } from "sequelize";

@injectable()
class UpdateStudentController implements BaseController {
    constructor(
        @inject("StudentServices")
        private readonly studentServices: IStudentServices
    ) { }
    async Handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, registration } = req.body
            const { id } = req.params as unknown as { id: number }
            CheckRequestPropertiesHelper.CheckRequired({ id, name, email, registration })
            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const studentDTO: StudentDTO = { name, email, registration } as StudentDTO
            const result = await this.studentServices.UpdateAsync(id, studentDTO)
            return res.status(200).json(result)
        } catch (ex) {
            if (ex instanceof ValidationError)
                console.log(ex.errors)
            next(ex)
        }
    }

}
export default UpdateStudentController