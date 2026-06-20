import { Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IStudentServices from "@/application/interfaces/iStudentServices";
import { UpdateStudentInputDTO } from "@/application/dtos/student/updateStudentInputDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import ApiException from "@/api/exceptions/apiException";
import { ApiExceptionNames } from "@/api/constants/apiExceptionNames";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
class UpdateStudentPersonalDataController implements BaseController {
    constructor(
        @inject("StudentServices")
        private readonly studentServices: IStudentServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const user = req.user
            if (!user)
                throw new ApiException(ApiExceptionNames.UNAUTHORIZED, "You are not authenticated")
            const { name, birthdate } = req.body
            const dto = new UpdateStudentInputDTO(user.email, user.userType, name, birthdate)
            const result = await this.studentServices.UpdateAsync(dto)
            return res.status(200).json(ResponseBuilder.success("Student personal data updated successfully", "STUDENT_UPDATED", 200, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default UpdateStudentPersonalDataController
