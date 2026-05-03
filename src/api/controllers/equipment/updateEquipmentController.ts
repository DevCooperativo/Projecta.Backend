import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IEquipmentServices from "@/application/interfaces/iEquipmentServices";
import EquipmentDTO from "@/application/dtos/equipmentDTO";
import { ValidationError } from "sequelize";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class UpdateEquipmentController implements BaseController {
    constructor(
        @inject("EquipmentServices")
        private readonly equipmentServices: IEquipmentServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { name, laboratoryId, projectId, equipmentCategoryId } = req.body
            const { id } = req.params

            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const equipmentDTO: EquipmentDTO = { name, laboratoryId, projectId, equipmentCategoryId } as EquipmentDTO
            const result = await this.equipmentServices.UpdateAsync(Number(id), equipmentDTO)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default UpdateEquipmentController
