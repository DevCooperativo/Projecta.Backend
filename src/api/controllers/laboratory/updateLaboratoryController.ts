import { Request, Response } from "express";
import BaseController from "../baseController";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import { inject, injectable } from "tsyringe";
import ILaboratoryServices from "application/interfaces/iLaboratoryServices";
import { LaboratoryDTO } from "application/dtos/laboratoryDTO";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";
import { ValidationError } from "sequelize";

@injectable()
class UpdateLaboratoryController implements BaseController {
    constructor(
        @inject("LaboratoryServices")
        private readonly laboratoryServices: ILaboratoryServices
    ) { }
    async Handle(req: Request, res: Response) {
        try {
            const { name, storageSpace, maxOccupants, description, professorId } = req.body
            const { id } = req.params as unknown as { id: number }
            CheckRequestPropertiesHelper.CheckRequired({ id, name, storageSpace, maxOccupants, description, professorId })
            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const laboratoryDTO: LaboratoryDTO = { name, storageSpace, maxOccupants, description, professorId } as LaboratoryDTO
            const result = await this.laboratoryServices.UpdateAsync(id, laboratoryDTO)
            return res.status(200).json(result)
        } catch (ex) {
            if (ex instanceof ValidationError)
                console.log(ex.errors)
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default UpdateLaboratoryController
