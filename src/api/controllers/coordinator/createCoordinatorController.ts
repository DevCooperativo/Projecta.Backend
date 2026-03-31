import { Request, Response } from "express";
import BaseController from "../baseController";
import ControllerExceptionThrowHelper from "api/helpers/controllerExceptionThrowHelper";
import { inject, injectable } from "tsyringe";
import ICoordinatorServices from "application/interfaces/iCoordinatorServices";
import CoordinatorDTO from "application/dtos/coordinatorDTO";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";

@injectable()
class CreateCoordinatorController implements BaseController {
    constructor(
        @inject("CoordinatorServices")
        private readonly coordinatorServices: ICoordinatorServices
    ) { }
    async Handle(req: Request, res: Response) {
        try {
            const { area, startDate, professorId, projectId } = req.body
            CheckRequestPropertiesHelper.CheckRequired({ area, startDate, professorId, projectId })
            const coordinatorDTO: CoordinatorDTO = { area, startDate, professorId, projectId } as CoordinatorDTO
            const result = await this.coordinatorServices.CreateAsync(coordinatorDTO)
            return res.status(200).json(result)
        } catch (ex) {
            return ControllerExceptionThrowHelper.Throw(res, ex)
        }
    }
}
export default CreateCoordinatorController
