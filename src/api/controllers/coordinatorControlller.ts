import { inject, injectable } from "tsyringe";
import BaseController from "./baseController";
import { Request, Response } from "express";
import ControllerExceptionThrowHelper from "../helpers/controllerExceptionThrowHelper";
import ICoordinatorServices from "application/interfaces/iCoordinatorServices";

@injectable()
class CoordinatorController extends BaseController {
    constructor(
        @inject("CoordinatorServices")
        private readonly coordinatorServices: ICoordinatorServices
    ) {
        super()

    }
    async Handle(req: Request, res: Response) {
        try {
            
            return res.status(200).json({ message: "success" })
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default CoordinatorController