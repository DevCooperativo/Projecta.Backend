import { Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IStudentServices from "@/application/interfaces/iStudentServices";
import { UpdateStudentInputDTO } from "@/application/dtos/student/updateStudentInputDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class UpdateStudentController implements BaseController {
    constructor(
        @inject("StudentServices")
        private readonly studentServices: IStudentServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { name, email, registration, birthdate, term, shift } = req.body
            const { id } = req.params as unknown as { id: number }
            const dto = new UpdateStudentInputDTO(name, email, registration, birthdate, term, shift)
            const result = await this.studentServices.UpdateAsync(id, dto)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default UpdateStudentController