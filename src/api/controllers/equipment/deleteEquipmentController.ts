import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IEquipmentServices from "@/application/interfaces/iEquipmentServices";
import { ValidationError } from "sequelize";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class DeleteEquipmentController implements BaseController {
    constructor(
        @inject("EquipmentServices")
        private readonly equipmentServices: IEquipmentServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const { id } = req.params

            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            await this.equipmentServices.DeleteAsync(Number(id))
            return res.status(200).json({ message: "Equipment successfully deleted!" })
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default DeleteEquipmentController
