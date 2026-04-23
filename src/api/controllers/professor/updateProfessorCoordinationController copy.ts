import {  Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IProfessorServices from "@/application/interfaces/iProfessorServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import ApiException from "@/api/exceptions/apiException";
import { ApiExceptionNames } from "@/api/constants/apiExceptionNames";
import { UpdateProfessorCoordinationInputDTO } from "@/application/dtos/professor/updateProfessorCoordinationInputDTO";

@injectable()
class UpdateProfessorCoordinationController implements BaseController {
    constructor(
        @inject("ProfessorServices")
        private readonly professorServices: IProfessorServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const { coordinationId } = req.body
            const { id } = req.params as unknown as { id: number }
            const user = req.user
            if(!user)
                throw new ApiException(ApiExceptionNames.UNAUTHORIZED, "User not logged in")
            const dto = new UpdateProfessorCoordinationInputDTO(user.id, id, coordinationId)
            const result = await this.professorServices.UpdateProfessorCoordinationAsync(dto)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default UpdateProfessorCoordinationController