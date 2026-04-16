import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { Request, Response } from "express";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import ICoordinationServices from "application/interfaces/iCoordinationServices";

@injectable()
class GetAllCoordinationsController implements BaseController {
    constructor(
        @inject("CoordinationServices")
        private readonly coordinationServices: ICoordinationServices
    ) { }
    async Handle(req: Request, res: Response) {
        try {
            const result = await this.coordinationServices.GetAllAsync()
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default GetAllCoordinationsController
