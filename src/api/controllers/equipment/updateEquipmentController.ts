import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IEquipmentServices from "application/interfaces/iEquipmentServices";
import EquipmentDTO from "application/dtos/equipmentDTO";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";
import { ValidationError } from "sequelize";

@injectable()
class UpdateEquipmentController implements BaseController {
    constructor(
        @inject("EquipmentServices")
        private readonly equipmentServices: IEquipmentServices
    ) { }
    async Handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, laboratoryId, projectId, equipmentCategoryId } = req.body
            const { id } = req.params as unknown as { id: number }
            CheckRequestPropertiesHelper.CheckRequired({ id, name, laboratoryId, projectId, equipmentCategoryId })

            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const equipmentDTO: EquipmentDTO = { name, laboratoryId, projectId, equipmentCategoryId } as EquipmentDTO
            const result = await this.equipmentServices.UpdateAsync(id, equipmentDTO)
            return res.status(200).json(result)
        } catch (ex) {
            if (ex instanceof ValidationError)
                console.log(ex.errors)
            next(ex)
        }
    }
}
export default UpdateEquipmentController