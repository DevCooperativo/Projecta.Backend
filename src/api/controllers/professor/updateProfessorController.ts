import { Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IProfessorServices from "@/application/interfaces/iProfessorServices";
import { UpdateProfessorInputDTO } from "@/application/dtos/professor/updateProfessorInputDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import ApiException from "@/api/exceptions/apiException";
import { ApiExceptionNames } from "@/api/constants/apiExceptionNames";

@injectable()
class UpdateProfessorController implements BaseController {
    constructor(
        @inject("ProfessorServices")
        private readonly professorServices: IProfessorServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const { name, registration, telephone } = req.body
            const user = req.user
            if (!user)
                throw new ApiException(ApiExceptionNames.UNAUTHORIZED, "User not logged in")
            const dto = new UpdateProfessorInputDTO(user.email, user.userType, name, registration, telephone)
            const result = await this.professorServices.UpdateAsync(dto)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default UpdateProfessorController