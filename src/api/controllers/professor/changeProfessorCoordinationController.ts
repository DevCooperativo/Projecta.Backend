import { Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IProfessorServices from "@/application/interfaces/iProfessorServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import ApiException from "@/api/exceptions/apiException";
import { ApiExceptionNames } from "@/api/constants/apiExceptionNames";
import { ChangeProfessorCoordinationInputDTO } from "@/application/dtos/professor/changeProfessorCoordinationInputDTO";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
class ChangeProfessorCoordinationController implements BaseController {
    constructor(
        @inject("ProfessorServices")
        private readonly professorServices: IProfessorServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const { coordinationId } = req.body
            const user = req.user
            if (!user)
                throw new ApiException(ApiExceptionNames.UNAUTHORIZED, "User not logged in")
            const dto = new ChangeProfessorCoordinationInputDTO(user.email, user.userType, coordinationId)
            const result = await this.professorServices.ChangeProfessorCoordinationAsync(dto)
            return res.status(200).json(ResponseBuilder.success("Professor coordination updated successfully", "PROFESSOR_COORDINATION_UPDATED", 200, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default ChangeProfessorCoordinationController