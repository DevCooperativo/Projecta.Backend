import { Request, Response } from "express";
import BaseController from "../baseController";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import { inject, injectable } from "tsyringe";
import ILaboratoryServices from "application/interfaces/iLaboratoryServices";
import { LaboratoryDTO } from "application/dtos/laboratoryDTO";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";

@injectable()
class CreateLaboratoryController implements BaseController {
    constructor(
        @inject("LaboratoryServices")
        private readonly laboratoryServices: ILaboratoryServices
    ) { }
    async Handle(req: Request, res: Response) {
        try {
            const { name, storageSpace, maxOccupants, description } = req.body
            CheckRequestPropertiesHelper.CheckRequired({ name, storageSpace, maxOccupants, description })

            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const laboratoryDTO: LaboratoryDTO = { name, storageSpace, maxOccupants, description } as LaboratoryDTO
            console.log(laboratoryDTO)
            const result = await this.laboratoryServices.CreateAsync(laboratoryDTO)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default CreateLaboratoryController
