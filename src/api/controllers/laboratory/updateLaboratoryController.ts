import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import ILaboratoryServices from "@/application/interfaces/iLaboratoryServices";
import { LaboratoryDTO } from "@/application/dtos/laboratoryDTO";
import { ValidationError } from "sequelize";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class UpdateLaboratoryController implements BaseController {
    constructor(
        @inject("LaboratoryServices")
        private readonly laboratoryServices: ILaboratoryServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { name, storageSpace, maxOccupants, description, professorId } = req.body
            const { id } = req.params as unknown as { id: number }
            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const laboratoryDTO: LaboratoryDTO = { name, storageSpace, maxOccupants, description, professorId } as LaboratoryDTO
            const result = await this.laboratoryServices.UpdateAsync(id, laboratoryDTO)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default UpdateLaboratoryController
