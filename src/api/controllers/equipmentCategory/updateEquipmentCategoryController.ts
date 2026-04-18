import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IEquipmentCategoryServices from "application/interfaces/iEquipmentCategoryServices";
import { EquipmentCategoryDTO } from "application/dtos/equipmentCategoryDTO";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";
import { ValidationError } from "sequelize";

@injectable()
class UpdateEquipmentCategoryController implements BaseController {
    constructor(
        @inject("EquipmentCategoryServices")
        private readonly equipmentCategoryServices: IEquipmentCategoryServices
    ) { }
    async Handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { powerSource, fragile, description } = req.body
            const { id } = req.params as unknown as { id: number }
            CheckRequestPropertiesHelper.CheckRequired({ id, powerSource, fragile, description })
            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const equipmentCategoryDTO: EquipmentCategoryDTO = { powerSource, fragile, description } as EquipmentCategoryDTO
            const result = await this.equipmentCategoryServices.UpdateAsync(id, equipmentCategoryDTO)
            return res.status(200).json(result)
        } catch (ex) {
            if (ex instanceof ValidationError)
                console.log(ex.errors)
            next(ex)
        }
    }

}
export default UpdateEquipmentCategoryController
