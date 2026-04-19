import {  Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IProfessorServices from "@/application/interfaces/iProfessorServices";
import { UpdateProfessorInputDTO } from "@/application/dtos/professor/updateProfessorInputDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class UpdateProfessorController implements BaseController {
    constructor(
        @inject("ProfessorServices")
        private readonly professorServices: IProfessorServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, registration, telephone, coordinationId } = req.body
            const { id } = req.params as unknown as { id: number }
            const dto = new UpdateProfessorInputDTO(name, email, registration, telephone, coordinationId)
            const result = await this.professorServices.UpdateAsync(id, dto)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default UpdateProfessorController