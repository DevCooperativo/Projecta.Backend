import { Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IStudentServices from "@/application/interfaces/iStudentServices";
import { ChangeStudentTermInputDTO } from "@/application/dtos/student/changeStudentTermInputDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import ApiException from "@/api/exceptions/apiException";
import { ApiExceptionNames } from "@/api/constants/apiExceptionNames";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
class UpdateStudentTermController implements BaseController {
    constructor(
        @inject("StudentServices")
        private readonly studentServices: IStudentServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const user = req.user
            if (!user)
                throw new ApiException(ApiExceptionNames.UNAUTHORIZED, "You are not authenticated")
            const { term } = req.body
            const dto = new ChangeStudentTermInputDTO(user.email, user.userType, term)
            const result = await this.studentServices.ChangeTermAsync(dto)
            return res.status(200).json(ResponseBuilder.success("Student term updated successfully", "STUDENT_TERM_UPDATED", 200, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default UpdateStudentTermController
