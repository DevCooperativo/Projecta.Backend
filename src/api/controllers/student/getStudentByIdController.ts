import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IStudentServices from "@/application/interfaces/iStudentServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
class GetStudentByIdController implements BaseController {
    constructor(
        @inject("StudentServices")
        private readonly studentServices: IStudentServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        const { id } = req.params
        try {
            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const result = await this.studentServices.GetByIdAsync(id as unknown as number)
            return res.status(200).json(ResponseBuilder.success("Student retrieved successfully", "STUDENT_FOUND", 200, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default GetStudentByIdController