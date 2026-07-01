import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IEquipmentCategoryServices from "@/application/interfaces/iEquipmentCategoryServices";
import { ValidationError } from "sequelize";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class DeleteEquipmentCategoryController implements BaseController {
    constructor(
        @inject("EquipmentCategoryServices")
        private readonly equipmentCategoryServices: IEquipmentCategoryServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { id } = req.params as unknown as { id: number }
            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            await this.equipmentCategoryServices.DeleteAsync(id)
            return res.status(200).json({ message: "Equipment category successfully deleted!" })
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default DeleteEquipmentCategoryController
