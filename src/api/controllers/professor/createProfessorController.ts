import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IProfessorServices from "application/interfaces/iProfessorServices";
import ProfessorDTO from "application/dtos/professorDTO";
import { CheckData } from "api/helpers/checkRequestPropertiesHelper";

@injectable()
class CreateProfessorController implements BaseController {
    constructor(
        @inject("ProfessorServices")
        private readonly professorServices: IProfessorServices
    ) { }
    async Handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, registration, telephone, coordinationId } = req.body || {}
            CheckData({
                name: { type: "string", required: true, value: name },
                email: { type: "string", required: true, value: email },
                registration: { type: "string", required: true, value: registration },
                telephone: { type: "string", required: true, value: telephone },
                coordinationId: { type: "number", required: true, value: coordinationId }
            })

            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const professorDTO: ProfessorDTO = { name, email, registration, telephone, coordinationId } as ProfessorDTO
            console.log(professorDTO)
            const result = await this.professorServices.CreateAsync(professorDTO)
            return res.status(200).json(result)
        } catch (ex) {
            next(ex)
        }
    }

}
export default CreateProfessorController