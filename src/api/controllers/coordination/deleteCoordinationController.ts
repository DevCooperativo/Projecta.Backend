import { inject, injectable } from "tsyringe";
import BaseController from "../baseController";
import { Request, Response } from "express";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import ICoordinationServices from "application/interfaces/iCoordinationServices";

@injectable()
class DeleteCoordinationController implements BaseController {
    constructor(
        @inject("CoordinationServices")
        private readonly coordinationServices: ICoordinationServices
    ) { }
    async Handle(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as { id: number }
            const result = await this.coordinationServices.DeleteAsync(id)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default DeleteCoordinationController
