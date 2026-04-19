import { inject, injectable } from "tsyringe";
import BaseController from "./baseController";
import { NextFunction, Request, Response } from "express";
import ICoordinatorServices from "@/application/interfaces/iCoordinatorServices";
import ControllerExceptionThrowHelper from "../helpers/controllerExceptionThrowHelper";

@injectable()
class GetAllCoordinationController extends BaseController {
    constructor(
        @inject("CoordinationServices")
        private readonly coordinationServices: ICoordinatorServices
    ) {
        super()

    }
    async Handle(req: Request, res: Response): Promise<Response>{
        try {
            const response = await this.coordinationServices.GetAllAsync();
            return res.status(200).json({ message: "success", data: response })
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default GetAllCoordinationController