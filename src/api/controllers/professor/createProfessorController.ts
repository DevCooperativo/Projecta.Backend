import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IProfessorServices from "@/application/interfaces/iProfessorServices";
import { CreateProfessorInputDTO } from "@/application/dtos/professor/createProfessorInputDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";
import { ResponseBuilder } from "@/api/helpers/responseBuilder";

@injectable()
class CreateProfessorController implements BaseController {
    constructor(
        @inject("ProfessorServices")
        private readonly professorServices: IProfessorServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { name, email, registration, telephone, coordinationId } = req.body || {}
            const dto = new CreateProfessorInputDTO(name, email, registration, telephone, coordinationId)
            const result = await this.professorServices.CreateAsync(dto)
            return res.status(201).json(ResponseBuilder.success("Professor created successfully", "PROFESSOR_CREATED", 201, result))
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default CreateProfessorController