import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IEquipmentServices from "application/interfaces/iEquipmentServices";
import EquipmentDTO from "application/dtos/equipmentDTO";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";

@injectable()
class CreateEquipmentController implements BaseController {
    constructor(
        @inject("EquipmentServices")
        private readonly equipmentServices: IEquipmentServices
    ) { }
    async Handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, laboratoryId, projectId, equipmentCategoryId } = req.body
            CheckRequestPropertiesHelper.CheckRequired({ name, laboratoryId, projectId, equipmentCategoryId })

            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const equipmentDTO: EquipmentDTO = { name, laboratoryId, projectId, equipmentCategoryId } as EquipmentDTO
            const result = await this.equipmentServices.CreateAsync(equipmentDTO)
            return res.status(201).json(result)
        } catch (ex) {
            next(ex)
        }
    }
}
export default CreateEquipmentController