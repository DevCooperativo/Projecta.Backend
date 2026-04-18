import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IStudentServices from "application/interfaces/iStudentServices";
import StudentDTO from "application/dtos/studentDTO";
import { CheckData } from "api/helpers/checkRequestPropertiesHelper";

@injectable()
class CreateStudentController implements BaseController {
    constructor(
        @inject("StudentServices")
        private readonly studentServices: IStudentServices
    ) { }
    async Handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, registration, password, birthdate, term, shift } = req.body
            CheckData({
                name: { type: "string", value: name, required: true },
                email: { type: "string", value: email, required: true },
                registration: { type: "string", value: registration, required: true },
                password: { type: "string", value: password, required: true },
                birthdate: { type: "string", value: birthdate, required: true },
                term: { type: "string", value: term, required: true },
                shift: { type: "string", value: shift, required: true }
            })

            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const studentDTO: StudentDTO = { name, email, registration, password, birthdate, term, shift } as StudentDTO
            const result = await this.studentServices.CreateAsync(studentDTO)
            return res.status(200).json(result)
        } catch (ex) {
            next(ex)
        }
    }

}
export default CreateStudentController