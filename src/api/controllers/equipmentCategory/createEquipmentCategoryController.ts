import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IEquipmentCategoryServices from "@/application/interfaces/iEquipmentCategoryServices";
import { EquipmentCategoryDTO } from "@/application/dtos/equipmentCategoryDTO";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class CreateEquipmentCategoryController implements BaseController {
    constructor(
        @inject("EquipmentCategoryServices")
        private readonly equipmentCategoryServices: IEquipmentCategoryServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { powerSource, fragile, description } = req.body

            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const equipmentCategoryDTO: EquipmentCategoryDTO = { powerSource, fragile, description } as EquipmentCategoryDTO
            console.log(equipmentCategoryDTO)
            const result = await this.equipmentCategoryServices.CreateAsync(equipmentCategoryDTO)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default CreateEquipmentCategoryController
