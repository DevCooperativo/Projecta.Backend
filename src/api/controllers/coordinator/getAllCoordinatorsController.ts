import { Request, Response } from "express";
import BaseController from "../baseController";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import { inject, injectable } from "tsyringe";
import ICoordinatorServices from "application/interfaces/iCoordinatorServices";

@injectable()
class GetAllCoordinatorsController implements BaseController {
    constructor(
        @inject("CoordinatorServices")
        private readonly coordinatorServices: ICoordinatorServices
    ) { }
    async Handle(req: Request, res: Response) {
        try {
            const result = await this.coordinatorServices.GetAllAsync()
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default GetAllCoordinatorsController
