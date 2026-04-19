import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import IEquipmentCategoryServices from "@/application/interfaces/iEquipmentCategoryServices";
import ControllerExceptionThrowHelper from "@/api/helpers/controllerExceptionThrowHelper";

@injectable()
class GetEquipmentCategoryByIdController implements BaseController {
    constructor(
        @inject("EquipmentCategoryServices")
        private readonly equipmentCategoryServices: IEquipmentCategoryServices
    ) { }
    async Handle(req: Request, res: Response): Promise<Response>{
        const { id } = req.params
        try {
            const user = req.user
            // ApiException.When(!user, ApiExceptionNameEnum.UNAUTHENTICATED_USER, "You are not authenticated to the API. Authenticate yourself", 401)
            const result = await this.equipmentCategoryServices.GetByIdAsync(id as unknown as number)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }

}
export default GetEquipmentCategoryByIdController
