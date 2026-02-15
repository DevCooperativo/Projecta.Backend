import { Request, Response } from "express";
import BaseController from "../baseController";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import { inject, injectable } from "tsyringe";
import IProfessorServices from "application/interfaces/iProfessorServices";
import ProfessorDTO from "application/dtos/professorDTO";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";
import { ValidationError } from "sequelize";

@injectable()
class UpdateProfessorController implements BaseController {
    constructor(
        @inject("ProfessorServices")
        private readonly professorServices: IProfessorServices
    ) { }
    async Handle(req: Request, res: Response) {
        try {
            const { name, email, registration } = req.body
            const { id } = req.params as unknown as { id: number }
            CheckRequestPropertiesHelper.CheckRequired({ id, name, email, registration })
            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const professorDTO: ProfessorDTO = { name, email, registration } as ProfessorDTO
            const result = await this.professorServices.UpdateAsync(id, professorDTO)
            return res.status(200).json(result)
        } catch (ex) {
            if (ex instanceof ValidationError)
                console.log(ex.errors)
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default UpdateProfessorController