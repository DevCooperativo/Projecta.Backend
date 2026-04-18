import { NextFunction, Request, Response } from "express";
import BaseController from "../baseController";
import { inject, injectable } from "tsyringe";
import ICoordinatorServices from "application/interfaces/iCoordinatorServices";
import CoordinatorDTO from "application/dtos/coordinatorDTO";
import CheckRequestPropertiesHelper from "api/helpers/checkRequestPropertiesHelper";

@injectable()
class UpdateCoordinatorController implements BaseController {
    constructor(
        @inject("CoordinatorServices")
        private readonly coordinatorServices: ICoordinatorServices
    ) { }
    async Handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { area, startDate, endDate, professorId, projectId } = req.body
            const { id } = req.params as unknown as { id: number }
            CheckRequestPropertiesHelper.CheckRequired({ id, area, startDate, professorId, projectId })
            const coordinatorDTO: CoordinatorDTO = { area, startDate, endDate, professorId, projectId } as CoordinatorDTO
            const result = await this.coordinatorServices.UpdateAsync(id, coordinatorDTO)
            return res.status(200).json(result)
        } catch (ex) {
            next(ex)
        }
    }
}
export default UpdateCoordinatorController
