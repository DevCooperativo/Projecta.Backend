import { Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IEquipmentServices from "@/application/interfaces/iEquipmentServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class GetEquipmentAvailabilityByCategoryController implements BaseController {
    constructor(
        @inject("EquipmentServices")
        private readonly equipmentServices: IEquipmentServices
    ) { }

    async Handle(req: Request, res: Response): Promise<Response> {
        try {
            const { equipmentCategoryId } = req.query
            const result = await this.equipmentServices.GetAvailabilityByCategoryAsync(
                equipmentCategoryId ? Number(equipmentCategoryId) : undefined
            )
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}

export default GetEquipmentAvailabilityByCategoryController
