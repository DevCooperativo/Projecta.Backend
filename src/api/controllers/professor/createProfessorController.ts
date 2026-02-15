import { Request, Response } from "express";
import BaseController from "../baseController";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import { inject, injectable } from "tsyringe";
import IProfessorServices from "application/interfaces/iProfessorServices";
import ProfessorDTO from "application/dtos/professorDTO";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";

@injectable()
class CreateProfessorController implements BaseController {
    constructor(
        @inject("ProfessorServices")
        private readonly professorServices: IProfessorServices
    ) { }
    async Handle(req: Request, res: Response) {
        try {
            const { name, email, registration } = req.body
            CheckRequestPropertiesHelper.CheckRequired({name, email, registration})
            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const professorDTO: ProfessorDTO = { name, email, registration } as ProfessorDTO
            console.log(professorDTO)
            const result = await this.professorServices.CreateAsync(professorDTO)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default CreateProfessorController