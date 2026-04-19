import {  Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IStudentServices from "@/application/interfaces/iStudentServices";
import { CreateStudentInputDTO } from "@/application/dtos/student/createStudentInputDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class CreateStudentController implements BaseController {
    constructor(
        @inject("StudentServices")
        private readonly studentServices: IStudentServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { name, email, registration, birthdate, term, shift } = req.body
            const dto = new CreateStudentInputDTO(name, email, registration, birthdate, term, shift)
            const result = await this.studentServices.CreateAsync(dto)
            return res.status(201).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default CreateStudentController