import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IEquipmentServices from "application/interfaces/iEquipmentServices";

@injectable()
class GetAllEquipmentsController implements BaseController {
    constructor(
        @inject("EquipmentServices")
        private readonly equipmentServices: IEquipmentServices
    ) { }
    async Handle(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const result = await this.equipmentServices.GetAllAsync()
            return res.status(200).json(result)
        } catch (ex) {
            next(ex)
        }
    }
}
export default GetAllEquipmentsController