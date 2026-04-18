import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IProfessorServices from "application/interfaces/iProfessorServices";
import ProfessorDTO from "application/dtos/professorDTO";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";
import { ValidationError } from "sequelize";

@injectable()
class DeleteProfessorController implements BaseController {
    constructor(
        @inject("ProfessorServices")
        private readonly professorServices: IProfessorServices
    ) { }
    async Handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as unknown as { id: number }
            CheckRequestPropertiesHelper.CheckRequired({ id })
            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const result = await this.professorServices.DeleteAsync(id)
            return res.status(200).json({ message: "Professor successfully deleted!" })
        } catch (ex) {
            if (ex instanceof ValidationError)
                console.log(ex.errors)
            next(ex)
        }
    }

}
export default DeleteProfessorController