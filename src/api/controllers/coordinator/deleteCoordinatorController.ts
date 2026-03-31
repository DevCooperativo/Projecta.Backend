import { Request, Response } from "express";
import BaseController from "../baseController";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import { inject, injectable } from "tsyringe";
import ICoordinatorServices from "application/interfaces/iCoordinatorServices";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";

@injectable()
class DeleteCoordinatorController implements BaseController {
    constructor(
        @inject("CoordinatorServices")
        private readonly coordinatorServices: ICoordinatorServices
    ) { }
    async Handle(req: Request, res: Response) {
        try {
            const { id } = req.params as unknown as { id: number }
            CheckRequestPropertiesHelper.CheckRequired({ id })
            const result = await this.coordinatorServices.DeleteAsync(id)
            return res.status(200).json({ message: "Coordinator successfully deleted!" })
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default DeleteCoordinatorController
